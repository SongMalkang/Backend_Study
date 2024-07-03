// UserRoutes.ts
import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController.ts';

const router = Router();

router.get('/list', getUsers);
router.get('/find/:userIdx', getUserById);
router.post('/create', createUser);
router.patch('/update/:userIdx', updateUser);
router.delete('/delete/:userIdx', deleteUser);

export default router;
