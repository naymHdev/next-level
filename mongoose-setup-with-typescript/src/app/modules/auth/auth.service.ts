import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // Check user exist or no!
  const isUserExists = await User.findOne({ id: payload?.id });

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found');
  }

  // check user is deleted or not!
  if (isUserExists?.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is already deleted');
  }
  // check user is blocked or not!
  if (isUserExists?.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
  }

  // Checking if password is matching?

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );

  
};

export const AuthServices = {
  loginUser,
};
