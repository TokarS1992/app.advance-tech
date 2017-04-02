const mongoose = require('mongoose');
const config = require('../config');
var MONGODB_URI = 'mongodb://sergey:poloserg135@ds133279.mlab.com:33279/advanced';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';

MONGODB_URI = env == "production" ? "mongodb://sergey:poloserg135@ds133279.mlab.com:33279/advanced" : config.get('db:connection') + config.get('db:nameBD');

console.log(env);

var db = mongoose.createConnection(MONGODB_URI);

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;