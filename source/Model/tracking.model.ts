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

const Tracking =  mongoose.model("tracking", trackingSchema);

// Function to update currentWeek every Sunday
const updateCurrentWeek = async () => {
    await Tracking.updateMany({}, { $inc: { currentWeek: 1 } });
    console.log("Updated current week for all enrolled users.");
};

// Schedule the update to run every Sunday at midnight
const scheduleUpdateCurrentWeek = () => {
    const now = new Date();
    const nextSunday = new Date(now);
    nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7)); // Move to next Sunday
    nextSunday.setHours(0, 0, 0, 0); // Set to midnight

    const timeUntilNextSunday = nextSunday.getTime() - now.getTime(); // Time difference

    setTimeout(async () => {
        await updateCurrentWeek();
        console.log("Updated current week on Sunday at midnight.");
        scheduleUpdateCurrentWeek(); // Reschedule after execution
    }, timeUntilNextSunday);
};


const updateCompletedHours = async () => {
    await Tracking.updateMany ({}, {$inc: {completedHours: 1 }});
    console.log("Updated completed hours for all enrollled Users");
};

setInterval(updateCompletedHours, 24 * 60 * 60 * 1000);
scheduleUpdateCurrentWeek()

export default Tracking;