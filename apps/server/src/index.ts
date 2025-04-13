import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Socket, Server as SocketIOServer } from 'socket.io';

import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

interface Message {
  id: string;
  content: string;
  senderUsername: string;
  senderId: string;
}

interface Room {
  members: Map<string, string>;
  messages: Message[];
}

const rooms = new Map<string, Room>();

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// TODO - Create ROOM Manager
io.on('connection', (socket: Socket) => {
  console.log('a user connected', socket.id);

  socket.on('create_room', (username) => {
    socket.data.username = username;

    const roomId = randomBytes(3).toString('hex').toUpperCase();

    rooms.set(roomId, {
      members: new Map([[socket.id, username]]),
      messages: [],
    });

    socket.join(roomId);

    socket.emit('room_created', roomId);
  });

  socket.on('join_room', (username, roomId) => {
    socket.data.username = username;

    const room = rooms.get(roomId);
    if (!room) {
      socket.emit('error', { message: `Room ${roomId} does not exist.` });
      return;
    }

    room.members.set(socket.id, username);

    socket.join(roomId);

    socket.emit('room_joined', roomId);
  });

  socket.on('load_messages', (roomId) => {
    const room = rooms.get(roomId);
    if (!room) {
      socket.emit('error', { message: `Room ${roomId} does not exist.` });
      return;
    }

    const messages = room.messages;

    socket.emit('messages', messages);
  });

  socket.on('send_message', (content, roomId) => {
    const room = rooms.get(roomId);
    if (!room) {
      socket.emit('error', { message: `Room ${roomId} does not exist.` });
      return;
    }

    const newMessage: Message = {
      id: uuidv4(),
      content: content,
      senderUsername: socket.data.username,
      senderId: socket.id,
    };

    room.messages.push(newMessage);

    io.to(roomId).emit('message_received', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);

    // TODO - add socket to rooms map to reduce this
    rooms.forEach((room, roomId) => {
      if (room.members.has(socket.id)) {
        room.members.delete(socket.id);
      }

      if (room.members.size === 0) {
        rooms.delete(roomId);
      }
    });
  });
});

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
