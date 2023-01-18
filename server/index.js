const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

app.use(cors());

const PORT = process.env.PORT || 3002;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  },
});

io.on('connection', (socket) => {
  console.log(`a user: ${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('send-message', (data) => {
    // console.log(data);
    socket.broadcast.emit('receive-message', data);
  });
});


server.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
