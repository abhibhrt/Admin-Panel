import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid or expired" });
  }
};

export const signJwt = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: "1d",
    issuer: "my-app",
    audience: "my-app-users",
  });
};