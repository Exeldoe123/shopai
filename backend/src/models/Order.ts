import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Order extends Model {
  public id!: string;
  public userId!: string;
  public status!: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  public totalAmount!: number;
  public addressId!: string;
}

Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  addressId: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Order',
});

export default Order;
