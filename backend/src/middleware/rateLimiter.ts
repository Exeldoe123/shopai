import rateLimit from 'express-rate-limit';

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW || '15') * 60 * 1000;

export const generalLimiter = rateLimit({
  windowMs,
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  message: 'Too many requests, please try again later.'
});

export const authLimiter = rateLimit({
  windowMs,
  max: 5,
  message: 'Too many login attempts, please try again later.'
});

export const apiLimiter = rateLimit({
  windowMs,
  max: 200,
  message: 'Too many API requests, please try again later.'
});
