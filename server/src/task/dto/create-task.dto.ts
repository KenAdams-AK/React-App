import { CreateTaskRequestSchema } from 'contracts';
import { createZodDto } from 'nestjs-zod';

export class CreateTaskDto extends createZodDto(CreateTaskRequestSchema) {}
