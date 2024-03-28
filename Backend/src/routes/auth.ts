import express, { Request, Response } from "express";
import { login, userSignOut, validateToken } from "../controllers/auth";
import { checkUserExistence, validate } from "../middlewares/schemaValidators";
import { loginSchema } from "../validators/auth";
import { verifyToken } from "../middlewares/auth";

const Router = express.Router();

Router.post("/login", [validate(loginSchema), checkUserExistence(true)], login);
Router.get("/validate-token", verifyToken, validateToken);
Router.post("/signOut", userSignOut);
export default Router;
