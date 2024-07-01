// UserRoutes.ts
import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController.ts';

const router = Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:userIdx', getUserById);
router.patch('/users/:userIdx', updateUser);
router.delete('/users/:userIdx', deleteUser);

export default router;
