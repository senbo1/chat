'use client';

import { useState } from 'react';
import { Button } from '@chat/ui/components/button';
import { Input } from '@chat/ui/components/input';
import { Label } from '@chat/ui/components/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@chat/ui/components/card';
import { MessageCircle } from 'lucide-react';

export default function JoinRoom() {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement create room logic
    console.log('Create Room:', { username });
    // Potentially call a prop function passed down from ChatTabs
    // e.g., props.onCreateRoom({ username });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageCircle className="h-5 w-5" /> Join Existing Room
        </CardTitle>
        <CardDescription>
          Enter a room code to join an existing chat room
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Your Username</Label>
            <Input id="username" placeholder="Enter your username"></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Room Code</Label>
            <Input id="username" placeholder="Enter Room Code"></Input>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create Room</Button>
      </CardFooter>
    </Card>
  );
}
