/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import { AcademicSemester as AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { StudentModel } from '../students/studentSchema';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/appError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};

  userData.password = password || (config.defaultPassword as string);

  userData.role = 'student';

  // Find Academic Semester Info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // create a isolated environment
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester);
    } else {
      throw new AppError(StatusCodes.NOT_FOUND, 'admissionSemester is null');
    }

    // create a new user [ Transaction -1 ]
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to create a new user',
      );
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //  Reference _id

    // create a new STUDENT [ Transaction -2 ]
    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to create a new student',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error);
  }
};

export const UserService = {
  createStudentIntoDB,
};
