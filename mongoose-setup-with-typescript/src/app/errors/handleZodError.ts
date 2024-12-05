import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error.interface';

const handleZodError = (error: ZodError) => {
  const errorSource: TErrorSources = error.issues.map((issue: ZodIssue) => {
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
