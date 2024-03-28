import express from "express";
import { check } from "express-validator";
import { register } from "../controllers/user";

const Router = express.Router();

Router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "First Name is required").isString(),
    check("email", "First Name is required").isEmail(),
    check("password", "password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  register
);

export default Router;
