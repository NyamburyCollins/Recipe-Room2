import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

//  Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Load .env file from frontend/.env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

//  Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

//  Upload function
export async function uploadRecipeImage(filePath: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "recipe-images",
    });
    console.log(" Upload successful:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("❌ Upload error:", error);
    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  uploadRecipeImage(path.resolve(__dirname, "test.png"))
    .catch((error) => {
      console.error("❌ Caught upload error:", error);
    });
}


/*
npx tsx frontend/src/utils/cloudinary.ts
*/