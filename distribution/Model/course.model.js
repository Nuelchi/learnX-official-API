"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const courseSchema = new mongoose_1.Schema({
    week: {
        type: Number,
        default: 1
    },
    title: {
        type: String,
        required: [true, 'Please enter the title of the book'],
        trim: true // Removes extra spaces
    },
    image: {
        type: String,
        required: [true, 'please enter the author']
    },
    category: {
        type: String,
        enum: ['backend', 'frontend', 'product design', 'data analysis'],
        required: [true, 'please enter the category of the course'],
        lowercase: true
    },
    type: {
        type: String,
        enum: ['Video', 'Book'],
        required: [true, 'please enter the type of the course']
    },
    weeklyTask: {
        type: String,
        required: [true, 'please enter the weekly task']
    },
    Link: {
        type: String,
        required: [true, 'please enter the course or book upload url']
    },
});
exports.default = mongoose_1.default.model("course", courseSchema);
