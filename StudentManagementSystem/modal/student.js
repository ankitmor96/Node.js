import mongoose from "mongoose";

const studentSchema = new  mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
     grId:{
        type:Number,
        required:true,
        unique:true
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
    course:{
        type:String,
        enum:["fullStack","graphic design","UI/UX"],
        required:true
    },
    isActive:{
        type:String,
        enum:["active","pending","hold","suspend"],
        default:"active"
    },
    mobileNumber:{
        type:Number,
        min:10,
        required:true
    }

});

const student = mongoose.model("StudentData",studentSchema);

export default student;