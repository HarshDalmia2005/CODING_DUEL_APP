const http = require('http');
const express = require('express');
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});
app.use(cors());

const waitingQueue = [];
const duelSubmissions = {};
const socketRoomMap = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('findMatch', () => {
        console.log(`User ${socket.id} is finding match...`);
        socket.emit('status', 'Searching for a match');

        const index = waitingQueue.findIndex(s => s.id === socket.id);
        if (index === -1) waitingQueue.push(socket);

        if (waitingQueue.length >= 2) {
            const player1 = waitingQueue.shift();
            const player2 = waitingQueue.shift();

            const roomId = `room-${player1.id}-${player2.id}`;
            player1.join(roomId);
            player2.join(roomId);

            socketRoomMap[player1.id] = roomId;
            socketRoomMap[player2.id] = roomId;

            player1.emit('matchFound', roomId);
            player2.emit('matchFound', roomId);

            console.log(`Match found! Room: ${roomId}`);
        }
    });

    socket.on('submitCode', (data) => {
        const { room, userId, stdout, stderr, executionTime } = data;

        if (!duelSubmissions[room]) duelSubmissions[room] = [];
        duelSubmissions[room].push({ userId, stdout, stderr, executionTime });

        if (duelSubmissions[room].length === 2) {
            const [p1, p2] = duelSubmissions[room];

            let winner = null;
            let reason = '';

            const p1Correct = p1.stderr === null && p1.stdout?.trim() !== '';
            const p2Correct = p2.stderr === null && p2.stdout?.trim() !== '';

            if (p1Correct && p2Correct) {
                winner = p1.executionTime < p2.executionTime ? p1.userId : p2.userId;
                reason = 'Fastest correct code wins';
            } else if (p1Correct) {
                winner = p1.userId;
                reason = 'Only one correct submission';
            } else if (p2Correct) {
                winner = p2.userId;
                reason = 'Only one correct submission';
            } else {
                reason = 'No correct submissions';
            }

            io.to(room).emit('duelResult', { winner, p1, p2, reason });
        }
    });

    socket.on('leaveRoom', () => {
        const roomId = socketRoomMap[socket.id];
        if (roomId) {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
            clients.forEach(clientId => {
                io.to(clientId).emit('opponentDisconnected');
                io.sockets.sockets.get(clientId)?.leave(roomId);
                delete socketRoomMap[clientId];
            });
        }
    });

    socket.on('disconnect', () => {
        const index = waitingQueue.findIndex(s => s.id === socket.id);
        if (index !== -1) waitingQueue.splice(index, 1);

        const roomId = socketRoomMap[socket.id];
        if (roomId) {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
            clients.forEach(clientId => {
                if (clientId !== socket.id) {
                    io.to(clientId).emit('opponentDisconnected')
                    io.sockets.sockets.get(clientId)?.leave(roomId);
                }
                delete socketRoomMap[clientId];
            });
            delete socketRoomMap[socket.id];
        }
        console.log('User disconnected:', socket.id);
    });
});

app.get('/', (req, res) => {
    res.send("Server is Running")
});

server.listen(process.env.PORT, (req, res) => {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
})

