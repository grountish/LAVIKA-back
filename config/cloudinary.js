// config/ cloudinary.js
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'folder-name', // The name of the folder in cloudinary
    allowedFormats: ['wav', 'png', 'jpg', 'jpeg'],
    params: { resource_type: 'video' },//  =>this is in case you want to upload other type of files, not just images
    filename: function (req, file, cb) {
        cb(null, file.originalname); // The file on cloudinary would have the same  name as the original file name
    }
});
const uploadCloud = multer({
    storage: storage
});
module.exports = uploadCloud;