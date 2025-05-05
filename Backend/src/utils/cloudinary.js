import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Upload an image

const uploadOnCloudinary = async function (localFilePath) {
    try {
        if (!localFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
        });
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("cloudinary image upload failed", error);
    }
};

export default uploadOnCloudinary