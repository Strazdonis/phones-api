const Phone = require('../models/phone');
module.exports = (router) => {
    router.route('/phones/:phone_id')
        // ? Find phone by ID
        .get(function (req, res) {
            Phone.findById(req.params.phone_id).populate('manufacturer').exec(function (err, phone) {
                if (err) {
                    return res.status(400).send({ message: err.reason.message });
                }
                if (phone) {
                    res.status(200).json(phone);
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