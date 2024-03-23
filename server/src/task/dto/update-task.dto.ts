import { UpdateTaskRequestSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class UpdateTaskDto extends createZodDto(UpdateTaskRequestSchema) {}
