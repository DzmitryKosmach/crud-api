import express, { Application, Request, Response, NextFunction } from "express";
import userRouter from "./resources/users/user.router";
import HttpException from "./exceptions/httpexception";

const app: Application = express();

app.use(express.json());

app.use("/", (req: Request, res: Response, next) => {
  if (req.originalUrl === "/") {
    res.send("Service is running!!!");
    return;
  }
  next();
});

app.use("/users", userRouter);

app.use(
  (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    if (err.status) {
      console.error(
        `${req.method} - ${err.status} - ${err.message}  - ${req.originalUrl}`
      );
      res.status(err.status);
      res.send(err.message);
    } else {
      console.error("Internal Server Error 500");
      res.status(500).send("Internal Server Error");
    }
    next();
  }
);

process.on("uncaughtException", (error) => {
  console.error(`The uncaughtException error: ${error}`, () => process.exit(1));
});

process.on("unhandledRejection", (error) => {
  console.error(`The unhandledRejection error: ${error}`, () =>
    process.exit(1)
  );
});

export default app;
