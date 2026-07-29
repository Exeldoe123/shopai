import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class ActivityLog extends Model {
  public id!: string;
  public userId!: string | null;
  public action!: string;
  public ip!: string;
  public userAgent!: string;
  public details!: string;
  public readonly createdAt!: Date;
}

ActivityLog.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'ActivityLog',
  updatedAt: false,
});

export default ActivityLog;
