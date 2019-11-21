const sendNotification = require("./gcm");

const io = require('socket.io')(8647);

const messages = [];
const tokens = [];

io.on('connection', (socket) => {

    socket.on('token', (token) => {
        token.push(token);
    });

    socket.on('message', (data) => {
        messages.push(data);

        // socket notification
        socket.broadcast.emit('message', data);

        // gcm notification
        sendNotification(tokens, data.message);
    });

    socket.on('get-messages', () => {
        socket.emit('messages', messages);
    });
});
