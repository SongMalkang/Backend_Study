import { User } from '../models/User.ts';

interface CreateUserInput {
  userName: string;
  userId: string;
  userPw: string;
  userDept: string;
  userRank: string;
  userAuth: number;
  userPhone: string;
}

interface UpdateUserInput {
  userName: string;
  userId: string;
  userPw: string;
  userDept: string;
  userRank: string;
  userAuth: number;
  userPhone: string;
}

class UserService {
  async createUser(input: CreateUserInput): Promise<User> {
    return await User.create(input);
  }

  async login(userId: string, userPw: string): Promise<User | null> {
    const user = await User.findOne({
      where: { userId }
    });

    if (user && user.dataValues.userPw === userPw) {
      return user.dataValues;
    }

    return null;
  }

  async getUsers(): Promise<User[]> {
    return await User.findAll();
  }

  async getUserById(userIdx: number): Promise<User | null> {
    return await User.findByPk(userIdx);
  }

  async updateUser(userIdx: number, input: UpdateUserInput): Promise<[number, User[]]> {
    return await User.update(input, {
      where: { userIdx },
      returning: true,
    });
  }

  async deleteUser(userIdx: number): Promise<number> {
    return await User.destroy({
      where: { userIdx }
    });
  }
}

export const userService = new UserService();
