'use strict';

const path = require('path');
const webpack = require('webpack');

var config = {
    context: path.join(__dirname, 'app'),
    entry: './app.module.js',
    output: {
        path: path.join(__dirname, 'public/build'),
        filename: 'build.js'
    }
}

const compiler = webpack(config);
compiler.run(function(err, stats) {
    console.log(stats.toJson()); // по завершению, выводим всю статистику
});