import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

interface CreateUserInput {
  userName: string;
  userEmail: string;
}

@Table({
  timestamps: true,
  tableName: 'user_tb'
})
export class User extends Model<User, CreateUserInput> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'user_idx'
  })
  userIdx!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'user_name'
  })
  userName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'user_email'
  })
  userEmail!: string;
}
