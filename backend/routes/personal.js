import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient.js";

const router = express.Router();

router.get("/me", asyncHandler(async (request, response) => {

  const token = request.cookies?.token;

  if (!token) return response.status(401).json({
    message: "Unauthorised Request"
  });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const admin = await prisma.admin.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    },
  });

  if (!admin) {
    return response.status(401).json({
      message: "Unauthorised Request"
    });
  }
  response.json({ admin }, { status: 200 });
}));


export default router;