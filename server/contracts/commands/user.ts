import { z } from 'zod';

const UserResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type UserResponse = z.infer<typeof UserResponseSchema>;

export { UserResponseSchema, UserResponse };
