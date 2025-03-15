import mongoose, { model, Schema } from "mongoose";
import { Itask } from "../Interface/weeklyTask.interface";

const weeklTaskSchema = new Schema<Itask>({
    email: {
        type: String,
    },
    taskWeek: {
        type: Number,
    },
    taskURL: {
        type: String,
    },
});

export default mongoose.model("weeklyTasks", weeklTaskSchema);