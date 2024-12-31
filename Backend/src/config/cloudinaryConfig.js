import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME ,
  api_key: process.env.API_KEY ,
  api_secret: process.env.API_SECRET,
});


const getDynamicStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder, // Dynamic folder name
      allowed_formats: ["jpg", "png", "jpeg"], // Allowed formats
      public_id: () => Date.now().toString(), // Unique filename
    },
  });
};
  export { cloudinary, getDynamicStorage };
  