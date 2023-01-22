import { NextFunction, Request, Response } from 'express';
import { client } from '../services/cache';

export const clearCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await next();
  client.flushAll();
};
