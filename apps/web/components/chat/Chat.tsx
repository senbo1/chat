import * as React from 'react';
import { Card } from '@chat/ui/components/card';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatContainer from './ChatContainer';

interface ChatModalProps {
  roomId: string;
}

export default function ChatModal({ roomId }: ChatModalProps) {
  return (
    <Card className="w-full max-w-3xl max-h-3/4 m-2 gap-0 overflow-hidden">
      <ChatHeader roomId={roomId} />
      <ChatContainer />
      <ChatFooter />
    </Card>
  );
}
