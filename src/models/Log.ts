import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { Module } from './Module.ts';

interface CreateLogInput {
  moduleIdx: number;
  receiveGateway?: string;
  A1: number | null;
  A2: number | null;
  A3: number | null;
  A4: number | null;
  A5: number | null;
  rssi: number | null;
  battery: string | null;
  relayFlag: number;
  statusCode: number;
  errorCode: number | null;
  devStat: number | null;
  alarmStat: number | null;
  fwVersion: string | null;
}

@Table({
  timestamps: true,
  tableName: 'log_tb',
  comment: '로그 정보 테이블입니다'
})
export class Log extends Model<Log, CreateLogInput> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
    field: 'log_idx',
    comment: '기본키'
  })
  logIdx!: number;

  @ForeignKey(() => Module)
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
    field: 'module_idx',
    defaultValue: 1
  })
  moduleIdx!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: 'receive_gateway',
    defaultValue: null
  })
  receiveGateway?: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    field: 'A1',
    defaultValue: null
  })
  A1?: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    field: 'A2',
    defaultValue: null
  })
  A2?: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    field: 'A3',
    defaultValue: null
  })
  A3?: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    field: 'A4',
    defaultValue: null
  })
  A4?: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    field: 'A5',
    defaultValue: null
  })
  A5?: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    field: 'rssi',
    defaultValue: null
  })
  rssi?: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: 'battery',
    defaultValue: null
  })
  battery?: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    field: 'relay_flag',
    defaultValue: 0
  })
  relayFlag!: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    field: 'status_code'
  })
  statusCode!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'error_code',
    defaultValue: null
  })
  errorCode?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'dev_stat',
    defaultValue: null
  })
  devStat?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'alarm_stat',
    defaultValue: null
  })
  alarmStat?: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: 'fw_version',
    defaultValue: null
  })
  fwVersion?: string;
}

export default Log;
