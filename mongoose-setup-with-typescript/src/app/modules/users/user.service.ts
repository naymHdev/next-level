import config from '../../config';
import { TStudent } from '../students/student.interface';
import { StudentModel } from '../students/studentSchema';
import { IUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};

  
  userData.password = password || (config.defaultPassword as string);

  userData.role = 'student';

  userData.id = '2030100001';

  // create a new user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; //  Reference _id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
