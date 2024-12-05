import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error.interface';

const handleZodError = (error: ZodError) => {
  const errorSource: TErrorSource = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod validation error',
    errorSource,
  };
};

export default handleZodError;
