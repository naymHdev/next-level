import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/create-students/:studentId', StudentControllers.getSingleStudents);
router.delete(
  '/create-students/:studentId',
  StudentControllers.updateSingleStudents,
);

export const StudentRouts = router;
