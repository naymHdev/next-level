import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/create-students', StudentControllers.createStudent);

export const StudentRouts = router;
