/* jshint esversion: 9 */
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Phone = require('./models/phone');
const Manufacturer = require('./models/manufacturer');
const port = process.env.PORT || 80;
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.error(err));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const router = express.Router();

router.use(function (req, res, next) {
    console.log(`[${req.url}]`);
    next(); // continue to next callback
});

router.get('/', function (req, res) {
    res.json({ message: 'available endpoints: /phones' }).status(200);
});

router.route('/phones')
    // ?CREATE NEW PHONE
    .post(function (req, res) {
        const body = req.body;
        console.log(body);
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

            res.json({ message: 'Phone created!', phone });
        });
    })
    // ?GET ALL PHONES
    .get(function (req, res) {
        Phone.find(function (err, phones) {
            if (err) {
                return res.send(err).status(400);
            }

            res.json(phones);
        });
    });

router.route('/phones/:phone_id')
    // ? Find phone by ID
    .get(function (req, res) {
        Phone.findById(req.params.phone_id, function (err, phone) {
            if (err) {
                return res.send(err).status(404);
            }

            res.json(phone);
        });
    })
    // ? Update phone by ID
    .put(function (req, res) {
        Phone.findById(req.params.phone_id, function (err, phone) {
            if (err) {
                return res.send(err).status(404);
            }

            phone.name = req.body.name;
            phone.save(function (err) {
                if (err) {
                    return res.send(err).status(500);
                }

                res.json({ message: 'Phone updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Phone.remove({
            _id: req.params. phone_id
        }, function(err, phone) {
            if (err) {
                return res.send(err).status(400);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });


    router.route('/manufacturers')
    // ?CREATE NEW MANUFACTURER
    .post(function (req, res) {
        const body = req.body;
        console.log(body);
        const manf = new Manufacturer();
        // validation happens in model scheme
        const data = body;
        manf.name = data.name;
        

        manf.save(function (err, manf) {
            if (err) {
                return res.send(err).status(400);
            }

            res.json({ message: 'Manufacturer created!', manf });
        });
    })
    // ?GET ALL MANUFACTURERS
    .get(function (req, res) {
        Manufacturer.find(function (err, manfs) {
            if (err) {
                return res.send(err).status(400);
            }

            res.json(manfs);
        });
    });                                                                                             // Is didziosio Phone bus Manuf.... is mazios keist , phones variable 

router.route('/manufacturers/:manufacturer_id')
    // ? Find manufacturer by ID
    .get(function (req, res) {
        Manufacturer.findById(req.params.manufacturer_id, function (err, manf) {
            if (err) {
                return res.send(err).status(404);
            }

            res.json(manf);
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

                res.json({ message: 'Manufacturer updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Manufacturer.remove({
            _id: req.params. manufacturer_id
        }, function(err, manf) {
            if (err) {
                return res.send(err).status(400);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });


app.use('/api/v1', router);

app.listen(port);
console.log(`API is running in http://localhost:${port}/api/v1`);