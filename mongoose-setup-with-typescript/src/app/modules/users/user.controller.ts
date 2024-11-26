import { Request, Response } from 'express';
import { UserService } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    // Schema validation use Zod

    // const dataValidationZod = userValidationSchema.parse(studentData);

    // validation data send in DB
    const result = await UserService.createStudentIntoDB(password, studentData);

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

export const UserController = {
  createStudent,
};
