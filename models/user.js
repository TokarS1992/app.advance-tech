// Model Users
const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    city: String,
    age: Number,
    children: Boolean
});

module.exports = mongoose.model('User', userSchema);