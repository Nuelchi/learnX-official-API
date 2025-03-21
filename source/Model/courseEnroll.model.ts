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
    dateofbirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: [true, 'Please enter a your phone number']

    },
    track: {
        type: String,
        required: true,
        unique: [true, 'Please enter your track']

    },
    address: {
        type: String,
        required: [true, 'please enter course track'],
        lowercase: true
    },
});

export const CourseEnrollModel = model<IcourseEnroll>("Enrollment", courseEnrollSchema);