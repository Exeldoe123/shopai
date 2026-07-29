import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class ProductTag extends Model {
  public productId!: string;
  public tagId!: string;
}

ProductTag.init({
  productId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  tagId: {
    type: DataTypes.UUID,
    primaryKey: true,
  }
}, {
  sequelize,
  modelName: 'ProductTag',
  timestamps: false,
});

export default ProductTag;
