import { User } from '../models/User.ts';

interface CreateUserInput {
  name: string;
  email: string;
}

class UserService {
  async createUser(input: CreateUserInput): Promise<User> {
    return await User.create(input);
  }

  async getUsers(): Promise<User[]> {
    return await User.findAll();
  }
}

export const userService = new UserService();
