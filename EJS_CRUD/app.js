import express from "express";  // import express.js make server 

const app = express();  // express call using app object create

app.use(express.urlencoded({extended:true}));  // middelware, form response data read 

app.set("view engine","ejs"); // handel .ejs file render 


     let studentList =[{    // array of object in students 
        id:1,
        name:"ankit"
     },
    {
        id:2,
        name:"kalpesh"
    }];


app.get("/",(req ,res)=>{    // route home page
     res.render("index",{studentList})   // index.ejs and student data render

});

app.get("/add",(req ,res)=>{  // open the route page add.ejs file from data aeccess
    res.render("add");
});

app.post("/add",(req ,res)=>{   //  from submit after data will be called  ,  http post method useing  
    const {name} = req.body;   // use by from name value

    const newStudent ={     // create new student object , aeccess id in current time and name value for from 
        id: new Date().getTime(),
        name
    };

    studentList.push(newStudent); //  add new student  by last in array

    res.redirect("/"); // home page updatted in added new student 

});

const port = 5000;

app.listen(port,(err)=>{
    if(err){
        console.log("error");
    }
    console.log(`This page is loaded... ${port}`);
});