import { CreateTaskListRequestSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class CreateTaskListDto extends createZodDto(
  CreateTaskListRequestSchema,
) {}
