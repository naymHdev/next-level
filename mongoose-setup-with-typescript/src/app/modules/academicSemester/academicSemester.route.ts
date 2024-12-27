import express from 'express';
import { AcademicSemesterController } from './acedemicSemester.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth('admin', 'superAdmin', 'faculty'),
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get(
  '/:semesterId',
  auth('admin', 'superAdmin', 'faculty', 'student'),
  AcademicSemesterController.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  auth('admin', 'superAdmin', 'faculty', 'student'),
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

router.get(
  '/',
  auth('admin', 'superAdmin', 'faculty'),
  AcademicSemesterController.getAllAcademicSemesters,
);
export const AcademicSemesterRoutes = router;
