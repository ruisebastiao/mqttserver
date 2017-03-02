// var express = require('express');
// var http = require('http');
// var mosca = require('mosca');

// var app = express();
// var server = http.createServer(app);

// // var pubsubsettings = {
// //     type: 'mongo',
// //     url: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/app',
// //     pubsubCollection: 'mqtt',
// //     mongo: {}
// // };

// var broker = new mosca.Server({

//     persistence: {
//         factory: mosca.persistence.Memory
//     }
//     //backend: pubsubsettings,
//     // persistence: {
//     //     factory: mosca.persistence.Mongo,
//     //     url: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/app'
//     // }
// }, function() {
//     broker.attachHttpServer(app);
// });

var mosca = require("mosca");
var port= process.env.PORT;

console.log(port);

var broker = new mosca.Server({
    http: {
        port:port || 5000,
        bundle: true,
        static: './'
    }
});



broker.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});


broker.on('clientDisconnected', function(client) {
    count = 0;
    console.log('client disconnect', client.id);
});


var count = 0;

// fired when a message is received
broker.on('published', function(packet, client) {
    count++;
    console.log(count + ':Published', packet.topic, packet.payload.toString());
});

broker.on('ready', function() {
    console.log('Mosca is running');
});