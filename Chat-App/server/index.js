const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);
const path = require('path');

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(__dirname, '../client');
});

io.on('connection', (socket) => {
    console.log("User connected");

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });

    socket.on('send message', (data) => {
        console.log(`Message from ${data.username}: ${data.message}`);
        io.emit('chat message', data);
    });
});

http.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
