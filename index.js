var mosca = require('mosca');


var settings = {
    port: 8080
};



var moscaserver = new mosca.Server(settings);
moscaserver.on('ready', setup);

moscaserver.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});


moscaserver.on('clientDisconnected', function(client) {
    count = 0;
    console.log('client disconnect', client.id);
});


var count = 0;

// fired when a message is received
moscaserver.on('published', function(packet, client) {
    count++;
    console.log(count + ':Published', packet.topic, packet.payload.toString());
});

// fired when the mqtt server is ready
function setup() {

    console.log('Mosca server is up and running')
}