import express from "express";
import eventController from "../controller/eventController.js";
import uploads from "../middleware/multer.js";

const router = express.Router();

router.post("/Create", uploads.fields([
    {
        name: "eventImages",
        maxCount: 5
    },
    {
        name: "eventposter",
        maxCount: 1
    },
    {
        name: "eventBannars",
        maxCount: 1
    },
    {
        name: "eventspeaker",
        maxCount: 3
    },
    {
        name: "eventDocuments",
        maxCount: 3
    },

]),


    eventController.Create

);

router.get("/getAllEvent", eventController.getAllEvent);

router.get("/getById/:id", eventController.getById);

router.put("/UpdateEvent/:id", uploads.fields([
    {
        name: "eventImages",
        maxCount: 5
    },
    {
        name: "eventposter",
        maxCount: 1
    },
    {
        name: "eventBannars",
        maxCount: 1
    },
    {
        name: "eventspeaker",
        maxCount: 3
    },
    {
        name: "eventDocuments",
        maxCount: 3
    },

]),


    eventController.UpdateEvent

);

router.delete("/deleteEvent/:id", eventController.deleteEvent);

export default router;