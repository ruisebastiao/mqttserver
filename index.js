// var localtunnel = require('localtunnel');
// var port = 1883
// var tunnel = localtunnel(port, { subdomain: 'dreamfoit' }, function(err, tunnel) {
//     if (err) {
//         console.log(err);
//     }

//     // the assigned public url for your tunnel
//     // i.e. https://abcdefgjhij.localtunnel.me
//     console.log(tunnel.url)
// });

// tunnel.on('close', function() {
//     // tunnels are closed
// });


var ngrok = require("ngrok");
ngrok.connect({
    proto: 'tcp', // http|tcp|tls 
    addr: 1883, // port or network address 
    //  auth: 'user:pwd', // http basic authentication for tunnel 
    //  subdomain: 'alex', // reserved tunnel name https://alex.ngrok.io 
    authtoken: '1crbWWAyvBPfc5cnMEd1_34ExXKEVwuVCUU1cGT5FM', // your authtoken from ngrok.com 
    region: 'eu' // one of ngrok regions (us, eu, au, ap), defaults to us 
}, function(err, url) {
    if (err) {
        console.log(err)
        return;
    }

    console.log(url);


});


var mosca = require('mosca');


var settings = {
    port: 1883
};



var server = new mosca.Server(settings);
server.on('ready', setup);

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

// fired when the mqtt server is ready
function setup() {

    console.log('Mosca server is up and running')
}