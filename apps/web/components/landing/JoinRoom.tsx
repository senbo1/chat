'use client';

import { joinRoomSchema, JoinRoomData } from '@chat/shared/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@chat/ui/components/button';
import { Input } from '@chat/ui/components/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@chat/ui/components/card';
import { MessageCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@chat/ui/components/form';
import { useSocket } from '@/context/SocketContext';

export default function JoinRoom() {
  const form = useForm<JoinRoomData>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: {
      username: '',
      roomId: '',
    },
  });
  const { socket, isConnected } = useSocket();

  const onSubmit = (values: JoinRoomData) => {
    if (!socket || !isConnected) return;
    const { username, roomId } = values;
    socket.emit('join_room', username, roomId);
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
        <Form {...form}>
          <form
            id="join-room-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Room Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button form="join-room-form" type="submit" className="w-full">
          Join Room
        </Button>
      </CardFooter>
    </Card>
  );
}
