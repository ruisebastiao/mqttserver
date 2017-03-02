var express = require('express');
var http = require('http');
var mosca = require('mosca');

var app = express();
var server = http.createServer(app);

// var pubsubsettings = {
//     type: 'mongo',
//     url: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/app',
//     pubsubCollection: 'mqtt',
//     mongo: {}
// };

var server = new mosca.Server({
    //backend: pubsubsettings,
    // persistence: {
    //     factory: mosca.persistence.Mongo,
    //     url: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/app'
    // }
}, function() {
    server.attachHttpServer(app);
});

server.on('ready', function() {
    console.log('Mosca is running');
});
