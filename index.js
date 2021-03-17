/* jshint esversion: 9 */
const express = require('express');
const app = express();
const Phone = require('./models/phone');
const Manufacturer = require('./models/manufacturer');
const port = 80;
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://chinakomba:C8pZSkUb73UZLZb@cof.agyq3.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.error(err));

app.use(express.json());

const router = express.Router();

// router.use(function (req, res, next) {
//     console.log(`[${req.url}]`);
//     next(); // continue to next callback
// });

router.get('/', function (req, res) {
    res.json({ message: 'available endpoints: /phones /manufacturers' }).status(200);
});

router.route('/phones')
    // ?CREATE NEW PHONE
    .post(function (req, res) {
        const body = req.body;
        const phone = new Phone();
        // validation happens in model scheme
        const data = body;
        phone.name = data.name;
        phone.manufacturer = data.manufacturer;
        phone.photoUrls = data.photoUrls;
        phone.description = data.description;

        phone.save(function (err, phone) {
            if (err) {
                return res.send(err).status(400);
            }
            res.set('location', `/api/v1/phones/${phone.id}`);
            res.json({ message: 'Phone created!', phone }).status(201);
        });
    })
    // ?GET ALL PHONES
    .get(function (req, res) {
        Phone.find(function (err, phones) {
            if (err) {
                return res.send(err).status(400);
            }

            res.json(phones).status(200);
        });
    });

router.route('/phones/:phone_id')
    // ? Find phone by ID
    .get(function (req, res) {
        Phone.findById(req.params.phone_id).populate('manufacturer').exec(function (err, phone) {
            if (err) {
                return res.send(err).status(404);
            }

            res.json(phone).status(200);
        });
    })
    // ? Update phone by ID
    .put(function (req, res) {
        Phone.findById(req.params.phone_id, function (err, phone) {
            if (err) {
                return res.send(err).status(404);
            }

            phone.name = req.body.name || phone.name;
            phone.description = req.body.description || phone.description;
            phone.manufacturer = req.body.manufacturer || phone.manufacturer;
            phone.photoUrls = req.body.photoUrls || phone.photoUrls;
            phone.save(function (err) {
                if (err) {
                    return res.send(err).status(500);
                }

                res.json({ message: 'Phone updated!', phone }).status(202);
            });

        });
    })
    .delete(function(req, res) {
        Phone.deleteOne({
            _id: req.params.phone_id
        }, function(err, phone) {
            if (err) {
                return res.send(err).status(400);
            }

            res.json({ message: 'Successfully deleted' }).status(204);
        });
    });


    router.route('/manufacturers')
    // ?CREATE NEW MANUFACTURER
    .post(function (req, res) {
        const body = req.body;
        const manf = new Manufacturer();
        // validation happens in model scheme
        const data = body;
        manf.name = data.name;
        

        manf.save(function (err, manf) {
            if (err) {
                return res.send(err).status(400);
            }
            res.set('location', `/api/v1/manufacturers/${manf.id}`);
            res.json({ message: 'Manufacturer created!', manf }).status(201);
        });
    })
    // ?GET ALL MANUFACTURERS
    .get(function (req, res) {
        Manufacturer.find(function (err, manfs) {
            if (err) {
                return res.send(err).status(400);
            }

            res.json(manfs).status(200);
        });
    });                                                                                            

router.route('/manufacturers/:manufacturer_id')
    // ? Find manufacturer by ID
    .get(function (req, res) {
        Manufacturer.findById(req.params.manufacturer_id, function (err, manf) {
            if (err) {
                return res.send(err).status(404);
            }

            res.json(manf).status(200);
        });
    })
    // ? Update manufacturers by ID
    .put(function (req, res) {
        Manufacturer.findById(req.params.manufacturer_id, function (err, manf) {
            if (err) {
                return res.send(err).status(404);
            }

            manf.name = req.body.name;
            manf.save(function (err) {
                if (err) {
                    return res.send(err).status(500);
                }

                res.json({ message: 'Manufacturer updated!', manufacturer: manf }).status(202);
            });

        });
    })
    .delete(function(req, res) {
        Manufacturer.deleteOne({
            _id: req.params.manufacturer_id
        }, function(err, manf) {
            if (err) {
                return res.send(err).status(400);
            }

            res.json({ message: 'Successfully deleted' }).status(204);
        });
    });


app.use('/api/v1', router);

app.listen(port);
console.log(`API is running in http://localhost:${port}/api/v1`);
