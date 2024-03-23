import { ActivityLogResponseSchema } from './activityLog';
import { TaskListResponseSchema } from './taskList';
import { z } from 'zod';

const UserResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  lists: TaskListResponseSchema,
  tasks: TaskListResponseSchema,
  activityLog: ActivityLogResponseSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

type UserResponse = z.infer<typeof UserResponseSchema>;

export { UserResponseSchema, UserResponse };
