import { TStudent } from './student.interface';
import { StudentModel } from './studentSchema';

const createStudentIntoDB = async (studentData: TStudent) => {
  //  Statics method in custom way
  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }

  const result = await StudentModel.create(studentData);

  // Instance method
  // const student = new StudentModel(studentData); // Create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  // const result = await student.save(); // Built in instance method

  return result;
};

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// Find id base single data
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
