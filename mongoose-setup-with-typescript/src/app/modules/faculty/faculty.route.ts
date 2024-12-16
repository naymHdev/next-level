import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get('/:id', auth('admin', 'admin'), FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', auth('admin'), FacultyControllers.deleteFaculty);

router.get('/', auth('admin', 'faculty'), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
