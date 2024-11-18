import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRouts } from './app/modules/students/student.router';
const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

// ALl  Application routes

app.use('/api/v1/students', StudentRouts);
app.use('/api/v1/students', StudentRouts);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
