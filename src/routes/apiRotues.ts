import { Request, Router, Response } from 'express';
import todoRouter from './todoRoutes';

const router = Router();

router.use('/todos', todoRouter);

router.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    message: `can't find route ${req.url}`,
  });
});

export default router;
