import express from "express";

const app = express();

app.get("/",(req ,res)=>{
    res.send("<h1> hello </h1>");
});

app.get("/about",(req ,res)=>{
    res.send("<h5>how are you</h5>");
});

const port = 5000;

app.listen(port,()=>{
    console.log(`Your code is loadded in server ...`);
});