// UserRoutes.ts
import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, tryLogin } from '../controllers/UserController.ts';

const router = Router();

router.get('/list', getUsers);
router.get('/find/:userIdx', getUserById);
router.get('/login', tryLogin);
router.post('/create', createUser);
router.patch('/update/:userIdx', updateUser);
router.delete('/delete/:userIdx', deleteUser);

export default router;
