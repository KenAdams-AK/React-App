import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(UserService.name);

  async findFirst() {
    const user = await this.prisma.user.findFirst();
    this.logger.log('Found user');
    console.log({ user });

    return user;
  }
}
