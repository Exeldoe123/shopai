import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import { validateEmail, validatePassword } from '../utils/validators';
import { createCaptcha, verifyCaptcha } from '../utils/captcha';

/**
 * @swagger
 * /auth/captcha:
 *   get:
 *     summary: Get a CAPTCHA challenge (id + question) for the login form
 *     tags: [Auth]
 *     responses:
 *       200: { description: Captcha challenge }
 */
export const getCaptcha = async (_req: Request, res: Response) => {
  res.json(createCaptcha());
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email)) throw { status: 400, message: 'Invalid email' };
    if (!validatePassword(password)) throw { status: 400, message: 'Weak password' };
    const tokens = await AuthService.register(req.body);
    res.status(201).json(tokens);
  } catch (err) { next(err); }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, captchaId, captchaAnswer } = req.body;
    if (!verifyCaptcha(captchaId, captchaAnswer)) {
      throw { status: 400, message: 'CAPTCHA invalide ou expiré' };
    }
    const tokens = await AuthService.login(email, password);
    res.json(tokens);
  } catch (err) { next(err); }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ user: (req as any).user });
};
