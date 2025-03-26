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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingController = void 0;
const trackingService_1 = require("../Services/trackingService");
const trackingService = new trackingService_1.TrackingService();
class TrackingController {
    //  Get all tracking details
    getAllTrackingDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trackingDetails = yield trackingService.getAllTrackingDetails();
                res.status(200).json({ message: "Tracking details retrieved successfully!", trackingDetails });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getOneTrack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { track } = req.query;
                const trackData = track
                    ? yield trackingService.getOneTrack(track)
                    : yield trackingService.getOneTrack(); // Fetch all courses if no title is provided
                if (!trackData.length) {
                    res.status(404).json({ message: "No courses found" });
                    return;
                }
                res.status(200).json(trackData);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    //track for a user
    getUserTrack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(401).json({ message: "Unauthorized. User not found." });
                    return;
                }
                const email = user.email;
                const trackData = yield trackingService.getUserTracking(email);
                if (!trackData) {
                    res.status(404).json({ message: "No records found for user" });
                    return;
                }
                res.status(200).json(trackData);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.TrackingController = TrackingController;
;
