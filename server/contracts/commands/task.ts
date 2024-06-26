import { ActivityLogResponseSchema } from './activityLog';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const STATUS = ['IN_PROGRESS', 'COMPLETED', 'DELETED'] as const;
const PRIORITY = ['LOW', 'MEDIUM', 'HIGH'] as const;

const CreateTaskRequestSchema = z
  .object({
    title: z.string().min(5).max(255),
    description: z.string().min(5).max(255).optional().or(z.literal('')),
    status: z.enum(STATUS),
    priority: z.enum(PRIORITY),
    dueDate: z.date().optional(),
    authorId: z.string(),
    listId: z.string(),
  })
  .strict() satisfies z.Schema<Prisma.TaskUncheckedCreateInput>;

const UpdateTaskRequestSchema = z
  .object({
    title: z.string().min(5).max(255),
    description: z.string().min(5).max(255).optional().or(z.literal('')),
    status: z.enum(STATUS),
    priority: z.enum(PRIORITY),
    dueDate: z.date().optional(),
    authorId: z.string(),
    listId: z.string(),
  })
  .strict() satisfies z.Schema<Prisma.TaskUncheckedUpdateInput>;

const TaskResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.nullable(z.string()),
  status: z.enum(STATUS),
  priority: z.enum(PRIORITY),
  dueDate: z.nullable(z.date()),
  authorId: z.string(),
  listId: z.string(),
  activityLog: z.array(ActivityLogResponseSchema).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>;
type UpdateTaskRequest = z.infer<typeof UpdateTaskRequestSchema>;
type TaskResponse = z.infer<typeof TaskResponseSchema>;

export {
  CreateTaskRequestSchema,
  UpdateTaskRequestSchema,
  TaskResponseSchema,
  type CreateTaskRequest,
  type UpdateTaskRequest,
  type TaskResponse,
};
