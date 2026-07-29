import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Category extends Model {
  public id!: string;
  public name!: string;
  public slug!: string;
  public description!: string;
  public parentId!: string | null;
}

Category.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  parentId: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Category',
});

export default Category;
