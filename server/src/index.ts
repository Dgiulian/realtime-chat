import express from 'express';
import socketio, { Socket } from 'socket.io';
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
import { addUser, getUsersInRoom, removeUser, getUser } from './users';

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: corsOptions,
});

router.use(cors(corsOptions));

app.use(router);

io.on('connection', (socket: Socket) => {
  console.log(`New Connection established`);

  socket.on(
    'join',
    ({ name, room }: { name: string; room: string }, callback: Function) => {
      if (!name) callback({ error: 'Name must be defined' });
      if (!room) callback({ error: 'Room must be defined' });

      const { error, user } = addUser({ id: socket.id, name, room });
      if (error) {
        return callback(error);
      }
      if (!user) {
        return callback({ error: 'An error has occured' });
      }
      socket.emit('message', {
        user: 'admin',
        text: `${user.name}, welcome to the room ${user?.room}`,
      });
      socket.broadcast
        .to(user.room)
        .emit('message', { user: 'admin', text: `${user.name} has joined` });
      socket.join(user.room);
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      callback();
    }
  );
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    if (!user) {
      return callback({ error: '' });
    }
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    if (typeof callback === 'function') callback();
  });
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `user ${user.name} has left`,
      });
    }
  });
});

server.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
