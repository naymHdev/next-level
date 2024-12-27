import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth('admin', 'superAdmin', 'faculty'),
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  auth('admin', 'superAdmin', 'faculty'),
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  auth('admin', 'superAdmin', 'faculty'),
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.get(
  '/:id',
  auth('admin', 'superAdmin', 'faculty'),
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.delete(
  '/:id',
  auth('admin', 'superAdmin', 'faculty'),
  SemesterRegistrationController.deleteSemesterRegistration,
);

router.get(
  '/',
  auth('admin', 'superAdmin', 'faculty'),
  SemesterRegistrationController.getAllSemesterRegistrations,
);

export const semesterRegistrationRoutes = router;
