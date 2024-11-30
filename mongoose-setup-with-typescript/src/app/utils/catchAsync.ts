import { NextFunction, Request, RequestHandler, Response } from 'express';

// Maintain async requests using higher order function
export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};
