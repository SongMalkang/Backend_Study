import { Sequelize } from 'sequelize-typescript';

import User from '../models/User.ts';
import Menu from '../models/Menu.ts';
import Criterion from '../models/Criterion.ts';
import Area from '../models/Area.ts';
import Log from '../models/Log.ts';
import Module from '../models/Module.ts';
import Setting from '../models/Setting.ts';

const sequelize = new Sequelize({
  host: 'test5.hancomum.com',
  database: 'hubsys_dev',
  port: 23306,
  dialect: 'mysql',
  username: 'root',
  password: 'ubimicro',
  models: [Area, Criterion, Log, Menu, Module, Setting, User],
  timezone: '+09:00',
  dialectOptions: {
    timezone: 'Etc/GMT-9',
  },
});

export default sequelize;
