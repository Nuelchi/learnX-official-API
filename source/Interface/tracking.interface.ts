import mongoose from "mongoose";

export interface Itracking {
    studentId: mongoose.Types.ObjectId;
    email: string;
    enrollmentDate :Number;
    currentWeek: Number;
    usertrack: String;
}