import express from "express";
import prisma from "../utils/prismaClient.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { signJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

function setAuthCookie(res, token) {
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd, 
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
}

// ---------- REGISTER ----------
router.post("/signup",  asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const existing = await prisma.admin.findUnique({ where: { email } });

    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: { name, email, password: hashedPassword },
    });

    const token = signJwt({ id: admin.id, role: admin.role });

    setAuthCookie(res, token);

    res.status(201).json({
      message: "New admin registered",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
      },
    });
  })
);

// ---------- LOGIN ----------
router.post("/signin", asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(400).json({ error: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = signJwt({ id: admin.id, role: admin.role });

    setAuthCookie(res, token);

    res.json({
      message: "Login successful",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  })
);

// ---------- LOGOUT ----------
router.post("/signout", asyncHandler(async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    res.json({ message: "Logged out successfully" });
  })
);

export default router;
