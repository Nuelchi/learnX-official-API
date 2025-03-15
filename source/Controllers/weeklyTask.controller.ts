import { Request, Response } from "express";
import { WeeklyTaskService } from "../Services/weeklyTask.service";

const weeklyTaskService = new WeeklyTaskService();

export class WeeklyTaskController {
    // ✅ Submit a new task (Uses `(req as any).user.id`)
    async submitTask(req: Request, res: Response): Promise<void> {
        try {
            const user = (req as any).user; // Extract authenticated user
            if (!user || !user.id) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }

            const { taskWeek, taskURL } = req.body;
            const task = await weeklyTaskService.addTask(user.id, { taskWeek, taskURL });

            res.status(201).json({ message: "Task submitted successfully!", task });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // ✅ Get all submitted tasks
    async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await weeklyTaskService.getAllTasks();
            res.status(200).json({ message: "All tasks retrieved successfully!", tasks });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

}