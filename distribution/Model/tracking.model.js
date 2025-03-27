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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const trackingSchema = new mongoose_1.Schema({
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    track: {
        type: String,
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
    },
    currentWeek: {
        type: Number,
        default: 1,
    },
    completedHours: {
        type: Number,
        default: 0
    }
});
const Tracking = mongoose_1.default.model("tracking", trackingSchema);
// Function to update currentWeek every Sunday
const updateCurrentWeek = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield Tracking.countDocuments();
    if (count > 0) {
        yield Tracking.updateMany({}, { $inc: { currentWeek: 1 } });
        console.log("Updated current week for all enrolled users.");
    }
    else {
        console.log("No tracking records found.");
    }
});
// Function to update completed hours daily
const updateCompletedHours = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield Tracking.countDocuments();
    if (count > 0) {
        yield Tracking.updateMany({}, { $inc: { completedHours: 1 } });
        console.log("Updated completed hours for all enrolled users.");
    }
    else {
        console.log("No tracking records found.");
    }
});
// Run updates immediately on startup
setImmediate(updateCompletedHours);
setImmediate(updateCurrentWeek);
// Run updates at a set interval
setInterval(updateCompletedHours, 24 * 60 * 60 * 1000); // Every 24 hours
setInterval(updateCurrentWeek, 7 * 24 * 60 * 60 * 1000); // Every 7 days
exports.default = Tracking;
