import cron from "node-cron";
import TrackingModel from "./Model/tracking.model"; // Ensure correct path
import mongoose from "mongoose";

/**
 * ✅ Update currentWeek every Sunday at midnight
 */
const updateCurrentWeek = async () => {
    try {
        console.log("⏳ Running scheduled job to update currentWeek...");

        // Increment `currentWeek` for all users
        const result = await TrackingModel.updateMany({}, { $inc: { currentWeek: 1 } });

        console.log(`✅ Current week updated for ${result.modifiedCount} users.`);
    } catch (error) {
        console.error("❌ Error updating current week:", error);
    }
};

// Schedule job to run every Sunday at midnight
cron.schedule("0 0 * * 0", () => {
    updateCurrentWeek();
});


/**
 * ✅ Update completedHours every hour
 */
const updateCompletedHours = async () => {
    try {
        console.log("⏳ Running scheduled job to update user completed hours...");

        const updates = await TrackingModel.updateMany(
            { enrollmentDate: { $exists: true, $ne: null } }, // Ensure enrollmentDate exists
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
            ]
        );

        console.log(`✅ Completed Hours Updated for ${updates.modifiedCount} users.`);
    } catch (error) {
        console.error("❌ Failed to update completedHours:", error);
    }
};

// Schedule job to run every hour
cron.schedule("0 * * * *", () => {
    updateCompletedHours();
});

/**
 * ✅ Debugging: Ensure cron jobs are scheduled
 */
console.log("✅ Cron jobs for `currentWeek` and `completedHours` have been scheduled.");