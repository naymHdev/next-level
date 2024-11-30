import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServices } from './student.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// Maintain async requests using higher order function
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

// Get all students data
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully find all students data',
    data: result,
  });
});

// Find single data
const getSingleStudents = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully find all students data',
    data: result,
  });
});

// update method
const updateSingleStudents = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.updateSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully updated data',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  updateSingleStudents,
};
