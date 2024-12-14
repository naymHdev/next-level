import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/appError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/users/user.interface';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not a verified author',
      );
    }

    // verify invalid jwt token
    jwt.verify(
      token,
      config.jwt_access_secret_token as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not author');
        }

        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            `You are a UNAUTHORIZED`,
          );
        }
        // decoded undefined
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};
