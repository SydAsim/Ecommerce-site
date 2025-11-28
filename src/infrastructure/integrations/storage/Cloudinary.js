import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "ecommerce", // organized folder
      use_filename: true,
      unique_filename: false,
    });

    // Only delete if upload succeeded
    try {
      await fs.promises.unlink(localFilePath);
    } catch (unlinkError) {
      console.warn("Failed to delete local file:", unlinkError.message);
    }

    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    // Still try to clean up
    try {
      await fs.promises.unlink(localFilePath);
    } catch (unlinkError) {
      // ignore
    }
    return null;
  }
};

export { uploadOnCloudinary };