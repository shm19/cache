import { Router } from 'express';
import { joiValidate } from '../middleware/validate';
import { validateUser } from '../models';

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../controller/userController';

const router = Router();

router.route('/').get(getAllUsers).post(joiValidate(validateUser), createUser);
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
