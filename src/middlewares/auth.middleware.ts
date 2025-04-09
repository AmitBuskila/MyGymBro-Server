import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) {
    res.status(401).send('Access denied. No token provided.');
  } else {
    try {
      jwt.verify(token, config.jwtSecret);
      next();
    } catch (error) {
      res.status(403).json('Invalid or expired token');
    }
  }
};
export default authenticateToken;
