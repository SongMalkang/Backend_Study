import { Sequelize, UniqueConstraintError } from 'sequelize';
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AfterSync } from 'sequelize-typescript';

interface CreateCriterionInput {
  criterionColumn: string;
  criterionType: string;
  criterionName: string;
  criterionChemical: string;
  criterionUtm: string | null;
  flagLow: number;
  flagHigh: number;
  lowDanger: number | null;
  lowWarning: number | null;
  highWarning: number | null;
  highDanger: number | null;
  enabledFlag: number;
}

@Table({
  timestamps: true,
  tableName: 'criterion_tb',
  comment: '기준 정보 테이블입니다',
  indexes: [
    {
      fields: ['criterion_column', 'enabled_flag'],
      unique: true,
      name: 'unique_criterion_column'
    }
  ]
})
export class Criterion extends Model<Criterion, CreateCriterionInput> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
    field: 'criterion_idx',
    comment: '기본키'
  })
  criterionIdx!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'criterion_column',
    comment: '✨ Target log_tb column 이름',
    defaultValue: 'A*'
  })
  criterionColumn!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'criterion_type',
    comment: '✨ Gas / Ph / Rotate / Contact / 420ma / Depth / Level / Conductivity / ...',
    defaultValue: 'Gas'
  })
  criterionType!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'criterion_name',
    comment: '✨ 화면에 표기될 이름 (한글 or 영문)',
    defaultValue: '한글이름'
  })
  criterionName!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'criterion_chemical',
    comment: '✨ 화학식 or 영문명 (필요시 입력)',
    defaultValue: '화학식or영문명'
  })
  criterionChemical!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: 'criterion_utm',
    comment: '✨ 단위 ( % / ppm / v / A / NULL )',
    defaultValue: 'ppm'
  })
  criterionUtm?: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    field: 'flag_low',
    defaultValue: 0
  })
  flagLow!: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    field: 'flag_high',
    defaultValue: 1
  })
  flagHigh!: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    field: 'low_danger',
    defaultValue: null
  })
  lowDanger?: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    field: 'low_warning',
    defaultValue: null
  })
  lowWarning?: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    field: 'high_warning',
    defaultValue: null
  })
  highWarning?: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    field: 'high_danger',
    defaultValue: null
  })
  highDanger?: number;

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false,
    field: 'enabled_flag',
    defaultValue: 1
  })
  enabledFlag!: number;

  @AfterSync
  static async insertDefaultCriteria() {
    const defaultCriteria: CreateCriterionInput[] = [
      { criterionColumn: 'A1', criterionType: 'Gas', criterionName: '산소', criterionChemical: 'O2', criterionUtm: '%', flagLow: 1, flagHigh: 1, lowDanger: 18, lowWarning: 19.5, highWarning: 23, highDanger: 23.5, enabledFlag: 1 },
      { criterionColumn: 'A2', criterionType: 'Gas', criterionName: '이산화탄소', criterionChemical: 'CO2', criterionUtm: 'ppm', flagLow: 0, flagHigh: 1, lowDanger: null, lowWarning: null, highWarning: 5000, highDanger: 8000, enabledFlag: 1 },
      { criterionColumn: 'A3', criterionType: 'Gas', criterionName: '일산화탄소', criterionChemical: 'CO', criterionUtm: 'ppm', flagLow: 0, flagHigh: 1, lowDanger: null, lowWarning: null, highWarning: 8, highDanger: 10, enabledFlag: 1 },
      { criterionColumn: 'A4', criterionType: 'Gas', criterionName: '황화수소', criterionChemical: 'H2S', criterionUtm: 'ppm', flagLow: 0, flagHigh: 1, lowDanger: null, lowWarning: null, highWarning: 8, highDanger: 10, enabledFlag: 1 },
      { criterionColumn: 'A5', criterionType: 'Gas', criterionName: '폭발성가스', criterionChemical: 'CH4', criterionUtm: 'ppm', flagLow: 0, flagHigh: 1, lowDanger: null, lowWarning: null, highWarning: 8, highDanger: 10, enabledFlag: 1 },
      { criterionColumn: 'A6', criterionType: 'Gas', criterionName: '탄화수소', criterionChemical: 'HC', criterionUtm: 'ppm', flagLow: 0, flagHigh: 1, lowDanger: null, lowWarning: null, highWarning: 8, highDanger: 10, enabledFlag: 0 },
      { criterionColumn: 'A7', criterionType: 'Gas', criterionName: '수소', criterionChemical: 'H2', criterionUtm: '%', flagLow: 0, flagHigh: 1, lowDanger: null, lowWarning: null, highWarning: 8, highDanger: 10, enabledFlag: 0 },
      { criterionColumn: 'A8', criterionType: 'Gas', criterionName: '메탄올', criterionChemical: 'CH3OH', criterionUtm: '%', flagLow: 0, flagHigh: 1, lowDanger: null, lowWarning: null, highWarning: 8, highDanger: 10, enabledFlag: 0 },
      { criterionColumn: 'A9', criterionType: 'Gas', criterionName: '암모니아', criterionChemical: 'NH3', criterionUtm: '%', flagLow: 0, flagHigh: 1, lowDanger: null, lowWarning: null, highWarning: 8, highDanger: 10, enabledFlag: 0 },
      { criterionColumn: 'A*', criterionType: 'Gas', criterionName: '염소', criterionChemical: 'CI2', criterionUtm: '%', flagLow: 0, flagHigh: 1, lowDanger: null, lowWarning: null, highWarning: 8, highDanger: 10, enabledFlag: 0 }
    ];

    try {
      for (const criterion of defaultCriteria) {
        await Criterion.findOrCreate({
          where: { criterionColumn: criterion.criterionColumn },
          defaults: criterion
        });
      }
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        console.log('이미 등록된 관리기준이 있습니다. 기존 데이터를 유지합니다.');
      } else {
        throw error;
      }
    }
  }
}

export default Criterion;
