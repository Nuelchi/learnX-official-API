import { Request, Response } from "express";
import { WeeklyTaskService } from "../Services/weeklyTask.service";

const weeklyTaskService = new WeeklyTaskService();

export class WeeklyTaskController {
    // ✅ Submit a new task
    async submitTask(req: Request, res: Response): Promise<void> {
        try {
            const { email, taskWeek, taskURL } = req.body;
            if (!email || !taskWeek || !taskURL) {
                res.status(400).json({ message: "Email, taskWeek, and taskURL are required." });
                return;
            }

            const task = await weeklyTaskService.addTask(email, { taskWeek, taskURL });

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