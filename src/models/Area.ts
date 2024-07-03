import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

interface CreateAreaInput {
  areaType: string;
  areaName: string;
  areaLpos?: string;
  areaMpos?: string;
  areaSpos?: string;
  delFlag: number;
}

@Table({
  timestamps: true,
  tableName: 'area_tb',
  comment: '지역 정보 테이블입니다',
  indexes: [
    {
      fields: ['area_idx'],
      name: 'area_idx'
    }
  ]
})
export class Area extends Model<Area, CreateAreaInput> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
    field: 'area_idx',
    comment: '기본키'
  })
  areaIdx!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'area_type',
    comment: '✨ [ 화학 / 조선소 / 공장 ]',
    defaultValue: '화학'
  })
  areaType!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'area_name',
    comment: '✨ 지역 대명사 - [ 테스트 위치 01 ... ]',
    defaultValue: '위치 이름'
  })
  areaName!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    field: 'area_lpos',
    comment: '✨ 대분류 위치 - [ 설비 구획, N-6구역, No.1 Dock ]',
    defaultValue: null
  })
  areaLpos?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    field: 'area_mpos',
    comment: '✨ 중분류 위치 - [ 설비 이름, T-150B Tank, H8144 ]',
    defaultValue: null
  })
  areaMpos?: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
    field: 'area_spos',
    comment: '✨ 자세한 위치 - [ 하부01, WBT-301 현측 복도 ]',
    defaultValue: null
  })
  areaSpos?: string;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false,
    field: 'del_flag',
    comment: '✨ [ 0 : 사용 가능 / 1 : 소프트 삭제 ]',
    defaultValue: 0
  })
  delFlag!: number;
}

export default Area;
