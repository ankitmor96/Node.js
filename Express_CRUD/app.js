import express from "express";
import HttpError from "./middleware/export.js";

const app = express();
const port = process.env.PORT || 5000;

// create Task List

const TaskList = [
    {
        id: 1, name: "ankit", city: "bhavnager",
    },
    {
        id: 2, name: "prince", city: "junagadh",
    }];

app.use(express.json());

// show task list

app.get("/TaskList", (req, res) => {
    if (TaskList.length === 0) {
        return res.status(404).json({
            success: false,
            message: "no task found"
        });
    }
    res.json({
        success: true,
        data: TaskList
    });

});

// find id to tasklist

app.get("/TaskList/:id", (req, res, next) => {
    const id = Number(req.params.id);

    console.log(id);

    const tasklist = TaskList.find((t) => t.id === id);

    if (!tasklist) {
        return res.status(404).json({
            success: false,
            message: "id not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "id is found", tasklist
    });
});

// add new task

app.post("/addTask", (req, res, next) => {
    const { name, city } = req.body;

    if (!name || !city) {
        return next(new HttpError("please data fill requied", 400));
    }

    const newTask = {
        id: new Date().getTime(),
        name,
        city
    }

    TaskList.push(newTask);

    res.status(201).json({
        success: true,
        message: "task aaded successfully", data: newTask
    });
});

// update patch method 

app.patch("/updateTask/:id", (req, res, next) => {
    const id = Number(req.params.id);

    const tasklist = TaskList.find((t) => t.id === id);

    if (!tasklist) {
        return next(new HttpError(" id not found", 404));
    }

    const { name, city } = req.body;

    if (name) {

        tasklist.name = name;

    }

    if (city) {

        tasklist.city = city;

    }

    if (!name || !city) {
        return next(new HttpError("id not found", 400));
    }
    res.status(200).json({
        success: true,
        message: "Update succesfully",tasklist,
    });
});

// update put method

app.put("/updateTask/:id",(req,res,next)=>{
    const id = Number(req.params.id);

   const  tasklist = TaskList.findIndex((t)=> t.id ==id);

   if(tasklist === -1){
    return next(new HttpError("id not found",404));
   }
   const {name,city} = req.body;

   tasklist[tasklistIndex] = {... tasklist[tasklistIndex] , name,city}

   if(!name || !city){
    res.status(200).json({
        success:true,
        message:"success",
        updateTask:tasklist[tasklistIndex]
    });
   }
});

// delete task

app.delete("/deleteTask/:id",(req,res,next)=>{
    const id = Number(req.params.id);

    const index = TaskList.findIndex((t)=> t.id === id);

    if(TaskList === -1){
        return next(new HttpError("id not found",404));
    }

    TaskList.splice(index,1);

    res.status(200).json({
        success:true,
        message:"delete successFully"
    });
});


// route  

app.get("/", (req, res) => {
    res.send("This is home page");
});

// middleware handler

app.use((req, res, next) => {
    return next(new HttpError("Route not found", 404));
});

// centralized error handling 

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
        res.status(error.statusCode || 500).json({
        success:false,
        message:error.message || "something went wrong"
    });

});




// const port = 5000;

app.listen(port, (err) => {
    if (err) {
        console.error("This page is not found", err);
    }
    console.log(`Server is runing ${port}`);
});
