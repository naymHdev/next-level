import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentValidations } from '../students/student.validations';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-student',
  // auth('student', 'admin'),
  validateRequest(studentValidations.studentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth('admin'),
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  // auth(),
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRoutes = router;
