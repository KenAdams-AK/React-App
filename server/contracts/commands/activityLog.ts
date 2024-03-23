import { z } from 'zod';

const CreateActivityLog = z.object({
  action: z.enum([
    'CREATE',
    'RENAME',
    'ADD_DESCRIPTION',
    'CHANGE_DESCRIPTION',
    'CHANGE_STATUS',
    'CHANGE_PRIORITY',
    'ADD_DUE_DATE',
    'CHANGE_DUE_DATE',
    'DELETE',
  ]),
  entityType: z.enum(['TASK', 'LIST']),
  entityId: z.string(),
  entityTitle: z.string(),
  authorId: z.string(),
});

const ActivityLogResponse = z.object({
  id: z.string(),
  action: z.enum([
    'CREATE',
    'RENAME',
    'ADD_DESCRIPTION',
    'CHANGE_DESCRIPTION',
    'CHANGE_STATUS',
    'CHANGE_PRIORITY',
    'ADD_DUE_DATE',
    'CHANGE_DUE_DATE',
    'DELETE',
  ]),
  entityType: z.enum(['TASK', 'LIST']),
  entityId: z.string(),
  entityTitle: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
});

type CreateActivityLog = z.infer<typeof CreateActivityLog>;
type ActivityLogResponse = z.infer<typeof ActivityLogResponse>;

export { CreateActivityLog, ActivityLogResponse };
