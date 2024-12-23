import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentValidations } from '../students/student.validations';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { auth } from '../../middlewares/auth';
import { changeStatusValidationSchema } from './user.validation';

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

router.get(
  '/me',
  auth('student', 'faculty', 'admin'),
  UserController.getMyData,
);

router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(changeStatusValidationSchema),
  UserController.changeStatus,
);

export const UserRoutes = router;
