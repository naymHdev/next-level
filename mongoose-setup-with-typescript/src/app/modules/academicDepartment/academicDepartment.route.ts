import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDepartmentValidations } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-department',
  auth('admin', 'superAdmin'),
  validateRequest(
    AcademicDepartmentValidations.academicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);
router.get(
  '/:departmentId',
  AcademicDepartmentControllers.findSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);
export const AcademicDepartmentRoutes = router;
