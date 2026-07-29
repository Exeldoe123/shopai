import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

export class User extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: 'client' | 'admin';
  public isActive!: boolean;
  public loginAttempts!: number;
  public lockedUntil!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public async incrementLoginAttempts(): Promise<void> {
    this.loginAttempts += 1;
    if (this.loginAttempts >= 5) {
      this.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // lock for 15 mins
    }
    await this.save();
  }

  public async resetLoginAttempts(): Promise<void> {
    this.loginAttempts = 0;
    this.lockedUntil = null;
    await this.save();
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('client', 'admin'),
    defaultValue: 'client'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  loginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lockedUntil: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'User',
  hooks: {
    beforeCreate: async (user: User) => {
      const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
      user.password = await bcrypt.hash(user.password, rounds);
    },
    beforeUpdate: async (user: User) => {
      if (user.changed('password')) {
        const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
        user.password = await bcrypt.hash(user.password, rounds);
      }
    }
  }
});

export default User;
