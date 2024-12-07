import express from 'express';
import { StudentControllers } from './student.controller';
import { validateRequest } from '../../middlewares/studentValidateRequest';
import { studentValidations } from './student.validations';

const router = express.Router();

router.get('/:id', StudentControllers.getSingleStudents);

router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.deleteSingleStudents);

router.get('/', StudentControllers.getAllStudents);

export const StudentRouts = router;
