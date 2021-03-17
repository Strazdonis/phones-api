/* jshint esversion: 9 */
const express = require('express');
const app = express();
const Phone = require('./models/phone');
const Manufacturer = require('./models/manufacturer');
const port = 80;
const mongoose = require('mongoose');

mongoose.connect("mongodb://mongo:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.error(err));

app.use(express.json());

const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).json({ message: 'available endpoints: /phones /manufacturers' });
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
                return res.status(400).send(err);
            }
            res.set('location', `/api/v1/phones/${phone.id}`);
            res.status(201).json({ message: 'Phone created!', phone });
        });
    })
    // ?GET ALL PHONES
    .get(function (req, res) {
        Phone.find(function (err, phones) {
            if (err) {
                return res.status(404).send(err);
            }

            res.status(200).json(phones);
        });
    });

router.route('/phones/:phone_id')
    // ? Find phone by ID
    .get(function (req, res) {
        Phone.findById(req.params.phone_id).populate('manufacturer').exec(function (err, phone) {
            if (err) {
                return res.status(500).send({message: err.reason.message});
            }
            if(phone) {
                res.status(200).json(phone);
            } else {
                res.status(404).json({message: "Phone not found"});
            }

        });
    })
    // ? Update phone by ID
    .put(function (req, res) {
        Phone.findById(req.params.phone_id, function (err, phone) {
            if (err) {
                return res.status(404).send(err);
            }

            if(!phone) {
                return res.status(404).json({message: "Phone not found"});
            }

            phone.name = req.body.name || phone.name;
            phone.description = req.body.description || phone.description;
            phone.manufacturer = req.body.manufacturer || phone.manufacturer;
            phone.photoUrls = req.body.photoUrls || phone.photoUrls;
            phone.save(function (err) {
                if (err) {
                    return res.status(500).send(err);
                }

                res.status(202).json({ message: 'Phone updated!', phone });
            });

        });
    })
    .delete(function(req, res) {
        Phone.deleteOne({
            _id: req.params.phone_id
        }, function(err, phone) {
            if (err) {
                return res.status(404).send(err);
            }
            if(phone.n > 0) {
                res.status(204).json({ message: 'Successfully deleted' });
            } else {
                res.status(404).json({message: "Phone not found"});
            }

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
                return res.status(400).send(err);
            }
            res.set('location', `/api/v1/manufacturers/${manf.id}`);
            res.json({ message: 'Manufacturer created!', manf }).status(201);
        });
    })
    // ?GET ALL MANUFACTURERS
    .get(function (req, res) {
        Manufacturer.find(function (err, manfs) {
            if (err) {
                return res.status(404).send(err);
            }

            res.status(200).json(manfs);
        });
    });                                                                                            

router.route('/manufacturers/:manufacturer_id')
    // ? Find manufacturer by ID
    .get(function (req, res) {
        Manufacturer.findById(req.params.manufacturer_id, function (err, manf) {
            if (err) {
                return res.status(500).send({message: err.reason.message});
            }

            if(manf) {
                res.status(200).json(manf);
            } else {
                res.status(404).json({message: "Manufacturer not found"});
            }
        });
    })
    // ? Update manufacturers by ID
    .put(function (req, res) {
        Manufacturer.findById(req.params.manufacturer_id, function (err, manf) {
            if (err) {
                return res.status(404).send(err);
            }

            if(!manf) {
                return res.status(404).json({message: "Manufacturer not found"});
            }
            manf.name = req.body.name;
            manf.save(function (err) {
                if (err) {
                    return res.status(500).send(err);
                }

                res.status(202).json({ message: 'Manufacturer updated!', manufacturer: manf });
            });

        });
    })
    .delete(function(req, res) {
        Manufacturer.deleteOne({
            _id: req.params.manufacturer_id
        }, function(err, manf) {
            if (err) {
                return res.status(404).send(err);
            }

            res.status(204).json({ message: 'Successfully deleted' });
        });
    });


app.use('/api/v1', router);

app.listen(port);
console.log(`API is running in http://localhost:${port}/api/v1`);
