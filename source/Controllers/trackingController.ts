import { Request, Response } from "express";
import { TrackingService } from "../Services/trackingService";

const trackingService = new TrackingService();

export class TrackingController {
    //  Get all tracking details
    async getAllTrackingDetails(req: Request, res: Response): Promise<void> {
        try {
            const trackingDetails = await trackingService.getAllTrackingDetails();
            res.status(200).json({ message: "Tracking details retrieved successfully!", trackingDetails });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    //  Get tracking details for a specific user by email
    // async getUserTracking(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { email } = req.params;

    //         if (!email) {
    //             res.status(400).json({ message: "Email is required." });
    //             return;
    //         }

    //         const userTracking = await trackingService.getUserTracking(email);
    //         res.status(200).json({ message: "User tracking retrieved successfully!", userTracking });
    //     } catch (error: any) {
    //         res.status(400).json({ message: error.message });
    //     }
    // }
}