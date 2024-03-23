import { Prisma } from '@prisma/client';
import { z } from 'zod';

const ACTION = [
  'CREATE',
  'RENAME',
  'ADD_DESCRIPTION',
  'CHANGE_DESCRIPTION',
  'CHANGE_STATUS',
  'CHANGE_PRIORITY',
  'ADD_DUE_DATE',
  'CHANGE_DUE_DATE',
  'DELETE',
  // TODO: Add 'MOVE' action, in order to log when a task is moved to another list. Update Prisma schema as well.
] as const;
const ENTITY_TYPE = ['TASK', 'LIST'] as const;

const CreateActivityLogSchema = z.object({
  action: z.enum(ACTION),
  entityType: z.enum(ENTITY_TYPE),
  authorId: z.string(),
  taskId: z.string().optional(),
  listId: z.string().optional(),
}) satisfies z.Schema<Prisma.ActivityLogUncheckedCreateInput>;

const ActivityLogResponseSchema = z.object({
  id: z.string(),
  action: z.enum(ACTION),
  entityType: z.enum(ENTITY_TYPE),
  authorId: z.string(),
  taskId: z.nullable(z.string()),
  listId: z.nullable(z.string()),
  createdAt: z.date(),
});

type CreateActivityLog = z.infer<typeof CreateActivityLogSchema>;
type ActivityLogResponse = z.infer<typeof ActivityLogResponseSchema>;

export {
  CreateActivityLogSchema,
  ActivityLogResponseSchema,
  CreateActivityLog,
  ActivityLogResponse,
};
