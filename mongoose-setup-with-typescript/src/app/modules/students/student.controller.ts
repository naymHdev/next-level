import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// Get all students data
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'successfully find all students data',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'successfully find all students data',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// update method
const updateSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.updateSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'successfully updated data',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  updateSingleStudents,
};
