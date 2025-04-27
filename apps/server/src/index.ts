import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import {
  Message,
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from '@chat/shared/types';
import { createRoomSchema, joinRoomSchema } from '@chat/shared/schema';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer);

interface Room {
  members: Map<string, string>;
  messages: Message[];
}

const rooms = new Map<string, Room>();

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// TODO - Create ROOM Manager
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  console.log('number of clients', io.engine.clientsCount);

  socket.on('create_room', (rawUsername) => {
    const { success, data } = createRoomSchema.safeParse({
      username: rawUsername,
    });

    if (!success) {
      socket.emit('error', { message: 'Invalid username' });
      return;
    }

    const { username } = data;
    socket.data.username = username;

    const roomId = randomBytes(3).toString('hex').toUpperCase();
    console.log('create_room', username, { roomId });

    rooms.set(roomId, {
      members: new Map([[socket.id, username]]),
      messages: [],
    });

    socket.join(roomId);

    socket.emit('room_created', roomId);
  });

  socket.on('join_room', (rawUsername, rawRoomId) => {
    const { success, data } = joinRoomSchema.safeParse({
      username: rawUsername,
      roomId: rawRoomId,
    });

    if (!success) {
      socket.emit('error', { message: 'Invalid username or roomId' });
      return;
    }

    const { username, roomId } = data;

    socket.data.username = username;

    const room = rooms.get(roomId);
    if (!room) {
      socket.emit('error', { message: `Room ${roomId} does not exist.` });
      return;
    }

    room.members.set(socket.id, username);

    console.log('join_room', username, { roomId });
    console.log('room messages', room.messages);
    socket.join(roomId);

    socket.emit('room_joined', roomId);
    socket.emit('messages', room.messages);
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
      timestamp: new Date(),
    };

    console.log('send_message', { roomId, newMessage });
    room.messages.push(newMessage);

    io.to(roomId).emit('message_received', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);

    // TODO - add sockettorooms map to reduce this
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
