import express, { NextFunction, Request, Response } from "express";
const app = express();

// Parser
app.use(express.json());
app.use(express.text());

const userRouter = express.Router();
app.use("/api/v1/users", userRouter);

userRouter.get("/create-users", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "User creating successfully done!",
    name: "naYm",
  });
});

// Middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Dev World! Whats going on?");
});

app.post("/", (res: Response, req: Request) => {
  console.log(req.body);
  res.send();
});

export default app;
