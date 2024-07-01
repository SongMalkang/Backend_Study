import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

interface CreateUserInput {
  name: string;
  email: string;
}

@Table({
  timestamps: true,
  tableName: 'users'
})
export class User extends Model<User, CreateUserInput> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;
}
