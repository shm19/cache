import { NextFunction, Request, Response } from 'express';
import pino from 'pino';

const logger = pino({
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
      {
        level: 'error',
        target: 'pino/file',
        options: {
          destination: './logs/error.log',
        },
      },
    ],
  },
});

export default (req: Request, res: Response, next: NextFunction): void => {
  req.logger = logger;
  next();
};
