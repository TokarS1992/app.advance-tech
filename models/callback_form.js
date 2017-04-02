
const mongoose = require('mongoose');

var callbackSchema = mongoose.Schema({
    name: String,
    mail: String,
    number: Number
})

module.exports = mongoose.model('Callback',callbackSchema);