import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/:id',
  auth('admin', 'superAdmin'),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  FacultyControllers.deleteFaculty,
);

router.get(
  '/',
  auth('admin', 'faculty', 'superAdmin'),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
