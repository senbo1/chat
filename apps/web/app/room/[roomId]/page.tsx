'use client';

import ChatModal from '@/components/chat/Chat';
import { useSocket } from '@/context/SocketContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const { roomId } = useSocket();

  useEffect(() => {
    if (!roomId) {
      router.push('/');
    }
  }, [roomId, router]);

  return (
    <main className="flex items-center justify-center min-h-svh">
      <ChatModal roomId={roomId!} />
    </main>
  );
}
