var db = require('../lib/mongoose');
var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

router.get('/categories', function(req, res, next) {
    var collection = db.collection('categories');

    collection.find({})
        .toArray(function(err, data) {
            if (!err) {
                res.json(data);
                res.end();
            } else {
                console.log(err);
            }
        });
});

router.get('/banners', function(req, res, next) {
    var collection = db.collection('banners');

    collection.find({})
        .toArray(function(err, data) {
            if (!err) {
                res.json(data);
                res.end();
            } else {
                console.log(err);
            }
        });
});

router.get('/contacts', function(req, res, next) {

    var collection = db.collection('contacts');

    collection.find({})
        .toArray(function(err, data) {
            if (!err) {
                res.json(data);
                res.end();
            } else {
                console.log(err);
            }
        });
});

router.get('/service', function(req, res, next) {

    var collection = db.collection('portfolio');

    collection.find({}).limit(5)
        .toArray(function(err, data) {
            if (!err) {
                res.json(data);
                res.end();
            } else {
                console.log(err);
            }
        });
});

router.get('/about_us', function(req, res, next) {

    var collection = db.collection('about');

    collection.find({})
        .toArray(function(err, data) {
            if (!err) {
                res.json(data);
                res.end();
            } else {
                console.log(err);
            }
        });
});

router.get('/users', function(req, res, next) {

    var user1 = new User({ first_name: 'Sergey', last_name: 'Tok', city: 'Dnepr', age: 23, children: false });

    user1.save(function(err) {
        if (err) {
            return console.log(err);
        } else {
            console.log('saved successfully new user')
        }
    });

    res.json(user1);
});

module.exports = router;