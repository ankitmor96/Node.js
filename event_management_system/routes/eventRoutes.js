import express from "express";
import eventController from "../controller/eventController.js";
import uploads from "../middleware/multer.js";

const router = express.Router();

router.post("/Create", uploads.fields([
    {
        name: "eventImages",
        mexCount: 5
    },
    {
        name: "eventposter",
        mexCount: 1
    },
    {
        name: "eventBannars",
        mexCount: 1
    },
    {
        name: "eventspeaker",
        mexCount: 3
    },
    {
        name: "eventDocuments",
        mexCount: 3
    },

]),


    eventController.Create

);

router.get("/getAllEvent", eventController.getAllEvent);

router.get("/getById/:id", eventController.getById);

router.delete("/deleteEvent/:id", eventController.deleteEvent);

export default router;