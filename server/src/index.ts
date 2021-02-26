import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import router from './router';
import cors from 'cors';
//import * as cors from 'cors';

const PORT = process.env.PORT || 5000;
const corsOptions: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:3000',
  preflightContinue: false,
};

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: corsOptions,
});

router.use(cors(corsOptions));

app.use(router);

io.on('connection', (socket) => {
  console.log(`New Connection established`);

  socket.on('disconnect', () => {
    console.log(`User has left`);
  });
  socket.on(
    'join',
    ({ name, room }: { name: string; room: string }, callback: Function) => {
      console.log(name, room);
      if (!name) callback({ error: 'Name must be defined' });
      if (!room) callback({ error: 'Name must be defined' });
    }
  );
});

server.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
