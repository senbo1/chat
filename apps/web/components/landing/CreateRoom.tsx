'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@chat/ui/components/form';
import { Input } from '@chat/ui/components/input';
import { Button } from '@chat/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@chat/ui/components/card';
import { MessageCircle } from 'lucide-react';

import { createRoomSchema, CreateRoomData } from '@chat/shared/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSocket } from '@/context/SocketContext';

export default function CreateRoom() {
  const form = useForm<CreateRoomData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: '',
    },
  });

  const { socket, isConnected } = useSocket();

  const onSubmit = (values: CreateRoomData) => {
    if (!socket || !isConnected) return;
    const { username } = values;
    socket.emit('create_room', username);
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
        <Form {...form}>
          <form
            id="create-room-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
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
            ></FormField>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button form="create-room-form" type="submit" className="w-full">
          Create Room
        </Button>
      </CardFooter>
    </Card>
  );
}
