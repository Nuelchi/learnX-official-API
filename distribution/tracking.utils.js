"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const tracking_model_1 = __importDefault(require("./Model/tracking.model")); // Ensure correct path
/**
 * ✅ Update currentWeek every Sunday at midnight
 */
const updateCurrentWeek = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("⏳ Running scheduled job to update currentWeek...");
        // Increment `currentWeek` for all users
        const result = yield tracking_model_1.default.updateMany({}, { $inc: { currentWeek: 1 } });
        console.log(`✅ Current week updated for ${result.modifiedCount} users.`);
    }
    catch (error) {
        console.error("Error updating current week:", error);
    }
});
// Schedule job to run every Sunday at midnight
node_cron_1.default.schedule("0 0 * * 0", () => {
    updateCurrentWeek();
});
/**
 * ✅ Update completedHours every hour
 */
const updateCompletedHours = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("⏳ Running scheduled job to update user completed hours...");
        const updates = yield tracking_model_1.default.updateMany({ enrollmentDate: { $exists: true, $ne: null } }, // Ensure enrollmentDate exists
        [
            {
                $set: {
                    completedHours: {
                        $divide: [
                            { $subtract: [new Date(), "$enrollmentDate"] },
                            1000 * 60 * 60 // Convert milliseconds to hours
                        ]
                    }
                }
            }
        ]);
        console.log(`✅ Completed Hours Updated for ${updates.modifiedCount} users.`);
    }
    catch (error) {
        console.error("❌ Failed to update completedHours:", error);
    }
});
// Schedule job to run every hour
node_cron_1.default.schedule("0 * * * *", () => {
    updateCompletedHours();
});
/**
 * ✅ Debugging: Ensure cron jobs are scheduled
 */
console.log("✅ Cron jobs for `currentWeek` and `completedHours` have been scheduled.");
