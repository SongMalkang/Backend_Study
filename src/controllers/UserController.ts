// UserController.ts
import { Request, Response } from 'express';
import { userService } from '../services/UserService.ts';

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await userService.createUser({ name, email });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
