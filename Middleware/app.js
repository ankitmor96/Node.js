import express from "express";
import helmet  from "helmet";
import checkLogin from "./middleware/export.js";

const app = express();

const port = process.env.PORT || 5000; // define env  port

// external middleware

app.use(helmet());

// application level middlevare

app.use((req,res,next)=>{
    console.log("This is application level middleware");
    next();
});



// route level middleware

app.get("/",checkLogin,(req,res)=>{
    res.send("This is home page ");
});

// undefined route level middleware

// app.use((req,res)=>{
//    res.status(404).json({
//     statusCode : 404,
//     message : "page not found"
//    });
// });


// centralized error middleware

app.use((err,req,res,next)=>{
    console.log(err.message);

    res.status(500).json({
        statusCode:500,
        message: err.message
    });
});


// const port = 5000;

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server is loaded... ${port}`);
});