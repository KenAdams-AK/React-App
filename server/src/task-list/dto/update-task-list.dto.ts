import { CreateTaskListDto } from './create-task-list.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTaskListDto extends PartialType(CreateTaskListDto) {}
