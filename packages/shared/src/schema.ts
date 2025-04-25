import { z } from 'zod';

export const joinRoomSchema = z.object({
  username: z.string({ required_error: 'Username is required' }).min(3, {
    message: 'Username must be at least 3 characters long',
  }).max(30, {
    message: 'Username must be less than 30 characters',
  }),
  roomId: z.string({ required_error: 'Room ID is required' }).length(6, {
    message: 'Room ID must be exactly 6 characters long',
  }),
});

export const createRoomSchema = joinRoomSchema.omit({ roomId: true });

export type CreateRoomData = z.infer<typeof createRoomSchema>;
export type JoinRoomData = z.infer<typeof joinRoomSchema>;
