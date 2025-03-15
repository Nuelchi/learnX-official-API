import { Router } from "express";
import { TrackingController } from "../Controllers/trackingController";

const router = Router();
const trackingController = new TrackingController();

// Route to get all tracking details
router.get("/allTracking", trackingController.getAllTrackingDetails);

// Route to get tracking details for a specific user
router.get("/userTracking/:email", trackingController.getUserTracking);

export default router;