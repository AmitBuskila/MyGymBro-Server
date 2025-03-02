import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }
  try {
    jwt.verify(token, config.jwtSecret) as JwtPayload;
    next();
  } catch (error) {
    return res.status(403).send('Invalid or expired token');
  }
};
export default authenticateToken;
