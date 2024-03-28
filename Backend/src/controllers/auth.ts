import { NextFunction, Request, Response } from "express";
import { RouteHandler } from "../types";
import User from "../models/user";
import { comparePassword } from "../utils/auth";
import CustomErrorHandler from "../services/customError";
import JwtService from "../services/jwtServices";

export const login: RouteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    const acccess_token = JwtService.sign({ id: user.id }, "1hr");

    res.cookie("auth_token", acccess_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error from backend" });
  }
};

export const validateToken = async (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
};

export const userSignOut = async (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
};
