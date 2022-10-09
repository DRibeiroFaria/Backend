import express from "express";
import { urlRouter } from "../api/url/url.router";
import { userRouter} from "../api/user/user.router";

const app = express.Router();

app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);
app.use("/", urlRouter);

export default app;
