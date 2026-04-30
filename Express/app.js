import express from "express";

const app =express (); 

app.get ("/",(req , res)=>{
    res.send(" Is This home page ?");
});

const port = 5000;

app.listen(port,(err)=>{
    
    console.log(` This code is loadded .. ${port}`);
});