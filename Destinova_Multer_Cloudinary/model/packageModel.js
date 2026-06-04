import mongoos from "mongoos";
import { timeStamp } from "node:console";


const PackageSchema =  new mongoos.Schema({

    PackageName:{
        typr:String,
        required:true,
        trim:true 
    },
    PackagePrice:{
        typr:Number,
        required:true,
        min:0
    },
    StartDate:{
        type:Date,
        required:true 
    },
    EndDate:{
        type:Date,
        required:true 
    },
    Destination:{
        type:String,
        required:true 
    },
    PackageImages:{
        type:String,
        required:true 
    },
    PackageType:{
        type:String
    },
},
{
    timeStamp:true,
}

);

const Packages = mongoos.model("Packages",PackageSchema);

export default Packages;