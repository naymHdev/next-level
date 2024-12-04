import { StudentModel } from './studentSchema';

// Get all student data
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find()
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// Find id base single data
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
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
