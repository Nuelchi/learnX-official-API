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
    yearofbirth: {
        type: Number,
        unique: false,
        required: true
    },
    dayofbirth: {
        type: Number,
        unique: false,
        required: true
    },
    monthofbirth: {
        type: Number,
        unique: false,
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
        enum:['backend', 'frontend','product-design', 'data-analysis', "artificial-intelligence"],
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