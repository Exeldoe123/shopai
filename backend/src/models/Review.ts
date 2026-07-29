import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Review extends Model {
  public id!: string;
  public userId!: string;
  public productId!: string;
  public rating!: number;
  public comment!: string;
}

Review.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Review',
});

export default Review;
