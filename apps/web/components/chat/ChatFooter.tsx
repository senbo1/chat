'use client';

import { useEffect, useState } from 'react';
import { Input } from '@chat/ui/components/input';
import { Button } from '@chat/ui/components/button';
import { CardFooter } from '@chat/ui/components/card';
import { Send } from 'lucide-react';
import { useSocket } from '@/context/SocketContext';

export default function ChatFooter() {
  const [inputValue, setInputValue] = useState('');
  const { socket, isConnected, roomId } = useSocket();

  const sendMessage = (content: string) => {
    if (!socket || !isConnected || !roomId) return;
    socket.emit('send_message', content, roomId);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        sendMessage(inputValue);
        setInputValue('');
      }
    }
  };

  return (
    <CardFooter className="border-t">
      <form onSubmit={handleSend} className="flex w-full items-center gap-2">
        <Input
          id="message"
          placeholder="Type your message..."
          className="flex-1 bg-background"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button type="submit" size="icon" disabled={!inputValue.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </CardFooter>
  );
}
