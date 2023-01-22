import { Router } from 'express';
import { joiValidate } from '../middleware/validate';
import { validateTodo } from '../models/todoModel';

import {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../controller/todoController';
import { clearCache } from '../middleware/clearCache';

const router = Router();

router
  .route('/')
  .get(getAllTodos)
  .post(joiValidate(validateTodo), createTodo, clearCache);
router.route('/:id').get(getTodoById).patch(updateTodo).delete(deleteTodo);

export default router;
