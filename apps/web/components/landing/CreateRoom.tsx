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
import { createRoomSchema } from '@chat/schema';

export default function CreateRoom() {
  const [username, setUsername] = useState('');

  console.log(createRoomSchema.safeParse({ username: 'Harsh' }));

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
          <MessageCircle className="h-5 w-5" /> Create a New Room
        </CardTitle>
        <CardDescription>
          Create a temporary chat room and invite others to join.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Your Username</Label>
          <Input id="username" placeholder="Enter your username"></Input>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create Room</Button>
      </CardFooter>
    </Card>
  );
}
