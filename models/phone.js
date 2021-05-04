/* jshint esversion: 9 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    owners: {
        type: [Number],
        default: null,
    },
    manufacturer: { type: Schema.ObjectId, ref: 'Manufacturer' },
    photoUrls: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model('Phone', PhoneSchema);