import mongoose, { model, Schema } from "mongoose";
import { Itracking } from "../Interface/tracking.interface";

const trackingSchema = new Schema<Itracking>({
    studentId: {
        type: Schema.Types.ObjectId, 
        ref: "user",
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
    },
    currentWeek: {
        type: Number,
        default: 1,
    },
    usertrack: {
        type: String,
    },
});

export default mongoose.model("tracking", trackingSchema);