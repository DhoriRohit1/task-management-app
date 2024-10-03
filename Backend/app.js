import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import taskRouter from "./routes/taskRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
