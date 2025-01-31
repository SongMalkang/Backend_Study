// UserController.ts
import { Request, Response } from 'express';
import { userService } from '../services/UserService.ts';
import { handleError } from '../utils/errorHandler.ts';

export const createUser = async (req: Request, res: Response) => {
  const { userName, userId, userPw, userDept, userRank, userAuth, userPhone } = req.body;

  try {
    const user = await userService.createUser({ userName, userId, userPw, userDept, userRank, userAuth, userPhone });
    res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error);
  }
};

export const tryLogin = async (req: Request, res: Response) => {
  const { userId, userPw } = req.query;
  try {
    const user = await userService.login(userId as string, userPw as string);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: '아이디나 비밀번호를 확인해주세요' });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userIdx } = req.params;
  try {
    const user = await userService.getUserById(Number(userIdx));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userIdx } = req.params;
  const updateData = req.body;
  try {
    const [affectedRows, updatedUsers] = await userService.updateUser(Number(userIdx), updateData);
    if (affectedRows > 0) {
      res.status(200).json(updatedUsers[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userIdx } = req.params;
  try {
    const deletedRows = await userService.deleteUser(Number(userIdx));
    if (deletedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
};
