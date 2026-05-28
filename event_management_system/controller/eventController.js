import Event from "../modal/event.js";
import HttpError from "../middleware/HttpError.js";
import fs from "fs";


const Create = async (req, res, next) => {
    try {
        const { eventname, eventDate, eventdescription, eventVanue, eventprice } = req.body;

        const eventImages = req.files?.eventImages?.map((file) => file.path || null);

        const eventposter = req.files?.eventposter?.[0].path || null;

        const eventBannars = req.files?.eventBannars?.[0].path || null;

        const eventspeaker = req.files?.eventspeaker?.map((file) => file.path || null);

        const eventDocuments = req.files?.eventDocuments?.[0]?.path || null;

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

        const deleteEvent = await Event.findById(id);

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

        const deleteByIdeEvent = await Event.findByIdAndDelete(id);

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

export default { Create, getAllEvent, getById, deleteEvent };