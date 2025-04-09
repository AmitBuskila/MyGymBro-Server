import { NextFunction, Request, Response } from 'express';

export const asyncErrorHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log(err);
      res.status(err.status || 500).send(err);
    });
  };
