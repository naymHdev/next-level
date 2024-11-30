import { RequestHandler } from 'express';
import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserService.createStudentIntoDB(password, studentData);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
