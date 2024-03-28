import express, { Request, Response, response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Hello from express! end points" });
});

app.listen(7000, () => {
  console.log("server listening on http://localhost on port 7000");
});
