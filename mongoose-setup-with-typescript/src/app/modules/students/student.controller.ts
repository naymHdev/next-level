import { studentServices } from './student.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';

// Get all students data
const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully find all students data',
    data: result,
  });
});

// Find single data
const getSingleStudents = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully find all students data',
    data: result,
  });
});

// Updated
const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  });
});

// delete method
const deleteSingleStudents = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully deleted data',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteSingleStudents,
  updateStudent,
};
