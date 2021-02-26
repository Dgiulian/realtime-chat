import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import router from './router';

const app = express();
const server = http.createServer(app);

const io = new socketio.Server(server, {});

const PORT = process.env.PORT || 5000;

app.use(router);

server.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
