const cloudinary = require("cloudinary").v2
const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')


cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'note-app', // The name of the folder in your Cloudinary account
    allowed_formats: ['jpeg', 'png', 'jpg'], // Restrict file types
    // You can add transformations here if you want
  },
});

const upload = multer({ storage: storage });

module.exports = upload;