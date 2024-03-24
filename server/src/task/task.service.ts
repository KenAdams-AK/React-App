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
        authorId: task.authorId,
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
          include: { author: true },
        },
      },
    });

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const prevTask = await this.prisma.task.findUniqueOrThrow({
      where: { id },
    });
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    for (const [key, value] of Object.entries(updatedTask)) {
      switch (key) {
        case 'title':
          if (prevTask.title === value) break;
          await this.prisma.activityLog.create({
            data: {
              entityType: 'TASK',
              action: 'RENAME',
              taskId: id,
              authorId: updatedTask.authorId,
              prevValue: prevTask.title,
              newValue: updatedTask.title,
            },
          });
          break;

        case 'description':
          if (prevTask.description === value) break;
          if (prevTask.description === null) {
            await this.prisma.activityLog.create({
              data: {
                entityType: 'TASK',
                action: 'ADD_DESCRIPTION',
                taskId: id,
                authorId: updatedTask.authorId,
                newValue: updatedTask.description,
              },
            });
            break;
          }
          await this.prisma.activityLog.create({
            data: {
              entityType: 'TASK',
              action: 'CHANGE_DESCRIPTION',
              taskId: id,
              authorId: updatedTask.authorId,
              prevValue: prevTask.description,
              newValue: updatedTask.description,
            },
          });
          break;

        case 'status':
          if (prevTask.status === value) break;
          await this.prisma.activityLog.create({
            data: {
              entityType: 'TASK',
              action: 'CHANGE_STATUS',
              taskId: id,
              authorId: updatedTask.authorId,
              prevValue: prevTask.status,
              newValue: updatedTask.status,
            },
          });
          break;

        case 'priority':
          if (prevTask.priority === value) break;
          await this.prisma.activityLog.create({
            data: {
              entityType: 'TASK',
              action: 'CHANGE_PRIORITY',
              taskId: id,
              authorId: updatedTask.authorId,
              prevValue: prevTask.priority,
              newValue: updatedTask.priority,
            },
          });
          break;

        case 'dueDate':
          if (prevTask.dueDate === value) break;
          if (prevTask.dueDate === null) {
            await this.prisma.activityLog.create({
              data: {
                entityType: 'TASK',
                action: 'ADD_DUE_DATE',
                taskId: id,
                authorId: updatedTask.authorId,
                newValue: updatedTask.dueDate?.toISOString(),
              },
            });
            break;
          }
          await this.prisma.activityLog.create({
            data: {
              entityType: 'TASK',
              action: 'CHANGE_DUE_DATE',
              taskId: id,
              authorId: updatedTask.authorId,
              prevValue: prevTask.dueDate.toISOString(),
              newValue: updatedTask.dueDate?.toISOString(),
            },
          });
          break;
      }
    }

    const task = await this.prisma.task.findUniqueOrThrow({
      where: { id },
      include: {
        activityLog: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    this.logger.log('Updating task');
    console.log({ task });

    return task;
  }

  remove(id: string) {
    const task = this.prisma.task.delete({
      where: { id },
    });

    return task;
  }
}
