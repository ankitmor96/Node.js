import Event from "../modal/event.js";
import HttpError from "../middleware/HttpError.js";
import fs from "fs";


const Create = async (req, res, next) => {
    try {
        const { eventname, eventDate, eventdescription, eventVanue, eventprice } = req.body;

        const eventImages = req.files?.eventImages?.map((file) => file.path )|| null;

        const eventposter = req.files?.eventposter[0]?.path || null;

        const eventBannars = req.files?.eventBannars[0]?.path || null;

        const eventspeaker = req.files?.eventspeaker?.map((file) => file.path )|| null;

        const eventDocuments = req.files?.eventDocuments[0]?.path || null;

        if (!eventDate) {
            return next(new HttpError("event date is required", 400));
        }

        const newEvent = new Event({
            eventname,
            eventDate,
            eventdescription,
            eventImages,
            eventposter,
            eventBannars,
            eventspeaker,
            eventVanue,
            eventprice,
            eventDocuments
        });

        await newEvent.save(); // new create event save kari

        res.status(201).json({
            success: true,
            message: "new event added successFully", newEvent
        });


    } catch (error) {

        console.log(error);

        return next(new HttpError("not added event ", 500));
    }

};

const getAllEvent = async (req, res, next) => {

    try {

        const events = await Event.find({});

        if (events.length === 0) {
            return res.status(404).json({
                success: true,
                message: "no data found "
            });
        }

        res.status(200).json({
            success: true,
            message: "event data found",
            data: events
        });
    } catch (error) {
        return next(new HttpError("route not founr", 404));
    }
};

const getById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const event = await Event.findById(id);

        if (!event) {
            return next(new HttpError("event data not found", 404));
        }
        res.status(200).json({
            success: true,
            message: "event data found",
            data: event
        });

    } catch (error) {
        return next(new HttpError("not event data found", 404));
    }
};

const deleteEvent = async (req, res, next) => {

    try {

        const { id } = req.params;

        const deleteEvent = await Event.findByIdDelete(id);

        if (!deleteEvent) {
            return next(new HttpError("event id not found", 404));
        }

        const filesToDelete = [

            ...deleteEvent.eventImages,

            deleteEvent.eventposter,

            deleteEvent.eventBannars,

            ...deleteEvent.eventspeaker,

            deleteEvent.eventDocuments

        ];

        filesToDelete.forEach((file) => {

            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }

        });

        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {

        console.log(error);

        return next(
            new HttpError("Deleted data not found", 404)
        );
    }
};

const UpdateEvent = async(req,res,next)=>{
    try{

        const {id} = req.params;

        const event = await Event.findById(id);

        if(!event){
            return next (new HttpError("no update event id found",404));
        }

        const updates = Object.keys(req.body);

        const allowedFields = [
            "eventname",
            "eventDate",
            "eventdescription",
            "eventVanue",
            "eventprice"
        ];

        const isValidUpdates = updates.every((field)=>allowedFields.includes(field));

        if(!isValidUpdates){
            return next(new HttpError("not updatedet data",404));
        }

        if(req.files?.eventImages){
            event.eventImages?.forEach((file)=>{
                if(fs.existsSync(file)){
                  fs.unlinkSync(file);
                }
            });

            event.eventImages = req.files?.eventImages?.map((file)=>file.path);
            event.eventposter = req.files?.eventposter[0]?.path || event.eventposter;
            event.eventBannars = req.files?.eventBannars[0]?.path || event.eventBannars;
            event.eventspeaker = req.files?.eventspeaker?.map((file)=> file.path) || event.eventspeaker;
            event.eventDocuments = req.files?.eventDocuments[0]?.path || event.eventDocuments;
        }

        updates.forEach((updates)=> event[updates] = req.body[updates]); // text field update thay to 

        await event.save();

        res.status(200).json({
            success:true,
            message:"update successFully",
            event
        });
    }catch(error){
       return next (new HttpError("update not found",404));
    }
};

export default { Create, getAllEvent, getById, deleteEvent , UpdateEvent };