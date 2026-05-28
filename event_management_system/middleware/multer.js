import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        let folderName = "./uploads/";

        if (file.fieldname === "eventImages") {
            folderName += "eventImages";
        } else if (file.fieldname === "eventposter") {
            folderName += "eventposter";
        } else if (file.fieldname === "eventBannars") {
            folderName += "eventBannars";
        } else if (file.fieldname === "eventspeaker") {
            folderName += "eventspeaker";
        } else if (file.fieldname === "eventDocuments") {
            folderName += "eventDocuments";
        } else {
            folderName += "others";
        }

        fs.mkdirSync(folderName, {  //  file system che folder banavu aem  
            recursive: true
        });

        cb(null, folderName); // jo koy error na hoy to call back ma folername aavi jay
    },

    filename: (req, file, cb) => { // file aetle location 

        const uniqueName =
            `${file.fieldname}-${Date.now()}-${file.originalname}`; // fieldname aavu joye date hal ni and original name aavu joye nay ke use nakhe ae 

        cb(null, uniqueName); // jo aem hoy kay error na hoy to uniquename ma add thase 
    }

});

const fileFilter = (req, file, cb) => {

    const ImagesTypes = [ // images kya type ni hovi joye ae 
        "image/jpg",
        "image/jpeg",
        "image/png"
    ];

    const DocumentTypes = [ // document kya type na hova joye
        "application/pdf"
    ];

    if (file.fieldname === "eventDocuments") {

        if (DocumentTypes.includes(file.mimetype)) {  

            cb(null, true);

        } else {

            cb(new Error("only pdf is allowed"));

        }

    } else {

        if (ImagesTypes.includes(file.mimetype)) {

            cb(null, true);

        } else {

            cb(new Error("only jpg, jpeg, png is allowed"));

        }

    }

};

const uploads = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024
    }
});

export default uploads;