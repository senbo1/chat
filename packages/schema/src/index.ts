import { z } from 'zod';

export const createRoomSchema = z.object({
  username: z
    .string({
      required_error: 'Username is Required',
    })
    .max(30, { message: 'Username cannot be more than 30 characters' }),
});

export const joinRoomSchema = z.object({
  username: z
    .string({
      required_error: 'Username is Required',
    })
    .max(30, { message: 'Username cannot be more than 30 characters' }),
  roomCode: z
    .string()
    .max(6, { message: 'Room Code cannot be more than 6 characters' }),
});

export type CreateRoomValues = z.infer<typeof createRoomSchema>;
export type JoinRoomValues = z.infer<typeof joinRoomSchema>;
