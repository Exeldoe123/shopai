import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Cart extends Model {
  public id!: string;
  public userId!: string;
}

Cart.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Cart',
});

export default Cart;
