import express from 'express';
import { OfferCourseController } from './offeredCourse.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-offered-course',
  auth('admin', 'superAdmin'),
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferCourseController.createOfferCourse,
);

router.get(
  '/:',
  auth('admin', 'faculty', 'superAdmin', 'student'),
  OfferCourseController.getSingleOfferCourse,
);

router.get(
  '/my-offered-courses',
  auth('admin', 'faculty', 'superAdmin'),
  OfferCourseController.getMyOfferedCourses,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferCourseController.updateOfferCourse,
);

router.delete(
  '/id',
  auth('admin', 'superAdmin'),
  OfferCourseController.deleteOfferCourse,
);

router.get(
  '/',
  auth('admin', 'faculty', 'superAdmin'),
  OfferCourseController.getAllOfferCourse,
);

export const OfferedCourseRoutes = router;
