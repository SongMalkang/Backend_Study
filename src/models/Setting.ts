import { UniqueConstraintError } from 'sequelize';
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AfterSync } from 'sequelize-typescript';

interface CreateSettingInput {
  flagUse: number;
  settingName: string;
  settingValue: string;
  settingAlt: string | null;
  settingDescription?: string;
  flagShow: number;
}

@Table({
  timestamps: true,
  tableName: 'setting_tb',
  comment: '세팅 정보 테이블입니다',
  indexes: [
    {
      fields: ['setting_name'],
      unique: true,
      name: 'unique_setting_name'
    }
  ]
})
export class Setting extends Model<Setting, CreateSettingInput> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
    field: 'setting_idx',
    comment: '기본키'
  })
  settingIdx!: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    field: 'flag_use',
    defaultValue: 1
  })
  flagUse!: number;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
    field: 'setting_name',
    comment: '세팅명',
    defaultValue: '세팅명'
  })
  settingName!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'setting_value',
    comment: '값',
    defaultValue: '값'
  })
  settingValue!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    field: 'setting_alt',
    comment: '값',
    defaultValue: '값'
  })
  settingAlt?: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
    field: 'setting_description',
    comment: '값',
    defaultValue: '값'
  })
  settingDescription?: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    field: 'flag_show',
    defaultValue: 1
  })
  flagShow!: number;

  
  @AfterSync
  static async insertDefaultSetting() {
    const defaultSetting: CreateSettingInput[] = [
      { flagUse: 1, settingName: 'theme', settingValue: 'light', settingAlt: 'table', settingDescription: '현재 light + table 만 지원', flagShow: 0 },
      { flagUse: 1, settingName: 'noneTerm', settingValue: '180', settingAlt: null, settingDescription: '단위 : 초', flagShow: 1 },
      { flagUse: 1, settingName: 'alarmSound', settingValue: 'true', settingAlt: null, settingDescription: '값', flagShow: 1 },
      { flagUse: 0, settingName: 'alarmDelay', settingValue: '10', settingAlt: null, settingDescription: '탐색 로그 범위', flagShow: 0 },
      { flagUse: 1, settingName: 'titleName', settingValue: '통합 안전 모니터링 시스템', settingAlt: null, settingDescription: '값', flagShow: 1 }
    ];

    try {
      for (const setting of defaultSetting) {
        await Setting.findOrCreate({
          where: { settingName: setting.settingName },
          defaults: setting
        });
      }
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        console.log('이미 등록된 설정이 있습니다. 기존 데이터를 유지합니다.');
      } else {
        throw error;
      }
    }
  }
}

export default Setting;
