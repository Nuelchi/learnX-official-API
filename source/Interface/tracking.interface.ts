import mongoose from "mongoose";

export interface Itracking {
    studentId: mongoose.Types.ObjectId;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    track: String;
    enrollmentDate :Number;
    currentWeek: number;
    completedHours: Number;
    
}