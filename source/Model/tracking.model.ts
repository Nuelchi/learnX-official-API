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
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
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

const Tracking = mongoose.model("tracking", trackingSchema);

// Function to update currentWeek every Sunday
const updateCurrentWeek = async () => {
    const count = await Tracking.countDocuments();
    if (count > 0) {
        await Tracking.updateMany({}, { $inc: { currentWeek: 1 } });
        console.log("Updated current week for all enrolled users.");
    } else {
        console.log("No tracking records found.");
    }
};

// Function to update completed hours daily
const updateCompletedHours = async () => {
    const count = await Tracking.countDocuments();
    if (count > 0) {
        await Tracking.updateMany({}, { $inc: { completedHours: 1 } });
        console.log("Updated completed hours for all enrolled users.");
    } else {
        console.log("No tracking records found.");
    }
};

// Run updates immediately on startup
setImmediate(updateCompletedHours);
setImmediate(updateCurrentWeek);

// Run updates at a set interval
setInterval(updateCompletedHours, 24 * 60 * 60 * 1000); // Every 24 hours
setInterval(updateCurrentWeek, 7 * 24 * 60 * 60 * 1000); // Every 7 days

export default Tracking;