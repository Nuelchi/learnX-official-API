import { Request, Response } from "express";
import { weeklyTaskService } from "../Services/weeklyTask.service";
const weeklyTask = new weeklyTaskService();

export class weeklyTaskController {
    // Add a new course
    async submitTask(req: Request, res: Response): Promise<void> {
        try {
            const Task = await weeklyTask.addTask(req.body);
            res.status(201).json({ message: "Task submitted successfully!", Task });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
};