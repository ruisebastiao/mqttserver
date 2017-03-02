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

    persistence: {
        factory: mosca.persistence.Memory
    }
    //backend: pubsubsettings,
    // persistence: {
    //     factory: mosca.persistence.Mongo,
    //     url: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/app'
    // }
}, function() {
    server.attachHttpServer(app);
});


server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});


server.on('clientDisconnected', function(client) {
    count = 0;
    console.log('client disconnect', client.id);
});


var count = 0;

// fired when a message is received
server.on('published', function(packet, client) {
    count++;
    console.log(count + ':Published', packet.topic, packet.payload.toString());
});

server.on('ready', function() {
    console.log('Mosca is running');
});