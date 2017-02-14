const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(`New user connected`);

    // Greeting to new user
    socket.emit('newMsg', {
        from: 'Admin',
        text: 'Welcome to the chat app!',
        time: new Date().getTime()
    });

    // Broadcast new user joined
    socket.broadcast.emit('newMsg', {
        from: 'Admin',
        text: 'New user joined',
        time: new Date().getTime()
    });

    socket.on('createMsg', (msg) => {
        msg.time = new Date().getTime();
        console.log('New message', msg);

        // io.emit('newMsg', msg); //Everybody
        socket.broadcast.emit('newMsg', msg); // Everybody else
    });

    socket.on('disconnect', (socket) => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});