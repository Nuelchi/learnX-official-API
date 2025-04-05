import cron from "node-cron";
import Tracking from "../Model/tracking.model";

// Increment `currentWeek` every Sunday
cron.schedule("0 0 * * 0", async () => {
  await Tracking.updateMany({}, { $inc: { currentWeek: 1 } });
});

// Increment `completedHours` every hour
cron.schedule("0 * * * *", async () => {
  await Tracking.updateMany({}, { $inc: { completedHours: 1 } });
});