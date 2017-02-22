const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '/../public');
const socketIO = require ("socket.io");
const express = require('express');
const port = process.env.PORT || 3000;

var app = express();
var server = app.listen(port);
var io = socketIO.listen(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connect');
    socket.emit('newMessage', {
        from: 'Server',
        text: 'Welcome.'
    })

    socket.on('loginMessage', (message) => {
        console.log(`From ${message.from}: ${message.text}`)
    });

    socket.on('createMessage', (message) => {
        console.log('receive new message', message.from, ': ', message.text);
        var newMessage = message;
        newMessage.createAt = new Date().getTime();
        io.emit('newMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});