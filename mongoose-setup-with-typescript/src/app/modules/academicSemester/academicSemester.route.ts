import express from 'express';
import { AcademicSemesterController } from './acedemicSemester.controller';
import { validateRequest } from '../../middlewares/studentValidateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
