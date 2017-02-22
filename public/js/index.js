var socket = io();
        
socket.on('connect', function(){
    console.log('Connected to Server.');

    socket.emit('loginMessage', {
        from: 'Yua',
        text: 'Login.',
    });
});

socket.on('disconnect', function(){
    console.log('Disconnected');
});

socket.on('newMessage', function(message){
    console.log('New message', message);
});