import mongoose, { Schema } from "mongoose";
import { Itask } from "../Interface/weeklyTask.interface";

const taskSchema = new Schema({
    taskWeek: {
        type: Number,
        required: true,
    },
    taskURL: {
        type: String,
        required: true,
    },
});

const weeklyTaskSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure only one entry per email
    },
    tasks: [taskSchema], // Store multiple tasks in an array
}, { timestamps: true });

export default mongoose.model("WeeklyTask", weeklyTaskSchema);