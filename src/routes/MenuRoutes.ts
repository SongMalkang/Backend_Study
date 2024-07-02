// MenuRoutes.ts
import { Router } from 'express';
import { getMenuByAuth } from '../controllers/MenuController.ts';

const router = Router();

router.get('/menu', getMenuByAuth);

export default router;
