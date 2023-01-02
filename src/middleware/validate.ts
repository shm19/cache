import { Request, Response, NextFunction } from 'express';

export const joiValidate =
  (validator: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
