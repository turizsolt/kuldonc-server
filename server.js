const sendNotification = require("./gcm");

const io = require('socket.io');
io.listen(8647);

const messages = [];
const tokens = [];

io.on('connection', (socket) => {
    console.log('connection', socket);

    socket.on('token', (token) => {
        console.log('token', token);
        token.push(token);
    });

    socket.on('message', (data) => {
        console.log('message', data);
        messages.push(data);

        // socket notification
        socket.broadcast.emit('message', data);

        // gcm notification
        sendNotification(tokens, data.message);
    });

    socket.on('get-messages', () => {
        console.log('get-messages');
        socket.emit('messages', messages);
    });
});
