import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewares/studentValidateRequest';
import { studentValidations } from '../students/student.validations';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.studentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
