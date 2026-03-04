import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadPDFToCloudinary = async (filePath: string, publicId: string): Promise<string> => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'raw',
            public_id: publicId,
            folder: 'tax_receipts',
        });
        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error('Failed to upload PDF to Cloudinary');
    } finally {
        // Optionally remove the local file after upload
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};
