import { NextFunction, Request, Response } from "express";
import { HotelType } from "../models/hotel";

export type ResponseData = {
  data?: any;
  [key: string]: any;
};

export type RouteHandler = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => void;

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    page: number;
    pages: number;
    total: number;
  };
};
