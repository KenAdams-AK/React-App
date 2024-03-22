import { z } from 'zod';

const CreateTaskListRequestSchema = z.object({
  title: z.string().min(1).max(255),
});

const UpdateTaskListRequestSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(255),
});

const TaskListResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
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
