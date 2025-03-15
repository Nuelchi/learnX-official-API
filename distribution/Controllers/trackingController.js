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
    // ✅ Get all tracking details
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
    // ✅ Get tracking details for a specific user by email
    getUserTracking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                if (!email) {
                    res.status(400).json({ message: "Email is required." });
                    return;
                }
                const userTracking = yield trackingService.getUserTracking(email);
                res.status(200).json({ message: "User tracking retrieved successfully!", userTracking });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.TrackingController = TrackingController;
