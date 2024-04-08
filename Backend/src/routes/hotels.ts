import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../types";

const router = express.Router();

router.get("/serach", async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotel = await Hotel.find().skip(skip).limit(pageSize);

    const total = await Hotel.countDocuments();
    const respone: HotelSearchResponse = {
      data: hotel,
      pagination: {
        total: total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(respone);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});
