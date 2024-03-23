import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityLogService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    const activityLog = this.prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        task: true,
        list: true,
      },
    });

    return activityLog;
  }
}
