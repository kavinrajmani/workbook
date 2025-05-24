import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'books',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Error uploading image to Cloudinary');
  }
};

export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      folder: 'books',
    });
  } catch (error) {
    throw new Error('Error deleting image from Cloudinary');
  }
}