'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { io, Socket } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  Message,
} from '@chat/shared/types';

interface SocketProviderProps {
  children: ReactNode;
}

type SocketIOClient = Socket<ServerToClientEvents, ClientToServerEvents>;

interface SocketContextProps {
  socket: SocketIOClient | null;
  isConnected: boolean;
  roomId: string | null;
  messages: Message[];
}

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080';

const SocketContext = createContext<SocketContextProps | null>(null);

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<SocketIOClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();

  useEffect(() => {
    const newSocket: SocketIOClient = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('connect_error', () => {
      toast.error('Failed to connect to socket');
      setIsConnected(false);
    });

    newSocket.on('room_created', (roomId) => {
      setRoomId(roomId);
      router.push(`/room/${roomId}`);
    });

    newSocket.on('room_joined', (roomId, messages) => {
      setRoomId(roomId);
      setMessages(messages);
      router.push(`/room/${roomId}`);
    });

    newSocket.on('message_received', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('error', ({ message }) => {
      console.log(message);
      toast.error(message);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, []);

  const contextValue: SocketContextProps = {
    socket,
    isConnected,
    roomId,
    messages,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
