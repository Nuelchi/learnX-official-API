"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseEnrollModel = void 0;
const mongoose_1 = require("mongoose");
const courseEnrollSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    yearofbirth: {
        type: Date,
        required: true
    },
    dayofbirth: {
        type: Date,
        required: true
    },
    monthofbirth: {
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
        enum: ['backend', 'frontend', 'product-design', 'data-analysis', "artificial-intelligence"],
        required: true,
        unique: [true, 'Please enter your track']
    },
    address: {
        type: String,
        required: [true, 'please enter course track'],
        lowercase: true
    },
});
exports.CourseEnrollModel = (0, mongoose_1.model)("Enrollment", courseEnrollSchema);
