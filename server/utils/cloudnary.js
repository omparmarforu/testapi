require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'picwheels',
    resource_type: 'auto', // critical for videos
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4']
  }
});
if(!storage){
  console.error('STORAGE or server error:', err);
  res.status(500).json({ error: err.message || 'Unknown server error' });

}

module.exports = { cloudinary, storage };
