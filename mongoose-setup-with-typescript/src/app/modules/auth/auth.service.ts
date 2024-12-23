import { StatusCodes } from 'http-status-codes';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import AppError from '../../errors/AppError';
import { sendEmail } from '../../utils/sendEmail';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);

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

  if (!(await User.isUserPasswordMatch(payload.password, user.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This password not match!');
  }

  // Create token use jwt and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret_token as string,
    config.jwt_access_expire_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret_token as string,
    config.jwt_refresh_expire_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

// -------- Change Password method -------//

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isUserPasswordMatch(payload.oldPassword, user?.password)))
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // verify invalid jwt token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret_token as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

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
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, `You are not a UNAUTHORIZED`);
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret_token as string,
    config.jwt_access_expire_in as string,
  );

  return {
    accessToken,
  };
};

const forgatPasswordFromDB = async (userId: string) => {
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

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret_token as string,
    '1000m',
  );

  const resetUiLink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;

  await sendEmail(user.email, resetUiLink);
};

const resetPasswordFromUser = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExistsByCustomId(payload?.id);

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
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgatPasswordFromDB,
  resetPasswordFromUser,
};
