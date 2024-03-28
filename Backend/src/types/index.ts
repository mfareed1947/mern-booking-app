import { NextFunction, Request, Response } from "express";

export type ResponseData = {
  data?: any;
  [key: string]: any;
};

export type RouteHandler = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => void;
