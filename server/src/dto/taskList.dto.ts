import { CreateTaskRequestSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class TaskListDto extends createZodDto(CreateTaskRequestSchema) {}
