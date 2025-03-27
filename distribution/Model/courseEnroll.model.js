"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseEnrollModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const courseEnrollSchema = new mongoose_1.Schema({
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
        validate: [validator_1.default.isEmail, 'Please enter a valid email address'],
    },
    yearofbirth: {
        type: Date,
        unique: false,
        required: true
    },
    dayofbirth: {
        type: Date,
        unique: false,
        required: true
    },
    monthofbirth: {
        type: Date,
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
