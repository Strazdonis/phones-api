const Manufacturer = require('../models/manufacturer');
module.exports = (router) => {
    router.route('/manufacturers')
        // CREATE NEW MANUFACTURER
        .post(function (req, res) {
            const body = req.body;
            const manf = new Manufacturer();
            // validation happens in model scheme
            const data = body;
            manf.name = data.name;


            manf.save(function (err, manf) {
                if (err) {
                    return res.status(400).send(err);
                }
                res.set('location', `/api/v1/manufacturers/${manf.id}`);
                res.json({ message: 'Manufacturer created!', manf }).status(201);
            });
        })
        // GET ALL MANUFACTURERS
        .get(function (req, res) {
            Manufacturer.find(function (err, manfs) {
                if (err) {
                    return res.status(404).send(err);
                }

                res.status(200).json(manfs);
            });
        });
}