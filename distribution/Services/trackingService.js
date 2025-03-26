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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingService = void 0;
const tracking_model_1 = __importDefault(require("../Model/tracking.model"));
class TrackingService {
    // Get all tracking details
    getAllTrackingDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            const trackingDetails = yield tracking_model_1.default.find();
            if (!trackingDetails.length) {
                throw new Error("No tracking details found.");
            }
            return trackingDetails;
        });
    }
    //  Get tracking details for a specific track by track name
    getOneTrack(track) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = track ? { track: { $regex: new RegExp(track, "i") } } : {};
            return yield tracking_model_1.default.find(query);
        });
    }
    // Get tracking details for a specific user by email
    getUserTracking(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTracking = yield tracking_model_1.default.findOne({ email });
            if (!userTracking) {
                throw new Error("Tracking details not found for this user.");
            }
            return userTracking;
        });
    }
}
exports.TrackingService = TrackingService;
