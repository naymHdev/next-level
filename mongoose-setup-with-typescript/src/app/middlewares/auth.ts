import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/users/user.interface';
import { User } from '../modules/users/user.model';
import AppError from '../errors/AppError';

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
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret_token as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;


    // --------------------

    const user = await User.isUserExistsByCustomId(userId);

    // Check user exist or no!
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found');
    }

    // check user is deleted or not!
    if (user.isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is already deleted');
    }

    // check user is blocked or not!
    if (user.status === 'blocked') {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
    }

    if (
      user.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangeAt,
        iat as number,
      )
    ) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        `You are not a UNAUTHORIZED`,
      );
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, `You are a UNAUTHORIZED`);
    }
    // decoded undefined∏
    req.user = decoded as JwtPayload;
    next();
  });
};
