import Event from "../modal/event.js";
import HttpError from "../middleware/HttpError.js";

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

        console.log(error)
        return next(new HttpError("not added event ",500));
    }

};

export default { Create };