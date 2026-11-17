import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authentication from "./routes/authentication.js";
import personal from "./routes/personal.js";
import products from "./routes/products.js";
import orders from "./routes/orders.js";
import users from "./routes/users.js";
import imageloader from "./routes/imageloader.js"
import createAdmins from "./utils/createAdmins.js";

dotenv.config();
const app = express();

// ---------- Middlewares ----------
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
createAdmins()

// ---------- Routes ----------
app.use("/api/auth", authentication);
app.use("/api/personal", personal);
app.use("/api/products", products);
app.use("/api/orders", orders);
app.use("/api/users", users);
app.use("/api/products/images", imageloader);

// ---------- Test Route ----------
app.get("/api", (req, res) => {
  res.json({ message: "Admin Control Running..." });
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
