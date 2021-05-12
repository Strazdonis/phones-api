const Phone = require('../models/phone');
const request = require('request');
//name, surname, number, email must be provided
const createContact = (body) => {
    const options = {
        method: "POST",
        uri: `http://contacts:5000/contacts/`,
        timeout: 3000,
        json: true,
        body: body,
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
    router.route('/phones')
        // CREATE NEW PHONE
        .post(async function (req, res) {
            const body = req.body;
            const phone = new Phone();
            // validation happens in model scheme
            const data = body;
            phone.name = data.name;
            phone.manufacturer = data.manufacturer;
            phone.photoUrls = data.photoUrls;
            phone.description = data.description;
            phone.owners = [];
            let errors = [];
            if(data.owners) {
                for await(const owner of data.owners) {
                    const contact = await createContact(owner).catch(console.error);
                    console.log(contact);
                    if(contact == "Contact added successfully.") {
                        phone.owners.push(owner.id);
                    } else {
                        console.log("error", contact);
                        errors.push(contact);
                    }
                }
            }
            phone.save(function (err, phone) {
                if (err) {
                    return res.status(400).send(err);
                }
                console.log(errors);
                res.set('location', `/api/v1/phones/${phone.id}`);
                const payload = { message: 'Phone created!', phone, };
                if(errors.length > 0) {
                    payload.errors = errors;
                }
                res.status(201).json(payload);
            });
        })
        // GET ALL PHONES
        .get(function (req, res) {
            Phone.find(async function (err, phones) {
                if (err) {
                    return res.status(404).send(err);
                }
                let phoneI = 0;
                let ownerI = 0;
                let skipOwners = false;
                for await (let phone of phones) {
                    ownerI = 0;
                    for await (let owner of phone.owners) {
                        console.log(owner);
                        const ownerID = owner;
                        const contact = await getContact(ownerID).catch(console.error);
                        if(contact == null) {
                            skipOwners = true;
                            break;
                        }
                        phones[phoneI].owners[ownerI] = contact;
                        ownerI++;
                    }
                    if(skipOwners) {
                        console.log("SKIPPING");
                        const {owners, ...payload} = phones[phoneI]._doc;
                        phones[phoneI] = payload; 
                        //phones[phoneI].owners = null;
                        //delete phones[phoneI].owners;
                    }
                    phoneI++;

                }

                res.status(200).json(phones);

            });
        });

};