import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Payment extends Model {
  public id!: string;
  public orderId!: string;
  public method!: string;
  public status!: string;
  public transactionId!: string;
}

Payment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Payment',
});

export default Payment;
