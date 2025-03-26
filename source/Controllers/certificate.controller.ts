import { Request, Response } from "express";
import { certificateService } from "../Services/certificate.service";
import trackingModel from "../Model/tracking.model";
import courseModel from "../Model/course.model";

const certService = new certificateService();

export class certificateController {
    // Add a new certificate
    async addCertificate(req: Request, res: Response): Promise<void> {
        try {
            const certData = req.body;
            const certificate = await certService.addCertificate(certData);
            res.status(201).json({ message: "Certificate added successfully!", certificate });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }


    // Get certificates for a logged-in user
    async getCertForUser(req: Request, res: Response): Promise<void> {
        try {
            const user = (req as any).user; 
            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }
            const email = user.email
            const userData = await trackingModel.findOne({email});
            if (!userData){
                res.status(404).json({ message: "Tracking error: user not tracked" });
                return;
            }
            const track = userData.track
            const totalCourse = await courseModel.countDocuments({category: track})
            const RemCourse: number = Number(userData.currentWeek);
            // const RemainingCourse = Math.max(totalCourse - RemCourse, 0)

            const certificates = await certService.getCertForUser(user.email);

            if (certificates.length === 0) {
                res.status(404).json({ message: "No certificates found for this user.", totalCourse, RemCourse });
                return;
            }

            res.status(200).json({ message: "Certificates retrieved successfully.", certificates,totalCourse, RemCourse});
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}