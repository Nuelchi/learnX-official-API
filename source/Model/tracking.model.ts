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

// Function to update currentWeek every Sunday at midnight
const updateCurrentWeek = async () => {
    const now = new Date();
    if (now.getDay() === 0) { // Sunday
        const count = await Tracking.countDocuments();
        if (count > 0) {
            await Tracking.updateMany({}, { $inc: { currentWeek: 1 } });
            console.log(`Updated current week for all enrolled users on ${now}`);
        } else {
            console.log("No tracking records found.");
        }
    }
};

// Function to update completed hours 
const updateCompletedHours = async () => {
    const count = await Tracking.countDocuments();
    if (count > 0) {
        await Tracking.updateMany({}, { $inc: { completedHours: 1 } });
        console.log(`Updated completed hours for all enrolled users on ${new Date()}`);
    } else {
        console.log("No tracking records found.");
    }
};

// Schedule function to run at midnight
const scheduleMidnightTask = (task: Function, intervalInDays: number) => {
    const now = new Date();
    const nextRun = new Date();
    nextRun.setDate(now.getDate() + intervalInDays);
    nextRun.setHours(0, 0, 0, 0);

    const timeUntilNextRun = nextRun.getTime() - now.getTime();
    setTimeout(() => {
        task(); // Run the task
        setInterval(task, intervalInDays * 24 * 60 * 60 * 1000); // Run at the specified interval
    }, timeUntilNextRun);
};

// Run update functions at midnight
setInterval(updateCompletedHours, 60 * 60 * 1000); // Every 60 minutes
scheduleMidnightTask(updateCurrentWeek, 7); // Every 7 days (on Sunday)

export default Tracking;