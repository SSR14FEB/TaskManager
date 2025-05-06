import { v2 as cloudinary } from "cloudinary";
import {extractPublicId} from 'cloudinary-build-url'
import fs from 'fs'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Upload an image

const uploadOnCloudinary = async function (localFilePath) {
    try {
        console.log("i am here")
        if (!localFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
        });
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
    }
};

const removeFromCloudinary = async function (previousProfilePictureUrl) {
    try {
        const publicId = await extractPublicId(previousProfilePictureUrl);
        const successForNextStep = await cloudinary.uploader.destroy(publicId,{resource_type:"image"})
        return successForNextStep
    } catch (error) {
        console.log("error while removing previous profile image from cloudinary",error)
    }
}


export {uploadOnCloudinary,removeFromCloudinary} 