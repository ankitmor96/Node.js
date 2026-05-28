import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import eventRouters from "./routes/eventRoutes.js";

dotenv.config({path:"./.env"}); 

const app = express();

app.use(express.json());

app.get("/",(req,res,next)=>{
    res.send("hello from server");
});

app.use("/event", eventRouters);

app.use((req,res,next)=>{
    return next (new HttpError("Route not found",404));
});

app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error);
    }

    res.status(error.statusCode || 500)
    .json({message:error.message || "internal server error"});
});

async function StartServer(){
    try{
         
        await connectDB();

        const port = 5000;

        app.listen(port,(error)=>{
            if(error){
                console.log(error.message);
            }

            console.log(`server has runing on port ${port}`);
        });
    }catch(error){
        console.log(error.message);
    }
}

StartServer();



