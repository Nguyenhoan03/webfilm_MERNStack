const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const initRoutes = require('./routes/index');

const app = express();
const server = http.createServer(app);

// CORS configuration - Cấu hình CORS chi tiết hơn
app.use(cors());

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Socket.IO with detailed error handling
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://127.0.0.1:3000","*"],
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000
});

// Socket.IO event handlers with error handling
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    let currentRoom = null;
    socket.on('join_room', (titlefilm) => {
        try {
            if(currentRoom){
                socket.leave(currentRoom);
            }
            socket.join(titlefilm);
            currentRoom = titlefilm;
            console.log(`Client ${socket.id} joined room: ${titlefilm}`);
        } catch (error) {
            console.error('Error joining room:', error);
        }
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    socket.on('disconnect', (reason) => {
        console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Make io available to our routes
app.set('io', io);

// Initialize routes
initRoutes(app);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
