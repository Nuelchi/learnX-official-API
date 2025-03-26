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


    async getOneTrack(req: Request, res: Response): Promise<void> {
        try {
            const { track } = req.query;
            const trackData = track
                ? await trackingService.getOneTrack(track as string)
                : await trackingService.getOneTrack(); // Fetch all courses if no title is provided

            if (!trackData.length) {
                res.status(404).json({ message: "No courses found" });
                return;
            }

            res.status(200).json(trackData);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    //track for a user
    async getUserTrack(req: Request, res: Response): Promise<void> {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }
            const email = user.email;
            const trackData = await trackingService.getUserTracking( email )

            if (!trackData) {
                res.status(404).json({ message: "No records found for user" });
                return;
            }

            res.status(200).json(trackData);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }};