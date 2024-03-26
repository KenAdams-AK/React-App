import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const { statusCode } = res;

    this.logger.log(`Logging HTTP request ${method} ${url} ${statusCode}`);
    next();
  }
}
