/* jshint esversion: 9 */
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const ManufacturerSchema = new Schema({
    name: {
        index: true,
        unique: true,
        trim: true,
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);