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


//update completed hours
const updateCompletedHours = async () => {
    try {
        const now = new Date();

        // Update the completedHours for each enrolled student
        const updates = await TrackingModel.updateMany(
            {}, 
            [
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
            ]
        );

        console.log("⏳ User enrollment hours updated successfully!");
    } catch (error) {
        console.error(" Failed to update completedHours:", error);
    }
};

// Schedule job to run every hour
cron.schedule("0 * * * *", () => {
    console.log("🔄 Running scheduled job to update user completed hours...");
    updateCompletedHours();
});