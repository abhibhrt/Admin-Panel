import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: 'dzrvn0sdm',
  api_key: 657478952168758,
  api_secret: '0cJv12LLrEsh38Fu2hBYp0IF6U8',
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
