import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async() => {
    // Check if environment variables are set
    if (!process.env.CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
        console.error("Cloudinary credentials are missing. Please check your environment variables.");
        return;
    }

    // Configuring Cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    // Test if the connection is working
    try {
        const response = await cloudinary.api.ping(); // This pings Cloudinary to confirm the connection
        console.log("Cloudinary connection successful", response);
    } catch (error) {
        console.error("Error connecting to Cloudinary:", error.message);
    }
};

export default connectCloudinary;
