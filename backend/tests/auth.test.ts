import AuthService from '../src/services/AuthService';
import User from '../src/models/User';
import jwt from 'jsonwebtoken';

jest.mock('../src/models/User');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'testsecret';
    process.env.JWT_EXPIRES_IN = '1h';
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      const mockUser = { id: '1', role: 'client', email: 'test@test.com' };
      (User.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await AuthService.register({
        email: 'test@test.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe'
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe('test@test.com');
    });

    it('should throw an error if email already exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ id: '1' });
      
      await expect(AuthService.register({
        email: 'test@test.com',
        password: 'Password123!'
      })).rejects.toEqual({ status: 400, message: 'Email already exists' });
    });
  });

  describe('login', () => {
    it('should login successfully and return tokens', async () => {
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        role: 'client',
        lockedUntil: null,
        comparePassword: jest.fn().mockResolvedValue(true),
        resetLoginAttempts: jest.fn().mockResolvedValue(true)
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await AuthService.login('test@test.com', 'Password123!');

      expect(mockUser.comparePassword).toHaveBeenCalledWith('Password123!');
      expect(mockUser.resetLoginAttempts).toHaveBeenCalled();
      expect(result).toHaveProperty('accessToken');
    });

    it('should throw error on invalid password', async () => {
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        lockedUntil: null,
        comparePassword: jest.fn().mockResolvedValue(false),
        incrementLoginAttempts: jest.fn().mockResolvedValue(true)
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      await expect(AuthService.login('test@test.com', 'WrongPass!'))
        .rejects.toEqual({ status: 401, message: 'Invalid credentials' });
      expect(mockUser.incrementLoginAttempts).toHaveBeenCalled();
    });

    it('should throw error if account is locked', async () => {
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        lockedUntil: new Date(Date.now() + 10000)
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      await expect(AuthService.login('test@test.com', 'Pass!'))
        .rejects.toEqual({ status: 403, message: 'Account locked. Try again later.' });
    });
  });
});
