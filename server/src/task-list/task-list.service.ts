import { Injectable, Logger } from '@nestjs/common';

import { CreateTaskListDto } from './dto/create-task-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskListDto } from './dto/update-task-list.dto';

@Injectable()
export class TaskListService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(TaskListService.name);

  async create(createTaskListDto: CreateTaskListDto) {
    // TODO: Implement ordering
    const list = await this.prisma.list.create({
      data: createTaskListDto,
    });
    const activityLog = await this.prisma.activityLog.create({
      data: {
        entityType: 'LIST',
        action: 'CREATE',
        listId: list.id,
        authorId: list.authorId,
      },
    });
    this.logger.log('Creating new taskList');
    console.log({ list, activityLog });

    return list;
  }

  findAll() {
    const lists = this.prisma.list.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        tasks: {
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
          // select: {
          //   id: true,
          //   title: true,
          //   description: true,
          //   priority: true,
          //   dueDate: true,
          //   order: true,
          //   createdAt: true,
          //   updatedAt: true,
          // },
        },
      },
    });

    return lists;
  }

  async update(id: string, updateTaskListDto: UpdateTaskListDto) {
    const list = await this.prisma.list.findUniqueOrThrow({
      where: { id },
    });
    const updatedList = await this.prisma.list.update({
      where: { id },
      data: updateTaskListDto,
    });
    const activityLog = await this.prisma.activityLog.create({
      data: {
        entityType: 'LIST',
        action: 'RENAME',
        prevValue: list.title,
        newValue: updatedList.title,
        listId: updatedList.id,
        authorId: updatedList.authorId,
      },
    });
    this.logger.log('Updating taskList');
    console.log({ updatedList, activityLog });

    return updatedList;
  }

  async remove(id: string) {
    const list = await this.prisma.list.delete({
      where: { id },
    });
    const activityLog = await this.prisma.activityLog.create({
      data: {
        entityType: 'LIST',
        action: 'DELETE',
        listId: id,
        authorId: list.authorId,
      },
    });
    this.logger.log('Deleting taskList');
    console.log({ list, activityLog });

    return list;
  }
}
