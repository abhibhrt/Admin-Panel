import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient.js";

const router = express.Router();

/**
 * @route  GET /api/auth/me
 * @desc   Get current admin details from cookie JWT
 * @access Private
 */
router.get("/me", asyncHandler(async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const admin = await prisma.admin.findUnique({
    where: { id: decoded.id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!admin) {
    return res.status(401).json({ error: "Invalid token" });
  }

  res.json({ admin });
}));


export default router;
