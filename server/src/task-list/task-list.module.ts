import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.service';

@Module({
  imports: [PrismaModule],
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
