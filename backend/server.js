import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import meRoutes from "./routes/meRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// ---------- Middlewares ---------- process.env.CLIENT_ORIGIN ||
app.use(
  cors({
    origin: ["https://admin-panel-tau.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ---------- Routes ----------
app.use("/api/authentication", authRoutes);
app.use("/api/authentication", meRoutes);
app.use("/api/products", productRoutes);

// ---------- Test Route ----------
app.get("/", (req, res) => {
  res.json({ message: "Admin Control Running..." });
});

// ---------- Error Middleware ----------
app.use(notFound);
app.use(errorHandler);

// ---------- Start Server ----------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
