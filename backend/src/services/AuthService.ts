import User from '../models/User';
import jwt from 'jsonwebtoken';

export class AuthService {
  async register(data: any) {
    const { email, password, firstName, lastName } = data;
    const existing = await User.findOne({ where: { email } });
    if (existing) throw { status: 400, message: 'Email already exists' };
    
    const user = await User.create({ email, password, firstName, lastName });
    return this.generateTokens(user);
  }

  async login(email: string, pass: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw { status: 401, message: 'Invalid credentials' };

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw { status: 403, message: 'Account locked. Try again later.' };
    }

    const isValid = await user.comparePassword(pass);
    if (!isValid) {
      await user.incrementLoginAttempts();
      throw { status: 401, message: 'Invalid credentials' };
    }

    await user.resetLoginAttempts();
    return this.generateTokens(user);
  }

  generateTokens(user: User) {
    const payload = { id: user.id, role: user.role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as any });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'refresh', { expiresIn: '7d' as any });
    return { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role } };
  }
}

export default new AuthService();
