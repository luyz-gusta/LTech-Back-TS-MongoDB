import { config } from "dotenv";
import cloudinary from "cloudinary";

config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
  secure: true,
});

export default cloudinary;
