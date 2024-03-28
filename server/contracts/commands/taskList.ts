import { TaskResponseSchema } from './task';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const CreateTaskListRequestSchema = z
  .object({
    title: z.string().min(5).max(255),
    authorId: z.string(),
  })
  .strict() satisfies z.Schema<Prisma.ListUncheckedCreateInput>;

const UpdateTaskListRequestSchema = z
  .object({
    title: z.string().min(5).max(255),
    authorId: z.string(),
  })
  .strict() satisfies z.Schema<Prisma.ListUncheckedUpdateInput>;

const TaskListResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  order: z.number(),
  tasks: z.array(TaskResponseSchema).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type CreateTaskListRequest = z.infer<typeof CreateTaskListRequestSchema>;
type UpdateTaskListRequest = z.infer<typeof UpdateTaskListRequestSchema>;
type TaskListResponse = z.infer<typeof TaskListResponseSchema>;

export {
  CreateTaskListRequestSchema,
  UpdateTaskListRequestSchema,
  TaskListResponseSchema,
  type CreateTaskListRequest,
  type UpdateTaskListRequest,
  type TaskListResponse,
};
