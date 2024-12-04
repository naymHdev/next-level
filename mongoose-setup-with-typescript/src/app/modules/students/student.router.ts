import express from 'express';
import { StudentControllers } from './student.controller';
import { validateRequest } from '../../middlewares/studentValidateRequest';
import { studentValidations } from './student.validations';

const router = express.Router();

router.get('/:studentId', StudentControllers.getSingleStudents);

router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteSingleStudents);

router.get('/', StudentControllers.getAllStudents);

export const StudentRouts = router;
