import express from "express";
import asyncHandler from "express-async-handler";
import prisma from "../utils/prismaClient.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all orders with user + product + address
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await prisma.orders.findMany({
      include: {
        user: {
          include: {
            address: true,
          },
        },
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    res.json(orders);
  })
);

// ✅ Update order status
router.put(
  "/:id/status",
  protect,
  asyncHandler(async (req, res) => {
    const { status } = req.body;

    const order = await prisma.orders.update({
      where: { id: Number(req.params.id) },
      data: { status },
    });

    res.json(order);
  })
);

// ✅ Get product stats: how many users ordered each product
router.get(
  "/product-stats",
  protect,
  asyncHandler(async (req, res) => {
    const stats = await prisma.orders.groupBy({
      by: ["productId"],
      _count: {
        userId: true,
      },
    });

    const result = await Promise.all(
      stats.map(async (s) => {
        const product = await prisma.product.findUnique({
          where: { id: s.productId },
          include: { images: true },
        });

        return {
          product,
          totalUsers: s._count.userId,
        };
      })
    );

    res.json(result);
  })
);

export default router;
