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
    this.logger.log('Creating new taskList');
    console.log({ list });

    const activityLog = await this.prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entityType: 'LIST',
        entityId: list.id,
        entityTitle: list.title,
        authorId: list.authorId,
      },
    });

    return { ...list, activityLog };
  }

  findAll() {
    return this.prisma.list.findMany();
  }

  findOne(id: string) {
    this.logger.log(`Finding taskList with id: ${id}`);
    return this.prisma.list.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTaskListDto: UpdateTaskListDto) {
    return `This action updates a #${id} taskList`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskList`;
  }
}
