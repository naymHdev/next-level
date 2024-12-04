import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/appError';
import { AcademicSemester as AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { StudentModel } from '../students/studentSchema';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};

  userData.password = password || (config.defaultPassword as string);

  userData.role = 'student';

  // Find Academic Semester Info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (admissionSemester) {
    userData.id = await generateStudentId(admissionSemester);
  } else {
    throw new AppError(StatusCodes.NOT_FOUND, 'admissionSemester is null');
  }

  // create a new user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; //  Reference _id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
