import { Router } from "express";
import { TrackingController } from "../Controllers/trackingController";

const router = Router();
const trackingController = new TrackingController();

// Route to get all tracking details
router.get("/allTracking", trackingController.getAllTrackingDetails);


export default router;