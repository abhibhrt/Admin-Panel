import express from "express";
import prisma from "../utils/prismaClient.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { signJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

function setCookie(response, token) {
  response.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
}

function clearCookie(response) {
  response.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
}

// ------------- SIGNIN --------------
router.post(
  "/signin",
  asyncHandler(async (request, response) => {
    const { email, password } = request.body;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return response.status(400).json({
        message: "Email not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return response.status(400).json({
        message: "Invalid password",
      });
    }

    const token = signJwt({ id: admin.id, role: admin.role });
    setCookie(response, token);

    response.status(200).json({
      message: "Login successfully",
    });
  })
);

// ---------- LOGOUT ----------
router.post(
  "/signout",
  asyncHandler(async (request, response) => {
    clearCookie(response);
    response.status(200).json({
      message: "Logged out successfully",
    });
  })
);

// ---------- RESET PASSWORD ----------
router.post(
  "/reset-password",
  asyncHandler(async (request, response) => {
    let { name, email, newPassword } = request.body;
    name = name?.toLowerCase();
    email = email?.toLowerCase();

    if (!name || !email || !newPassword) {
      return response.status(400).json({
        message: "All fields are required",
      });
    }

    const admin = await prisma.admin.findFirst({
      where: {
        name,
        email,
      },
    });

    if (!admin) {
      return response.status(404).json({
        message: "Admin not found with given details",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashedPassword },
    });

    response.status(200).json({
      message: "Password reset successfully",
    });
  })
);

export default router;
