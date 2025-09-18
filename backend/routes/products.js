import express from "express";
import prisma from "../utils/prismaClient.js";
import { protect } from "../middleware/authMiddleware.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

/**
 * CREATE Product
 * Supports images[] and highlights[]
 */
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      title,
      description,
      price,
      discount,
      stock,
      category,
      sizes,
      delivery,
      shipCharge,
      returnable,
      images,
      highlights,
    } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        discount,
        stock,
        category: category || "general",
        sizes: sizes || "S, M, L, XL",
        delivery: delivery || 7,
        shipCharge: shipCharge || 0,
        returnable: returnable || 0,
        images: images?.length
          ? {
              create: images.map((img) => ({
                url: img.url || "",
                isPrimary: img.isPrimary || false,
                publicId: img.publicId || "",
              })),
            }
          : undefined,
        highlights: highlights?.length
          ? {
              create: highlights.map((hl) => ({
                key: hl.key || "",
                value: hl.value || "",
              })),
            }
          : undefined,
      },
      include: { images: true, highlights: true },
    });

    res.status(201).json(newProduct);
  })
);

/**
 * READ All Products
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await prisma.product.findMany({
      include: { images: true, highlights: true, reviews: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(products);
  })
);

/**
 * UPDATE Product
 * Replaces images & highlights if provided
 */
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const productId = parseInt(req.params.id);

    if (!productId || isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const {
      title,
      description,
      price,
      discount,
      stock,
      category,
      sizes,
      delivery,
      shipCharge,
      returnable,
      images,
      highlights,
    } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        description,
        price,
        discount,
        stock,
        category,
        sizes,
        delivery,
        shipCharge,
        returnable,
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((img) => ({
              url: img.url,
              isPrimary: img.isPrimary || false,
              publicId: img.publicId || "",
            })),
          },
        }),
        ...(highlights && {
          highlights: {
            deleteMany: {},
            create: highlights.map((hl) => ({
              key: hl.key,
              value: hl.value,
            })),
          },
        }),
      },
      include: { images: true, highlights: true },
    });

    res.json(updatedProduct);
  })
);

/**
 * DELETE Product
 * Cascades: Highlights, Images, Reviews auto-deleted
 * Orders & Cart productId => null (due to schema)
 */
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const productId = parseInt(req.params.id);

    await prisma.product.delete({
      where: { id: productId },
    });

    res.json({
      message:
        "Product deleted successfully. Highlights, Images, and Reviews were removed. Orders & Cart remain safe.",
    });
  })
);

export default router;