export interface Message {
  id: string;
  content: string;
  senderUsername: string;
  senderId: string;
  timestamp: string | Date;
}

export interface ServerToClientEvents {
  room_created: (roomId: string) => void;
  room_joined: (roomId: string) => void;
  messages: (messages: Message[]) => void;
  message_received: (message: Message) => void;
  error: (payload: { message: string }) => void;
}

export interface ClientToServerEvents {
  create_room: (username: string) => void;
  join_room: (username: string, roomId: string) => void;
  load_messages: (roomId: string) => void;
  send_message: (content: string, roomId: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  username: string;
}
