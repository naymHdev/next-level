import { Request, Response } from 'express';
import { studentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // Schema validation use Joi
    const { error } = studentValidationSchema.validate(studentData);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Student is created failed!',
        errors: error.details,
      });
    }

    const result = await studentServices.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Student is created failed!',
      errors: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'successfully find all students data',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Student data get failed!',
      errors: error,
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
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Student data get failed!',
      errors: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
