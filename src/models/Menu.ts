import { Sequelize, UniqueConstraintError } from 'sequelize';
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

interface CreateMenuInput {
  menuName: string;
  menuText: string;
  menuAction: string;
  parentFlag: number;
  authLevel?: number;
  mainSort?: number;
  parentIdx?: number;
  subSort: number;
  menuEnabled: number;
}

// @Scopes(() => {return {
//   full: {
//     include: [Area, Auth],
//   },
// @BelongsTo(() => {return Auth}, 'auth_idx')
// auth?: Auth;
// @BelongsToMany(() => {return Area}, () => {return AreaUser}, 'user_idx', 'area_idx')
// areas?: Area[];
// }})
@Table({
  timestamps: true,
  tableName: 'menu_tb',
  comment: '메뉴 정보 테이블입니다',
  indexes: [
    {
      fields: ['menu_name', 'menu_enabled'],
      unique: true,
      name: 'unique_menu_name'
    },
    {
      fields: ['menu_enabled', 'menu_name', 'menu_action'],
      name: 'key_search_valid_menu'
    }
  ]
})
export class Menu extends Model<Menu, CreateMenuInput> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
    field: 'menu_idx',
    comment: '기본키'
  })
  menuIdx!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'menu_name',
    comment: '✨ (영문)소프트웨어가 참조할 메뉴명 [ ex) gasCriterion ]',
    defaultValue: 'Menu'
  })
  menuName!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'menu_text',
    comment: '✨ (한글)화면에 표시할 메뉴명 [ ex) 가스 관리기준 설정 ]',
    defaultValue: '미지정메뉴'
  })
  menuText!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'menu_action',
    comment: '✨ (영문)메뉴 라우팅을 위한 Action Text [ ex) gasCriterion / gasDetail / gasGraph ... ]',
    defaultValue: 'gas'
  })
  menuAction!: string;
  
  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false,
    field: 'auth_level',
    comment: '✨ 접근을 위한 최소 권한',
    defaultValue: 3
  })
  authLevel!: string;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false,
    field: 'parent_flag',
    comment: '✨ 하위 메뉴를 가지는지 여부 [ 0: 없음 / 1: 있음 ]',
    defaultValue: 1
  })
  parentFlag!: number;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: true,
    field: 'main_sort',
    comment: '✨ 부모 노드끼리의 순서 지정 [ Sort : ASC ]',
    defaultValue: 1
  })
  mainSort!: number;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: true,
    field: 'parent_idx',
    comment: '✨ 부모 노드의 IDX를 기입 [ ex) 2 ]',
    defaultValue: 1
  })
  parentIdx!: number;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false,
    field: 'sub_sort',
    comment: '✨ 하위 메뉴끼리의 순서 지정 [ Sort : ASC ]',
    defaultValue: 1
  })
  subSort!: number;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false,
    field: 'menu_enabled',
    comment: '✨ 랜더링 여부 [ 0: 숨김 / 1: 사용 ] - del flag와 동일',
    defaultValue: 1
  })
  menuEnabled!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'rgst_dt',
    comment: '- 메뉴 등록일 - 메뉴를 추가 작업한 일자',
    defaultValue: DataType.NOW
  })
  rgstDt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'update_dt',
    comment: '- 메뉴 수정일 - 사용자가 메뉴명을 수정한 경우 업데이트',
    defaultValue: DataType.NOW
  })
  updateDt!: Date;
}

export default Menu;