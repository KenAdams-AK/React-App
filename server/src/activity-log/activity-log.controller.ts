import { Controller, Get } from '@nestjs/common';

import { ActivityLogResponse } from 'contracts';
import { ActivityLogService } from './activity-log.service';

@Controller('api/activity-log')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get()
  findAll(): Promise<ActivityLogResponse[]> {
    return this.activityLogService.findAll();
  }
}
