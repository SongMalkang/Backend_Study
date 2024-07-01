// UserRoutes.ts
import { Router } from 'express';
import { createUser, getUsers } from '../controllers/UserController.ts';

const router = Router();

router.post('/users', createUser);
router.get('/users', getUsers);

export default router;
