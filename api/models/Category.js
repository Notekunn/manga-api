const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const utils = require('../utils/');
const CategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String
    }
})


module.exports = mongoose.model('category', CategorySchema);