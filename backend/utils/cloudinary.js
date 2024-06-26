import { v2 as cloudinary } from "cloudinary";
//Node Js file system
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("file is uploaded successfully");
    return response.url
  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null;
  }
};

export {uploadOnCloudinary}
