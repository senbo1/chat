'use client';

import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/context/SocketContext';
import { CardContent } from '@chat/ui/components/card';
import { ScrollArea } from '@chat/ui/components/scroll-area';
import { cn } from '@chat/ui/lib/utils';

export default function ChatContainer() {
  const { socket, messages } = useSocket();

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTimestamp = (date: string | Date) => {
    const timestamp = new Date(date);
    return timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <CardContent className="flex-1 overflow-hidden">
      <ScrollArea className="h-[500px] p-2">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex flex-col gap-1 mr-2',
                msg.senderId === socket?.id ? 'items-end' : 'items-start'
              )}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-semibold text-foreground">
                  {msg.senderId === socket?.id ? 'You' : msg.senderUsername}
                </span>
                <span
                  className="text-[10px] text-muted-foreground"
                  suppressHydrationWarning
                >
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>
              <div className="rounded-lg bg-muted-foreground/10 px-3 py-2 text-sm break-words max-w-[85%]">
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div ref={messageEndRef} />
      </ScrollArea>
    </CardContent>
  );
}
