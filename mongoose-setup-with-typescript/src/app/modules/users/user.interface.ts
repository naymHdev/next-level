/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: 'super-admin'|'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface NewUser {
  id: string;
  password: string;
  role: string;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByCustomId(id: string): Promise<IUser>;
  isUserPasswordMatch(plainTextPass: string, hasPass: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
