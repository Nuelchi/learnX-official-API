import mongoose, { model, Schema } from "mongoose";
import { Itracking } from "../Interface/tracking.interface";

const trackingSchema = new Schema<Itracking>({
    studentId: {
        type: Schema.Types.ObjectId, 
        ref: "user",
        required: true,
    },
    firstname: {
        type: String,
        required: true,
        unique: true,
    },
    lastname: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    track: {
        type: String,
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
    },
    currentWeek: {
        type: Number,
        default: 1,
    },
    completedHours: {
        type: Number,
        default: 0
    }

});

export default mongoose.model("tracking", trackingSchema);