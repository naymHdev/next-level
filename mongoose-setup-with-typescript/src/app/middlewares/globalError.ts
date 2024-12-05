/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error.interface';
import config from '../config';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Setting up default values
  let statusCode: number = error.statusCode || 500;
  let message: string = error.message || 'Something went wrong';

  let errorSource: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  }

  // Ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV === 'development' && error.stack,
  });
};

export default globalErrorHandler;
