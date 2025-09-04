import express from "express";
import prisma from "../utils/prismaClient.js";
import { protect } from "../middleware/authMiddleware.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

// CREATE Product with optional images
router.post("/", protect, asyncHandler(async (req, res) => {
    const { title, description, price, discount, stock, images } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        discount,
        stock,
        images: images? {
            create: images.map((img) => ({
              url: img.url || "",
              isPrimary: img.isPrimary || false,
              publicId: img.publicId || ""
            })),
          } : undefined,
      },
      include: { images: true },
    });

    res.status(201).json(newProduct);
  })
);

// READ All Products
router.get("/", asyncHandler(async (req, res) => {
    const products = await prisma.product.findMany({
      include: { images: true },
    });
    res.json(products);
  })
);


// UPDATE Product
router.put("/:id", protect, asyncHandler(async (req, res) => {
    const { title, description, price, discount, stock, images } = req.body;
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title,
        description,
        price,
        discount,
        stock,
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
      },
      include: { images: true },
    });
    res.json(updatedProduct);
  })
);

// DELETE Product
router.delete("/:id", protect, asyncHandler(async (req, res) => {
    const productId = parseInt(req.params.id);
    await prisma.productImage.deleteMany({
      where: { productId },
    });
    await prisma.product.delete({
      where: { id: productId },
    });
    res.json({ message: "Product and related images deleted" });
  })
);

export default router;