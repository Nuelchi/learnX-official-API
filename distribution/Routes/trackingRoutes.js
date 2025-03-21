"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trackingController_1 = require("../Controllers/trackingController");
const router = (0, express_1.Router)();
const trackingController = new trackingController_1.TrackingController();
// Route to get all tracking details
router.get("/allTracking", trackingController.getAllTrackingDetails);
router.get("/oneTrack", trackingController.getOneTrack);
exports.default = router;
