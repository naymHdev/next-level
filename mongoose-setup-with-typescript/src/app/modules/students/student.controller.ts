import { Request, Response } from 'express';
import { studentServices } from './student.service';
import studentValidationSchema from './student.validations';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // Schema validation use Zod

    const dataValidationZod = studentValidationSchema.parse(studentData);

    // validation data send in DB
    const result = await studentServices.createStudentIntoDB(dataValidationZod);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Student is created failed!',
      errors: error,
    });
  }
};

// Get all students data
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'successfully find all students data',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Student data get failed!',
      errors: error.message || 'Student get data failed!',
    });
  }
};

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'successfully find all students data',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Student data get failed!',
      errors: error.message || 'Get student single data failed!',
    });
  }
};

// update method
const updateSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.updateSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'successfully updated data',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'updated data failed!',
      errors: error.message || 'updated data failed!',
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  updateSingleStudents,
};
