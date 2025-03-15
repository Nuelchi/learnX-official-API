import cron from "node-cron";
import TrackingModel from "./Model/tracking.model";

const updateCurrentWeek = async () => {
    try {
        await TrackingModel.updateMany({}, { $inc: { currentWeek: 1 } });
        console.log(" Weekly course progress updated!");
    } catch (error) {
        console.error(" Failed to update currentWeek:", error);
    }
};

// Run every Sunday at midnight (00:00)
cron.schedule("0 0 * * 0", () => {
    console.log("⏳ Running scheduled job to update currentWeek...");
    updateCurrentWeek();
});