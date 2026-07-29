import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Address extends Model {
  public id!: string;
  public userId!: string;
  public street!: string;
  public city!: string;
  public postalCode!: string;
  public country!: string;
}

Address.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Address',
});

export default Address;
