import { NextFunction, Request, Response } from 'express';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export default (req: Request, res: Response, next: NextFunction): void => {
  req.logger = logger;
  next();
};
