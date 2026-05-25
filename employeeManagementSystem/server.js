import express from "express";
import HttpError from "./middleware/export.js";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();

app.use (express.json());

app.use("/Employee", employeeRoutes);

app.get("/",(req,res,next)=>{
    res.send("hello from server");
});

app.use((req,res,next)=>{
    return next (new HttpError("Not Found",404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "internal server error",
  });
});

const port = 5000;

async function StartServer(){
    try{
        
        await connectDB();

        app.listen(port,()=>{
            console.log(`Server has loaded on port ${port}`);
        });
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

StartServer();
