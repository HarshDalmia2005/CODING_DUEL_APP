const http = require('http');
const express = require('express');
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const cors = require('cors');
const axios = require('axios');
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

async function submitToPiston({ language, version, code, stdin }) {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
        language,
        version,
        files: [{ name: 'main', content: code }],
        stdin:stdin || ''
    });

    // console.log(response.data)
    return response.data;
}

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

            const startTimestamp = Date.now();
            player1.emit('matchFound', { roomId, startTimestamp });
            player2.emit('matchFound', { roomId, startTimestamp });

            console.log(`Match found! Room: ${roomId}`);
        }
    });

    socket.on('submitCode', async (data) => {
        const { room, userId, code, language, version, stdin } = data;
        // console.log(data)
        // Run code on Piston
        let result;
        let executionTime = 0;
        try {
            const start = Date.now();
            result = await submitToPiston({ language, version, code, stdin });
            executionTime = Date.now() - start;
        } catch (err) {
            result = { stdout: '', stderr: err.message || 'Execution failed' };
        }

        if (!duelSubmissions[room]) duelSubmissions[room] = [];
        duelSubmissions[room].push({
            userId,
            stdout: result.run.stdout,
            stderr: result.run.stderr,
            executionTime
        });

        if (duelSubmissions[room].length === 1) {
            const first = duelSubmissions[room][0];
            
            const firstCorrect = !first.stderr && first.stdout?.trim() !== '';
            if (firstCorrect) {
                // console.log(first.stdout)
                io.to(room).emit('duelResult', {
                    winner: first.userId,
                    p1: first,
                    p2: null,
                    reason: 'First correct submission, wins by default',
                    output:first.stdout
                });
                delete duelSubmissions[room];
                return;
            }
        }

        if (duelSubmissions[room].length === 2) {
            const [first, second] = duelSubmissions[room];

            let winner = null;
            let reason = '';

            const firstCorrect = !first.stderr && first.stdout?.trim() !== '';
            const secondCorrect = !second.stderr && second.stdout?.trim() !== '';

            if (firstCorrect && secondCorrect) {
                // Winner is the one who submitted first (first in array)
                winner = first;
                reason = 'Both correct, first to submit wins';
            } else if (firstCorrect) {
                winner = first;
                reason = 'Only one correct submission';
            } else if (secondCorrect) {
                winner = second;
                reason = 'Only one correct submission';
            } else {
                reason = 'No correct submissions';
            }

            io.to(room).emit('duelResult', { winner:winner?.userId, p1: first?.userId, p2: second?.userId, reason, output:winner?.stdout });
            delete duelSubmissions[room];
        }
    });

    function handlePlayerExit(socket) {
        const roomId = socketRoomMap[socket.id];
        if (roomId) {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
            clients.forEach(clientId => {
                if (clientId !== socket.id) {
                    // The remaining player is the winner
                    io.to(clientId).emit('duelResult', {
                        winner: clientId,
                        reason: 'Opponent left, you win by default'
                    });
                }
                io.to(clientId).emit('opponentDisconnected');
                io.sockets.sockets.get(clientId)?.leave(roomId);
                delete socketRoomMap[clientId];
            });
            delete socketRoomMap[socket.id];
            delete duelSubmissions[roomId];
        }
    }

    socket.on('leaveRoom', () => {
        handlePlayerExit(socket);
    });

    socket.on('disconnect', () => {
        const index = waitingQueue.findIndex(s => s.id === socket.id);
        if (index !== -1) waitingQueue.splice(index, 1);
        handlePlayerExit(socket);
        console.log('User disconnected:', socket.id);
    });
});

app.get('/', (req, res) => {
    res.send("Server is Running")
});

server.listen(process.env.PORT, (req, res) => {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
})

