import config from '../../config';
import { TStudent } from '../students/student.interface';
import { NewUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const user: NewUser = {};

  // if user use default password
  user.password = password || (config.defaultPassword as string);

  user.role = 'student';

  user.id = '2030100001';

  // create a new user
  const result = await User.create(user);

  // create a student
  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};

export const UserService = {
  createStudentIntoDB,
};
