import { Request, Response } from "express";
import { certificateService } from "../Services/certificate.service";
import certificateModel from "../Model/certificate.model";

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

            const certificates = await certService.getCertForUser(user.email);

            if (certificates.length === 0) {
                res.status(404).json({ message: "No certificates found for this user." });
                return;
            }

            res.status(200).json({ message: "Certificates retrieved successfully.", certificates });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}