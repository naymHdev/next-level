import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';

// Get all students data
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
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
    res.status(200).json({
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
    res.status(200).json({
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
