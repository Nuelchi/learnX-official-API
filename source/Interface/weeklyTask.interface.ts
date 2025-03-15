import mongoose from "mongoose";

export interface Itask {
    email: String,
    taskWeek: Number;
    taskURL: string,
}