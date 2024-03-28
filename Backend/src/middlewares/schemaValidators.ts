import { Request, Response, NextFunction } from "express";
import joi from "joi";
import CustomErrorHandler from "../services/customError";
import User from "../models/user";
import { RouteHandler } from "../types";

export const validate =
  (schemma: joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schemma.validate(req.body);
    if (error) {
      return next(error);
    }
    next();
  };

export const checkUserExistence = (shouldExist: boolean): RouteHandler => {
  return async (req, _res, next) => {
    const { email } = req.body;

    try {
      const isUserExists = await User.findOne({ email });

      if (shouldExist && !isUserExists) {
        return next(
          CustomErrorHandler.wrongCredentials("The user is not present.")
        );
      } else if (!shouldExist && isUserExists) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken.")
        );
      }

      req.user = {
        user: isUserExists,
      };

      next();
    } catch (error) {
      return next(error);
    }
  };
};
