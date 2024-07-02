// MenuController.ts
import { Request, Response } from 'express';
import { menuService } from '../services/MenuService.ts';
import { handleError } from '../utils/errorHandler.ts';

export const getMenuByAuth = async (req: Request, res: Response): Promise<Response> => {
  const authLevel = parseInt(req.params.authLevel, 10);
  
  if (isNaN(authLevel)) {
    return res.status(400).json({ error: '권한 레벨이 제공되어야 합니다.' });
  }

  try {
    const menuList = await menuService.getMenuByAuth(authLevel);
    return res.status(200).json(menuList);
  } catch (error) {
    handleError(res, error);
    return res.status(500).json({ error: 'Auth 리스트 반환 실패' });
  }
};