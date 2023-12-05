const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');


// Create Express server
const app = express();
const server = require('http').createServer(app);
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://chat_user:chat_user@cluster0.nxav2vt.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });
const db = mongoose.connection;





// Create Socket.io instance
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});


io.on('connect', (socket) => {
    console.log('A user connected', socket.id);
    socket.on('message', (message) => {
        console.log('Received', message);
        io.emit('serverMessage', message);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    });
});


// Start the server
const port = 5001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

