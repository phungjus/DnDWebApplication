'use strict';

const WebSocket = require('ws');
let server = require('http').createServer();
let app = require('./app');

// Create web socket server on top of a regular http server
let wss = new WebSocket.Server({
  server: server
});

// Also mount the app here
server.on('request', app);

wss.on('connection', function connection(ws) {
    console.log("connected")
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
            console.log(data)
            client.send(data);
      }
    });
  });
});


server.listen(process.env.PORT || 5000, function() {

  console.log(`http/ws server listening on ${process.env.PORT || 5000 }`);
});