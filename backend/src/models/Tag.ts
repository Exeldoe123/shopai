import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Tag extends Model {
  public id!: string;
  public name!: string;
}

Tag.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
  sequelize,
  modelName: 'Tag',
  timestamps: false,
});

export default Tag;
