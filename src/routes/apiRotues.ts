import { Request, Router, Response } from 'express';
import todoRouter from './todoRoutes';
import userRouter from './userRotues';

const router = Router();

router.use('/todos', todoRouter);
router.use('/users', userRouter);

router.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    message: `can't find route ${req.url}`,
  });
});

export default router;
