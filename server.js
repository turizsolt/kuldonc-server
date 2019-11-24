// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const sslPath = require('./ssl-config');
const express = require('express');

const app = express();

// Certificate
const privateKey = fs.readFileSync(sslPath + 'privkey.pem', 'utf8');
const certificate = fs.readFileSync(sslPath + 'cert.pem', 'utf8');
const ca = fs.readFileSync(sslPath + 'chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.use((req, res) => {
     res.send('Hello there !');
});

// Starting both http & https servers
// const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// httpServer.listen(80, () => {
//    console.log('HTTP Server running on port 80');
//});


const sendNotification = require("./gcm");

const io = require('socket.io')(httpsServer);
// io.listen(8647);

httpsServer.listen(8647, () => {
    console.log('HTTPS Server running on port 8647');
});

const messages = [];
const tokens = [];

io.on('connection', (socket) => {
    console.log('connection');

    socket.on('token', (token) => {
        console.log('token', token);
        tokens.push(token);
    });

    socket.on('message', (data) => {
        console.log('message', data);
        messages.push(data);

        // socket notification
        socket.broadcast.emit('message', data);

        // gcm notification
        sendNotification(tokens, data);
    });

    socket.on('get-messages', () => {
        console.log('get-messages');
        socket.emit('messages', messages);
    });
});
