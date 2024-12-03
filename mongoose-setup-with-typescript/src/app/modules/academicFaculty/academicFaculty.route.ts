import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { validateRequest } from '../../middlewares/studentValidateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.get('/:facultyId', AcademicFacultyControllers.createAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);
export const AcademicFacultyRoutes = router;
