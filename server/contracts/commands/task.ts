import { z } from 'zod';

const CreateTaskRequestSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255).optional().or(z.literal('')),
  status: z.enum(['IN_PROGRESS', 'COMPLETED', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: z.string().optional().or(z.literal('')),
  authorId: z.string(),
  listId: z.string(),
});

const UpdateTaskRequestSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255).optional().or(z.literal('')),
  status: z.enum(['IN_PROGRESS', 'COMPLETED', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: z.string().optional().or(z.literal('')),
  authorId: z.string(),
  listId: z.string(),
});

const TaskResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional().or(z.literal('')),
  status: z.enum(['IN_PROGRESS', 'COMPLETED', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: z.string().optional().or(z.literal('')),
  authorId: z.string(),
  listId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>;
type UpdateTaskRequest = z.infer<typeof UpdateTaskRequestSchema>;
type TaskResponse = z.infer<typeof TaskResponseSchema>;

export {
  CreateTaskRequestSchema,
  UpdateTaskRequestSchema,
  TaskResponseSchema,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskResponse,
};
