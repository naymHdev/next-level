/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  errors?: unknown;
}

const appError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode: number = error.statusCode || 500;
  const message: string = error.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
    errors: error || {},
  });
};

export default appError;
