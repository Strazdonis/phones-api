const Phone = require('../models/phone');
module.exports = (router) => {
    router.route('/phones')
        // CREATE NEW PHONE
        .post(function (req, res) {
            const body = req.body;
            const phone = new Phone();
            // validation happens in model scheme
            const data = body;
            phone.name = data.name;
            phone.manufacturer = data.manufacturer;
            phone.photoUrls = data.photoUrls;
            phone.description = data.description;
            phone.owners = data.owners;

            phone.save(function (err, phone) {
                if (err) {
                    return res.status(400).send(err);
                }
                res.set('location', `/api/v1/phones/${phone.id}`);
                res.status(201).json({ message: 'Phone created!', phone });
            });
        })
        // GET ALL PHONES
        .get(function (req, res) {
            Phone.find(function (err, phones) {
                if (err) {
                    return res.status(404).send(err);
                }

                res.status(200).json(phones);
            });
        });

};