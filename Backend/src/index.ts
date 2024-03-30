import express, { Request, Response, response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import hotelRoutes from "./routes/my-hotels";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

app.use("/api/add-hotels", hotelRoutes);

app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Hello from express! end points" });
});

app.listen(7000, () => {
  console.log("server listening on http://localhost on port 7000");
});
