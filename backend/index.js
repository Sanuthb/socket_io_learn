import express from 'express';
import cors from 'cors';
import http from 'http';
import  { Server } from 'socket.io';
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('click', (data) => {
    console.log('Received data:', data.message);
    io.emit('message', data); 
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
