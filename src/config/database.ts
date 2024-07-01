import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User.ts';

const sequelize = new Sequelize({
  host: 'test5.hancomum.com',
  database: 'hubsys_dev',
  port: 23306,
  dialect: 'mysql',
  username: 'root',
  password: 'ubimicro',
  models: [User],
});

export { sequelize };