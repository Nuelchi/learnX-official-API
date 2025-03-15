import { Icertificate } from "../Interface/certificate.interface";
import certificateModel from "../Model/certificate.model";


export class certificateService {
    // Add a new course
    async addCertificate(certData: Icertificate): Promise<Icertificate> {
        return await certificateModel.create(certData);
    }

    // Get certificates for a specific user by email
    async getCertForUser(email: string): Promise<Icertificate[]> {
        try {
            const certificates = await certificateModel.find({ email });
            return certificates;
        } catch (error: any) {
            throw new Error(`Failed to fetch certificates: ${error.message}`);
        }
    }
};
