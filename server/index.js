const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');



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

//create new chema to save messages with sender name, text, uuid and timestamp
const messageSchema = new mongoose.Schema({
    sender: String,
    text: String,
    uuid: String,
    timestamp: String
});

// Create Socket.io instance
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});


io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    socket.on('send_message' , (data) => {
        //save message to database
        const Message = mongoose.model('Message', messageSchema);
        const message = new Message({ sender: data.name, text: data.text, uuid: uuidv4(), timestamp: new Date().toLocaleString() });
        message.save().then(() => console.log('Message saved'));
    });
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

// Start the server
const port = 5001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




