const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const specialSchema = new Schema({
    name: String,
    description: String,
    date: String
});
module.exports = mongoose.model('spEvent', specialSchema, 'specialEvents');