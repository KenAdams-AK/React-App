// import { Prisma } from '@prisma/client';
import { z } from 'zod';

const ACTION = [
  'CREATE',
  'MOVE',
  'RENAME',
  'ADD_DESCRIPTION',
  'CHANGE_DESCRIPTION',
  'CHANGE_STATUS',
  'CHANGE_PRIORITY',
  'ADD_DUE_DATE',
  'CHANGE_DUE_DATE',
  'DELETE',
] as const;
const ENTITY_TYPE = ['TASK', 'LIST'] as const;

const CreateActivityLogSchema = z
  .object({
    entityType: z.enum(ENTITY_TYPE),
    action: z.enum(ACTION),
    prevValue: z.nullable(z.string()),
    newValue: z.nullable(z.string()),
    authorId: z.string(),
    taskId: z.string().optional(),
    listId: z.string().optional(),
  })
  .strict();
// satisfies z.Schema<Prisma.ActivityLogUncheckedCreateInput>;

const ActivityLogResponseSchema = z.object({
  id: z.string(),
  entityType: z.enum(ENTITY_TYPE),
  action: z.enum(ACTION),
  prevValue: z.nullable(z.string()),
  newValue: z.nullable(z.string()),
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
  type CreateActivityLog,
  type ActivityLogResponse,
};
