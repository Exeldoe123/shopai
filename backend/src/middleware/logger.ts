import { Request, Response, NextFunction } from 'express';
import ActivityLog from '../models/ActivityLog';

export const activityLogger = async (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;
  res.send = function (body) {
    if (res.statusCode >= 200 && res.statusCode < 300 && ['POST', 'PUT', 'DELETE'].includes(req.method)) {
      const user = (req as any).user;
      ActivityLog.create({
        userId: user ? user.id : null,
        action: `${req.method} ${req.originalUrl}`,
        ip: req.ip || req.connection.remoteAddress || '',
        userAgent: req.get('User-Agent') || '',
        details: JSON.stringify(req.body)
      }).catch(err => console.error('Error logging activity', err));
    }
    return originalSend.call(this, body);
  };
  next();
};
