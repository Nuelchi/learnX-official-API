import mongoose from "mongoose";

export interface Itask {
    studentId: mongoose.Types.ObjectId
    taskWeek: Number;
    taskURL: string,
}