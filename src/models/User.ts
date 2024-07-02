import { Sequelize, UniqueConstraintError } from 'sequelize';
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AfterSync } from 'sequelize-typescript';

interface CreateUserInput {
  userName: string;
  userId: string;
  userPw: string;
  userDept: string;
  userRank: string;
  userAuth: number;
  userPhone: string;
}

@Table({
  timestamps: true,
  tableName: 'user_tb',
  comment: '사용자 정보 테이블입니다',
  indexes: [
    {
      fields: ['user_id'],
      unique: true,
      name: 'unique_user_id'
    },
    {
      fields: ['user_dept', 'user_rank'],
      name: 'dept_rank_index'
    }
  ]
})
export class User extends Model<User, CreateUserInput> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'user_idx',
    comment: '기본키'
  })
  userIdx!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'user_name',
    comment: '✨ 사용자 이름',
    defaultValue: '이름'
  })
  userName!: string;
  
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'user_id',
    comment: '✨ 로그인 시 사용할 ID'
  })
  userId!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    field: 'user_pw',
    comment: '✨ 로그인 시 사용할 PW'
  })
  userPw!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: 'user_dept',
    comment: '✨ 부서 정보 ( Nullable )',
    defaultValue: '부서'
  })
  userDept!: string;
  
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: 'user_rank',
    comment: '✨ 직급 정보 ( Nullable )',
    defaultValue: '직급'
  })
  userRank!: string;
  
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    field: 'user_auth',
    comment: '✨ 0: 개발자 / 1: 관리자 / 2: 사용자 / 3: 협력사 / 4: 가입 대기',
    defaultValue: 4
  })
  userAuth!: number;
  
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    field: 'user_phone',
    comment: '✨ 연락처',
    defaultValue: '010-0000-0000'
  })
  userPhone!: string;
  
  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'last_login',
    comment: '✨ 마지막 접속 일자',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  })
  lastLogin!: Date;
  
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    field: 'delFlag',
    comment: '✨ 0: 활성 / 1: 삭제된 사용자',
    defaultValue: 0
  })
  delFlag!: number;

  @AfterSync
  static async insertDefaultUser() {
    try {
      await User.findOrCreate({
        where: { userId: 'admin' },
        defaults: {
          userName: '개발자',
          userId: 'admin',
          userPw: 'admin1234',
          userDept: 'SW',
          userRank: '대리',
          userAuth: 0,
          userPhone: '010-4790-0520'
        }
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        console.log('Admin User가 이미 존재합니다. 기존 데이터를 유지합니다.');
      } else {
        throw error;
      }
    }
  }
}
