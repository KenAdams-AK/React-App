import { Prisma } from '@prisma/client';
import { z } from 'zod';

const CreateTaskListRequestSchema = z.object({
  title: z.string().min(1).max(255),
  authorId: z.string(),
  order: z.number(), // TODO: Make this optional or set default value in Prisma schema
}) satisfies z.Schema<Prisma.ListUncheckedCreateInput>;

const UpdateTaskListRequestSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(255),
  authorId: z.string(),
});

const TaskListResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  order: z.number(),
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
  CreateTaskListRequest,
  UpdateTaskListRequest,
  TaskListResponse,
};
