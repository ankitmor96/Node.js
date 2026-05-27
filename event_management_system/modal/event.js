import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    eventname: {
        type: String,
        required: true,
        trim: true
    },
     evenDate: {
        type: Date,
        required: true
    },
    eventdescription: {
        type: String,
        required: true
    },
    eventImages: {
        type: [String],
        required: true
    },
    eventposter: {
        type: String,
        required: true
    },
    eventBannars: {
        type: String
    },
    eventVanue: {
        type: String,
        required: true
    },
    eventspeker:{
        type:String,
        required:true
    },
    eventprice: {
        type: Number,
        required: true
    },
    eventDocuments: {
        type: String
    }

},
    {
        timestamps: true,
    }

);

const Event = mongoose.model("Event", EventSchema);

export default Event;