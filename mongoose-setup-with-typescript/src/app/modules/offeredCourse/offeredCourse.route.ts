import express from 'express';
import { OfferCourseController } from './offeredCourse.controller';
import { validateRequest } from '../../middlewares/studentValidateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferCourseController.createOfferCourse,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferCourseController.updateOfferCourse,
);

router.delete('/id', OfferCourseController.deleteOfferCourse);

router.get('/', OfferCourseController.getAllOfferCourse);

export const OfferedCourseRoutes = router;
