import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const isUser = await User.isUserExistsByCustomId(payload.id);

  // Check user exist or no!
  if (!isUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found');
  }

  // check user is deleted or not!
  if (isUser.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is already deleted');
  }

  // check user is blocked or not!
  if (isUser.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
  }

  if (!(await User.isUserPasswordMatch(payload.password, isUser.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This password not match!');
  }

  // Create token use jwt and sent to the client

  const jwtPayload = {
    id: isUser.id,
    role: isUser.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.NODE_ENV as string, {
    expiresIn: '10d',
  });
  return {
    accessToken,
    needsPasswordChange: isUser?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
