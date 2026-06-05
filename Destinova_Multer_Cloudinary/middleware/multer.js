import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"destinova",
        allowed_formats:[
            "jpg",
            "jpeg",
            "png"
        ],
        transformation:[
            {
                height:500,
                width:500,
                crop:"limit",
            },
            {
                fetch_format:"webp"
            },
            {
                quality:"auto"
            },
        
    ],

    },
});

const uploads = multer({
    storage,
    limits:{
        fileSize: 20*1024*1024,
    },
});

export default uploads;

