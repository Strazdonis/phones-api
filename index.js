/* jshint esversion: 9 */
const express = require('express');
const app = express();
const Phone = require('./models/phone');
const Manufacturer = require('./models/manufacturer');
const port = 80;
const mongoose = require('mongoose');
const fs = require('fs');


mongoose.connect("mongodb://mongo:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.error(err));

app.use(express.json());

const router = express.Router();

app.use('/api/v1', router);

fs.readdirSync('./routes/').forEach((file) => {
    if(!file.includes('.js')) return;
    const route = './routes/' + file;
    require(route)(router);
});


app.listen(port);
console.log(`API is running in http://localhost:${port}/api/v1`);
