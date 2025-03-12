import mongoose, { model, Schema } from "mongoose";
import { IcourseEnroll } from "../Interface/courseEnroll.interface";
import validator from "validator";

const courseEnrollSchema = new Schema<IcourseEnroll>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    track: {
        type: String,
        enum:['backend', 'frontend','product design', 'data analysis'],
        required: [true, 'please enter course track'],
        lowercase: true
    },
});

export const CourseEnrollModel = model<IcourseEnroll>("CourseEnroll", courseEnrollSchema);