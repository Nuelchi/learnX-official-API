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
const tracking_model_1 = __importDefault(require("./Model/tracking.model"));
const updateCurrentWeek = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tracking_model_1.default.updateMany({}, { $inc: { currentWeek: 1 } });
        console.log(" Weekly course progress updated!");
    }
    catch (error) {
        console.error(" Failed to update currentWeek:", error);
    }
});
// Run every Sunday at midnight (00:00)
node_cron_1.default.schedule("0 0 * * 0", () => {
    console.log("⏳ Running scheduled job to update currentWeek...");
    updateCurrentWeek();
});
//update completed hours
const updateCompletedHours = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = new Date();
        // Update the completedHours for each enrolled student
        const updates = yield tracking_model_1.default.updateMany({}, [
            {
                $set: {
                    completedHours: {
                        $divide: [
                            { $subtract: [now, "$enrollmentDate"] },
                            1000 * 60 * 60 // Convert milliseconds to hours
                        ]
                    }
                }
            }
        ]);
        console.log("⏳ User enrollment hours updated successfully!");
    }
    catch (error) {
        console.error(" Failed to update completedHours:", error);
    }
});
// Schedule job to run every hour
node_cron_1.default.schedule("0 * * * *", () => {
    console.log("🔄 Running scheduled job to update user completed hours...");
    updateCompletedHours();
});
