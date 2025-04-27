import { CardHeader } from '@chat/ui/components/card';
import { CopyButton } from './CopyButton';
import { Users } from 'lucide-react';

interface ChatHeaderProps {
  roomId: string;
}

export default function ChatHeader({ roomId }: ChatHeaderProps) {
  return (
    <CardHeader className="flex items-center justify-between border-b">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-muted-foreground">
          Room:
        </span>
        <span className="font-mono text-sm font-medium">{roomId}</span>
        <CopyButton textToCopy={roomId} ariaLabel="Copy room code" />
      </div>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>5</span>
        <span className="sr-only">Active Members</span>
      </div>
    </CardHeader>
  );
}
