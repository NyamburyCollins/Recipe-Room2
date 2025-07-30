import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function uploadRecipeImage(filePath: string, recipeName: string): Promise<string | null> {
  const publicId = `recipes/${sanitizeRecipeName(recipeName)}`;
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'recipes',
      public_id: publicId,
      overwrite: true,
    });
    return result.secure_url;
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
}

function sanitizeRecipeName(name: string): string {
  return name.trim().toLowerCase().replace(/\W+/g, '_');
}