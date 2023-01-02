import { Router } from 'express';

import {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../controller/todoController';

const router = Router();

router.route('/').get(getAllTodos).post(createTodo);
router.route('/:id').get(getTodoById).patch(updateTodo).delete(deleteTodo);

export default router;
