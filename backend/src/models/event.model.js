import mongoose,{Schema} from "mongoose";


const eventSchema = new mongoose.Schema(
    {
        eventName:{
            type: String,
            required: true,
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime:{
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        completedDuration:{
            type: Number,
            default: 0,
        },
        eventType:{
            type:String,
            required: true
        },
        eventOwner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

export const Event = mongoose.model("Event",eventSchema);