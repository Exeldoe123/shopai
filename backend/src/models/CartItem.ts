import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class CartItem extends Model {
  public id!: string;
  public cartId!: string;
  public productId!: string;
  public quantity!: number;
}

CartItem.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cartId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
}, {
  sequelize,
  modelName: 'CartItem',
});

export default CartItem;
