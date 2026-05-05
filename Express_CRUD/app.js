import express from "express";
import HttpError from "./middleware/export.js";

const app = express();

const TaskList =[
{
    id:1, name:"ankit", city:"bhavnager",
},
{
   id:2, name:"prince", city:"junagadh",
}];

app.use(express.json());

app.get("/hello",(req,res)=>{
    res.json("hello from server");
});

app.get("/TaskList",(req,res)=>{
    if(TaskList.length === 0){
         res.status(404).json({
             success:false,
             message:"no task found"});
    }
        res.json({
            success:true, 
            data:TaskList});
    
});

app.get("/",(req , res)=>{
    res.send("This is home page");
});

app.use((req,res,next)=>{
    return next(new HttpError("Route not found",404));
});

app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error);
    }
    res.status(error.statusCode || 500).json({
        message:error.message || "something went wrong",
    });
});


const port = 5000;

app.listen(port,(err)=>{
    if(err){
        console.error("This page is not found",err);
    }
    console.log(`Server is runing ${port}`);
});