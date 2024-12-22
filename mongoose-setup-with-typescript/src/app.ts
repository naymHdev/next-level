import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import appError from './app/middlewares/globalError';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
);
app.use(cookieParser());

// ALl  Application routes
app.use('/api/v1/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(appError);
app.use(notFound);

export default app;
