import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import streamifier from 'streamifier';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 1. Original Disk/Cloudinary Storage (Used by single image uploads)
const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ngo-campaigns',
        allowed_formats: ['jpg', 'png', 'webp'],
    } as any,
});

export const upload = multer({
    storage: cloudStorage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// Use Memory Storage
const storage = multer.memoryStorage();

// Multer Upload Middleware (Max 5MB, JPG/PNG only)
export const uploadMultiple = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPG, PNG, and WEBP are allowed."));
        }
    }
});

// Helper function to upload buffer to Cloudinary via stream
export const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: folder },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};
