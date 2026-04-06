import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const folder = "Products";

export const cloudinaryHandler = async (command, target) => {
  try {
    if (command === "add") {
      const result = await cloudinary.uploader.upload(target, {
        folder,
        resource_type: "auto",
      });

      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    if (command === "delete") {
      const result = await cloudinary.uploader.destroy(target, {
        resource_type: "image",
      });

      if (result.result !== "ok") {
        throw new Error(`Failed to delete image: ${result.result}`);
      }

      return { success: true, result };
    }

    throw new Error("Invalid Cloudinary command. Use 'add' or 'delete'.");
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return { success: false, message: error.message };
  }
};
