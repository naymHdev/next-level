import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouts } from './app/modules/students/student.router';
import { UserRoutes } from './app/modules/users/user.route';
import appError from './app/middlewares/appError';
const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

// ALl  Application routes
app.use('/api/v1/students', StudentRouts);
app.use('/api/v1/students', StudentRouts);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(appError);

export default app;
