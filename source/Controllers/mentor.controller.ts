import { Request, Response } from "express";
import {mentorService} from "../Services/mentor.service";

const mentorservice = new mentorService();

export class mentorController {
    async addMentor (req: Request, res: Response): Promise<void> {
        try {
            const mentor = await mentorservice.addMentor(req.body);
            res.status(201).json({ message: "Mentor added successfully!", mentor });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getMentors(req: Request, res: Response): Promise<void> {
        try {
            const mentors = await mentorservice.getAllMentor();

            // If no users are found, return a message
            if (!mentors || mentors.length === 0) {
                res.status(404).json({ message: "No mentors in Db yet" });
                return;
            }
            // Send the products in the response if they exist
            res.status(200).json({ message: "mentors fetched successfully", mentors });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
    }
