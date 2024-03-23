import { Injectable, Logger } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(TaskService.name);

  async create(createTaskDto: CreateTaskDto) {
    // TODO: Implement ordering
    const task = await this.prisma.task.create({
      data: createTaskDto,
    });
    const activityLog = await this.prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entityType: 'TASK',
        taskId: task.id,
        authorId: createTaskDto.authorId,
      },
    });
    this.logger.log('Creating new task');
    console.log({ task, activityLog });

    return task;
  }

  findOne(id: string) {
    const task = this.prisma.task.findUniqueOrThrow({
      where: { id },
      include: {
        activityLog: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const activityLog = await this.prisma.activityLog.create({
      data: {
        action: 'CHANGE_DESCRIPTION',
        entityType: 'TASK',
        taskId: id,
        authorId: updateTaskDto.authorId,
      },
    });
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
      include: {
        activityLog: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    this.logger.log('Updating task');
    console.log({ task, activityLog });

    return task;
  }

  remove(id: string) {
    const task = this.prisma.task.delete({
      where: { id },
    });

    return task;
  }
}
