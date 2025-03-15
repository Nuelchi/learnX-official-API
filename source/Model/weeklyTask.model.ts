import mongoose, { Schema } from "mongoose";
import { Itask } from "../Interface/weeklyTask.interface";

const weeklyTaskSchema = new Schema<Itask>({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "user",
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