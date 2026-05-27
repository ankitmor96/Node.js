import Event from "../models/Event.js";
import HttpError from "../middleware/HttpError.js";

const Create = async ((req , res, next)=>{
    try{
        const {eventname,eventDate,eventdescription,eventVanue,eventprice} = req.body;

        const eventImages = req.files?.req.files.map((file)=>file.path || null);

        const eventposter = req.files?.req.files[0].path || null;

        const eventBannars = req.files?.req.files[0].path || null;

        const eventspeker = req.files?.req.files.map((file)=>file.path || null);

        const eventDocuments = req.files?.req.files[0].path || null;

        if(!eventDate){
            return next (new HttpError("event date is required",400));
        }

        const newEvent = await new Event ({
            eventname,
            eventDate,
            eventdescription,
            eventImages,
            eventposter,
            eventBannars,
            eventspeker,
            eventVanue,
            eventprice,
            eventDocuments
        });

        await newEvent.save();

        res.status(201).json({
            success:true,
            message:"new event added successFully"
        });

        
    }catch(error){
        console.log(error.message);
    }
});