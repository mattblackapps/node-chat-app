var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMsg', {
    //     from: 'Somebody',
    //     text: 'Hey. Whats up?',
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMsg', function (msg) {
    console.log('New message', msg);
});