import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { userRouter } from "./routes/user.js";
import { adminRouter } from "./routes/admin.js";
import { courseRouter } from "./routes/course.js";

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(process.env.URI);
  app.listen(3000);
  console.log("connected");
}

main();
