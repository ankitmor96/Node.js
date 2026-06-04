import express from "express";
import HttpError from "./middleware/HttprError";
import connectDB from "./config/db.js";
import dotenv from "dotenv";


dotenv.config({path:"./.env"});

const app = express();

app.use(express.json());

app.get("/",(req ,res ,next)=>{
    res.json("hello from server");
});

app.use((req,res,next)=>{
    return next(new HttpError("route not found",404));
});

app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error)
    }

    res.status(error.statusCode || 500).json({
        message:error.message || "internal server error"
    });
});

async function startServer(){
    try{
        await connectDB();

        const port = proccess.env.PORT || 5000;

        app.listen(port,(error)=>{
            if(error){
                console.log(error);
            }
            console.log(` server has runing on port ${port}`);
        });
    }catch(error){
        console.log(error);
        proccess.exit(1);
    }
}

startServer();