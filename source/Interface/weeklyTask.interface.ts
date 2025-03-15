import mongoose, { Schema, Document } from "mongoose";

interface ITaskItem {
    taskWeek: number;
    taskURL: string;
}

export interface Itask extends Document {
    email: string;
    tasks: ITaskItem[];
}

const WeeklyTaskSchema = new Schema<Itask>(
    {
        email: {
            type: String,
            required: true,
            unique: true, // Ensure one document per email
        },
        tasks: [
            {
                taskWeek: {
                    type: Number,
                    required: true,
                },
                taskURL: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model<Itask>("WeeklyTask", WeeklyTaskSchema);