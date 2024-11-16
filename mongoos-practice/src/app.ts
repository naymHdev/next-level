import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
const port = 3000;

// Parsers
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  var a = "fix hello worlds";
  res.send(a);
});

export default app;
