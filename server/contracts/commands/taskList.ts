import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ActivityLogResponse } from './activityLog';

const CreateTaskListRequestSchema = z.object({
  title: z.string().min(3).max(255),
  authorId: z.string(),
}) satisfies z.Schema<Prisma.ListUncheckedCreateInput>;

const UpdateTaskListRequestSchema = z.object({
  title: z.string().min(3).max(255),
  authorId: z.string(),
}) satisfies z.Schema<Prisma.ListUncheckedUpdateInput>;

const TaskListResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  order: z.number(),
  activityLog: ActivityLogResponse,
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
