import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";

import Hotel, { HotelType } from "../models/hotel";
import { verifyToken } from "../middlewares/auth";
import { body } from "express-validator";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const iamageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;
      const imageUrls = await imageUploader(iamageFiles);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (error) {
      console.log("Error Creating Hotel:", error);
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.find({ userId: req.userId }).sort({
      lastUpdated: -1,
    });
    res.json(hotel);
  } catch (error) {
    res.send(500).send({ message: "Error Fetching Hotels" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.send(500).send({ message: "Error Fetching Hotels" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updateHotel: HotelType = req.body;
      updateHotel.lastUpdated = new Date();

      const hotel = await Hotel.findByIdAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.params.userId,
        },
        updateHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const files = req.files as Express.Multer.File[];
      const updatedIamgeUrls = await imageUploader(files);

      hotel.imageUrls = [...updatedIamgeUrls, ...(updateHotel.imageUrls || [])];

      await hotel.save();
      res.status(201).json(hotel);
    } catch (error) {
      res.send(500).send({ message: "Error throw Hotels" });
    }
  }
);

async function imageUploader(iamageFiles: Express.Multer.File[]) {
  const uploadPromises = iamageFiles.map(async (file: any) => {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
