import express from "express";
import { login, signup } from "./user.service";

export const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);


