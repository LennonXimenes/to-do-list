import "express-async-errors";
import express, { Application } from "express";
import { userRouter, todoRouter } from "./routers";
import { handleErrors } from "./middlewares";
import sessionRouter from "./routers/session.router";

const app: Application = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.use("/login", sessionRouter);

app.use(handleErrors);

export default app;