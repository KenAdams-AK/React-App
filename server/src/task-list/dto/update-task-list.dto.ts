import { UpdateTaskListRequestSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class UpdateTaskListDto extends createZodDto(
  UpdateTaskListRequestSchema,
) {}
