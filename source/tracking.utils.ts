import cron from "node-cron";
import Tracking from "./Model/tracking.model"; // Import your tracking model

// Update completed hours every hour
cron.schedule("0 * * * *", async () => {
    try {
        await Tracking.updateMany({}, { $inc: { completedHours: 1 } });
        console.log(" Completed hours updated for all students!");
    } catch (error) {
        console.error(" Error updating completed hours:", error);
    }
});

// Increment current week every Sunday at midnight
cron.schedule("0 0 * * 0", async () => {
    try {
        await Tracking.updateMany({}, { $inc: { currentWeek: 1 } });
        console.log("✅ Current week incremented for all students!");
    } catch (error) {
        console.error(" Error updating current week:", error);
    }
});