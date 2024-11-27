import { Router } from 'express';
import { StudentRouts } from '../modules/students/student.router';
import { UserRoutes } from '../modules/users/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRouts,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
