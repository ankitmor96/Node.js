import mongoose from "mongoose";


async function connectDB(){
     try{
        const connectdb = await mongoose.connect("mongodb://127.0.0.1:27017/StudentManagementSystem");
        
        console.log("db connected");

     }catch(error){
        console.log(error.message);
     
     }
}

export default connectDB;