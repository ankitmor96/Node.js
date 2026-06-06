import express from "express";
import HttpError from "./middleware/HttprError.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import packageRoutes from "./routes/packageRoutes.js";


dotenv.config({path:"./.env"});

const app = express();

app.use(express.json());

// Route middlware
app.get("/",(req ,res ,next)=>{
    res.json("hello from server");
});


//  packages routes
app.use("/packages", packageRoutes);



// Http Middlware 
app.use((req,res,next)=>{
    return next(new HttpError("route not found",404));
});


// centralized Middlware 
app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error)
    }

    res.status(error.statusCode || 500).json({
        message:error.message || "internal server error"
    });
});
 

// Create functin connect .env file and define  port
async function startServer(){
    try{
        await connectDB();

        const port = process.env.PORT || 5000;

        app.listen(port,(error)=>{
            if(error){
                console.log(error);
            }
            console.log(` server has runing on port ${port}`);
        });
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

startServer();