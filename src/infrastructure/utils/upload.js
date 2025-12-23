import multer from "multer";
import { ApiError } from "./ApiError.js";

const storage = multer.memoryStorage();

 const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1,                  // max 1 file
  },
  fileFilter: (req, file, cb) => { 
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ApiError(400, "Only JPEG, PNG, WebP allowed"), false);
    }
  },
});

export { upload}