/* jshint esversion: 9 */
const express = require('express');
const app = express();
const Phone = require('./models/phone');
const Manufacturer = require('./models/manufacturer');
const port = 80;
const mongoose = require('mongoose');
const fs = require('fs');
const bodyParser = require('body-parser');
const soap = require('soap');
const { exec } = require('child_process');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

async function getPhone(args) {
    const phone = await Phone.findOne(args).exec();
    console.log(phone);
    return {
        id: phone._id.toString(),
        manufacturer: phone.manufacturer?.toString(),
        name: phone.name,
        description: phone.description,
        photoUrls: phone.photoUrls,
        owners: phone.owners,
    };
}

async function getManufacturer(args) {
    const manufacturer = await Manufacturer.findOne(args).exec();
    console.log(manufacturer);
    return {
        id: manufacturer._id.toString(),
        name: manufacturer.name,
    };
}

async function getPhones() {
    console.log("GETTING PHONES");
    const phones = await Phone.find().exec();
    console.log(phones);
    const returnArr = [];
    phones.forEach((phone) => {
        returnArr.push({
            id: phone._id.toString(),
            manufacturer: phone.manufacturer?.toString(),
            name: phone.name,
            description: phone.description,
            photoUrls: phone.photoUrls,
            owners: phone.owners,
        });
    });
    return returnArr;
}

async function getManufacturers(args) {
    const manufacturers = await Manufacturer.find().exec();
    console.log(manufacturers);
    const returnArr = [];
    manufacturers.forEach((manufacturer) => {
        returnArr.push({
            id: manufacturer._id.toString(),
            name: manufacturer.name,
        });
    });
    return returnArr;
}

async function createPhone(args) {
    const phone = await new Phone({
        name: args.name,
        descriptipn: args.descriptin,
        manufacturer: args.manufacturer,
        owners: args.owners,
        photoUrls: args.photoUrls,
    }).save();
    console.log(phone);
    return {
        id: phone._id.toString(),
        name: phone.name,
        description: phone.description,
        manufacturer: phone.manufacturer?.toString(),
        owners: phone.owners,
        photoUrls: phone.photoUrls,
    };
}


async function createManufacturer(args) {
    const manufacturer = await new Manufacturer({
        name: args.name,
    }).save();
    console.log(manufacturer);
    return {
        id: manufacturer._id.toString(),
        name: manufacturer.name,
    };
}

async function deletePhone(args) {
    console.log(args);
    const phone = await Phone.findByIdAndDelete(args._id).exec();
    return;
}

async function deleteManufacturer(args) {
    console.log(args);
    const manufacturer = await Manufacturer.findByIdAndDelete(args._id).exec();
    return;
}

const serviceObject = {
    PhoneService: {
        PhoneServiceSoapPort: {
            Phone: getPhone,
            Phones: getPhones,
            CreatePhone: createPhone,
            DeletePhone: deletePhone,
            Manufacturer: getManufacturer,
            Manufacturers: getManufacturers,
            CreateManufacturer: createManufacturer,
            DeleteManufacturer: deleteManufacturer,
        },
    },
};

const xml = fs.readFileSync("service.wsdl", "utf8");

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {

    const router = express.Router();
    app.use('/api/v1', router);

    fs.readdirSync('./routes/').forEach((file) => {
        if (!file.includes('.js')) return;
        const route = './routes/' + file;
        require(route)(router);
    });

    const wsdl_path = "/wsdl";
    soap.listen(app, wsdl_path, serviceObject, xml);



    app.listen(port);
    console.log(`API is running in http://localhost:${port}/api/v1\nhttp://localhost:${port}${wsdl_path}?wsdl to see if wsdl is working.`);
}).catch(err => console.error(err));


