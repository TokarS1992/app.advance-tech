var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var config = require('./config');

// Модуль router
var route = require('./routeModule');

var callback = require('./post/callback_form');

// Фреймворк
var app = express();

var options = {
    index: "index.html"
};

if (app.get('env') !== 'production') {

    options.index = "index.dev.html";
    // expose node_modules to client app
    app.use(express.static(__dirname + "/node_modules"));
}

// Шаблонизатор
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Статика
app.use(express.static(path.join(__dirname, 'public'), options));
app.use(express.static(path.join(__dirname, 'app')));

// Routes
app.use('/', route);
app.use('/callback', callback);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;