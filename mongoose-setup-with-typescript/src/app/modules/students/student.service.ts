import { StudentModel } from './studentSchema';

// Get all student data
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// Find id base single data
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
// Update id base single data
const updateSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateSingleStudentFromDB,
};
