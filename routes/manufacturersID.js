const Manufacturer = require('../models/manufacturer');
module.exports = (router) => {
    router.route('/manufacturers/:manufacturer_id')
        // ? Find manufacturer by ID
        .get(function (req, res) {
            Manufacturer.findById(req.params.manufacturer_id, function (err, manf) {
                if (err) {
                    return res.status(400).send({ message: err.reason.message });
                }

                if (manf) {
                    res.status(200).json(manf);
                } else {
                    res.status(404).json({ message: "Manufacturer not found" });
                }
            });
        })
        // ? Update manufacturers by ID
        .put(function (req, res) {
            Manufacturer.findById(req.params.manufacturer_id, function (err, manf) {
                if (err) {
                    return res.status(404).send(err);
                }

                if (!manf) {
                    return res.status(404).json({ message: "Manufacturer not found" });
                }
                manf.name = req.body.name;
                manf.save(function (err) {
                    if (err) {
                        return res.status(400).send(err);
                    }

                    res.status(202).json({ message: 'Manufacturer updated!', manufacturer: manf });
                });

            });
        })
        .delete(function (req, res) {
            Manufacturer.deleteOne({
                _id: req.params.manufacturer_id
            }, function (err, manf) {
                if (err) {
                    return res.status(404).send(err);
                }

                res.status(204).json({ message: 'Successfully deleted' });
            });
        });
};