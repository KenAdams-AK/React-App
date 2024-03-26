import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { TaskListResponse } from 'contracts';
import { ZodValidationPipe } from 'nestjs-zod';
import { UpdateTaskListDto } from './dto/update-task-list.dto';

@UsePipes(ZodValidationPipe)
@Controller('api/task-lists')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  create(
    @Body() createTaskListDto: CreateTaskListDto,
  ): Promise<TaskListResponse> {
    return this.taskListService.create(createTaskListDto);
  }

  @Get()
  findAll(): Promise<TaskListResponse[]> {
    return this.taskListService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskListDto: UpdateTaskListDto,
  ): Promise<TaskListResponse> {
    return this.taskListService.update(id, updateTaskListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TaskListResponse> {
    return this.taskListService.remove(id);
  }
}
