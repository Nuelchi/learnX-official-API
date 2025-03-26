import { Router } from "express";
import { TrackingController } from "../Controllers/trackingController";
import { Authorization } from "../Authorization/auth.middleware";

const {authUser, payAuth} = new Authorization

const router = Router();
const trackingController = new TrackingController();

// Route to get all tracking details
router.get("/allTracking", trackingController.getAllTrackingDetails);
router.get("/oneTrack", trackingController.getOneTrack);
router.get("/userTrack", authUser, trackingController.getUserTrack);


export default router;