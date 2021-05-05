const Phone = require('../models/phone');
const request = require('request');
const getContact = (id) => {
    const options = {
        method: "GET",
        uri: `http://contacts:5000/contacts/${id}`,
        timeout: 3000,
        json: true,
    };
    return new Promise((resolve, reject) => {
        request(options, (err, res) => {
            if (err) {
                console.error("ERR", err);
                return reject(err);
            }
            console.log("BODY", res.body);
            return resolve(res.body || null);
        });
    });
};

module.exports = (router) => {
    router.route('/phones/:phone_id')
        // ? Find phone by ID
        .get(function (req, res) {
            Phone.findById(req.params.phone_id).populate('manufacturer').exec(async function (err, phone) {
                if (err) {
                    return res.status(400).send({ message: err.reason.message });
                }
                if (phone) {
                    let ignoreOwners = false;
                    for (let i = 0; i < phone.owners; i++) {
                        const owner = await getContact(phone.owners[i]).catch(console.error) || null;
                        if(owner == null) {
                            ignoreOwners = true;
                            break;
                        }
                        phone.owners[i] = owner;
                    }
                    
                    if(ignoreOwners) {
                        const {owners, ...payload} = phone._doc;
                        res.status(200).json(payload);
                    } else {
                        res.status(200).json(phone);
                    }
                    
                } else {
                    res.status(404).json({ message: "Phone not found" });
                }

            });
        })
        // ? Update phone by ID
        .put(function (req, res) {
            Phone.findById(req.params.phone_id, function (err, phone) {
                if (err) {
                    return res.status(404).send(err);
                }

                if (!phone) {
                    return res.status(404).json({ message: "Phone not found" });
                }

                phone.name = req.body.name || phone.name;
                phone.description = req.body.description || phone.description;
                phone.manufacturer = req.body.manufacturer || phone.manufacturer;
                phone.photoUrls = req.body.photoUrls || phone.photoUrls;
                phone.owners = req.body.owners || phone.owners;
                phone.save(function (err) {
                    if (err) {
                        return res.status(400).send(err);
                    }

                    res.status(202).json({ message: 'Phone updated!', phone });
                });

            });
        })
        .delete(function (req, res) {
            Phone.deleteOne({
                _id: req.params.phone_id
            }, function (err, phone) {
                if (err) {
                    return res.status(404).send(err);
                }
                if (phone.n > 0) {
                    res.status(204).json({ message: 'Successfully deleted' });
                } else {
                    res.status(404).json({ message: "Phone not found" });
                }

            });
        });
};