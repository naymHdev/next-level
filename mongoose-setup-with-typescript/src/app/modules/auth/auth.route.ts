import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth('admin', 'faculty', 'student'),
  validateRequest(AuthValidations.changePassValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/forgat-password',
  validateRequest(AuthValidations.forgatPasswordValidationSchema),
  AuthControllers.forgatPassword,
);

export const AuthRoutes = router;
