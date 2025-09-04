import express from "express";
import asyncHandler from "express-async-handler";
import prisma from "../utils/prismaClient.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all users with their orders + address
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({
      include: {
        address: true,
        orders: {
          include: {
            product: {
              include: { images: true },
            },
          },
        },
      },
    });

    res.json(users);
  })
);

// ✅ Get single user with all orders + details
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        address: true,
        orders: {
          include: {
            product: {
              include: { images: true },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  })
);

export default router;
