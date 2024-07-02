// MenuService.ts
import { Menu } from '../models/Menu.ts';
import { Op } from 'sequelize'

class MenuService {
  async getMenuByAuth(authLevel: number): Promise<Menu[]> {
    return await Menu.findAll({
      where: { authLevel: { [Op.gte]: authLevel } },
    });
  }
}

export const menuService = new MenuService();