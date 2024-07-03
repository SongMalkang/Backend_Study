import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { Area } from './Area.ts'

interface CreateModuleInput {
  moduleType: string;
  moduleName: string;
  moduleDeui: string;
  moduleSerial?: string;
  moduleStatus: string;
  areaIdx: number;
  delFlag: number;
}

@Table({
  timestamps: true,
  tableName: 'module_tb',
  comment: '모듈 정보 테이블입니다',
  indexes: [
    {
      fields: ['module_type', 'module_deui', 'del_flag'],
      unique: true,
      name: 'unique_module_deui'
    },
    {
      fields: ['module_idx'],
      name: 'module_idx'
    },
    {
      fields: ['area_idx'],
      name: 'area_idx'
    }
  ]
})
export class Module extends Model<Module, CreateModuleInput> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
    field: 'module_idx',
    comment: 'PK'
  })
  moduleIdx!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'module_type',
    comment: '✨ [ Gas / Level / Depth / Ph / Conductivity / Temp / onoff / 420ma ... ]',
    defaultValue: 'Gas'
  })
  moduleType!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'module_name',
    comment: '✨ 화면에 표기될 장치 명',
    defaultValue: '장치1'
  })
  moduleName!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'module_deui',
    comment: '✨ 장치 통신 ID',
    defaultValue: '010000FFFF009999'
  })
  moduleDeui!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    field: 'module_serial',
    comment: '✨ 장치 Serial Number ( Snipe 기준 )',
    defaultValue: '1602PL-000999Exi'
  })
  moduleSerial?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'module_status',
    comment: '✨ [ 정상 / 점검 / 교정필요 / 미사용 ]',
    defaultValue: '정상'
  })
  moduleStatus!: string;

  @ForeignKey(() => Area)
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
    field: 'area_idx',
    comment: '✨ [ 외래키 적용 ]',
    defaultValue: 1
  })
  areaIdx!: number;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false,
    field: 'del_flag',
    comment: '✨ [ 0 : 사용 가능 / 1 : 소프트 삭제 ]',
    defaultValue: 0
  })
  delFlag!: number;
}

export default Module;
