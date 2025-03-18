import { Itracking } from "../Interface/tracking.interface";
import trackingModel from "../Model/tracking.model";

export class TrackingService {
    // Get all tracking details
    async getAllTrackingDetails() {
        const trackingDetails = await trackingModel.find();
        if (!trackingDetails.length) {
            throw new Error("No tracking details found.");
        }
        return trackingDetails;
    }

    //  Get tracking details for a specific track by track name
    async getOneTrack(track?: string): Promise<Itracking[]> {
        const query = track ? { track: { $regex: new RegExp(track, "i") } } : {};
        return await trackingModel.find(query);
    }

        //  Get tracking details for a specific user by email
    // async getUserTracking(email: string) {
    //     const userTracking = await trackingModel.findOne({ email });

    //     if (!userTracking) {
    //         throw new Error("Tracking details not found for this user.");
    //     }

    //     return userTracking;
    // }
}