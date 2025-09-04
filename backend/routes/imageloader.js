import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { cloudinaryHandler } from '../utils/cloudinary.js';
import multer from 'multer';
import fs from 'fs';
const upload = multer({ dest: "upload/"});
const router = express.Router();

router.post("/upload-image", protect, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const upload = await cloudinaryHandler("add", req.file.path);
    fs.unlinkSync(req.file.path);
    res.json(upload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete college image
router.post("/delete-image", protect, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Image ID is required" });

    await cloudinaryHandler("delete", id);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router