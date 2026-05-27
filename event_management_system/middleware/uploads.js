import  multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        let folderName = "uploads/";
       
        if(file.fieldname === "eventImages"){
            folderName += "eventImages";
        }else if (file.filename === "eventposter"){
             folderName += "eventposter";
        }else if(file.filename === "eventBannars"){
            folderName += "eventBannars"
        }else if(file.filename === "eventspeker"){
            folderName += "eventspeker";
        }else if(file.filename === "eventDocuments"){
            folderName += "eventDocuments"
        }else{
            folderName = "others";
        }

        fs.mkdirSync(folderName,{
            reursive:true
        });

        cb (null ,folderName);

    }
});