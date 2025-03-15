import mongoose, { Schema } from "mongoose";
import { Itask } from "../Interface/weeklyTask.interface";

const weeklyTaskSchema = new Schema<Itask>({
    email: {
        type: String,
        required: true,
    },
    taskWeek: {
        type: Number,
        required: true,
    },
    taskURL: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("WeeklyTask", weeklyTaskSchema);