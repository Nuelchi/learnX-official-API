import { Request, Response } from "express";
import { weeklyTaskService } from "../Services/weeklyTask.service";

const WeeklyTaskService = new weeklyTaskService();

export class WeeklyTaskController {
    // Submit a new task
    async submitTask(req: Request, res: Response): Promise<void> {
        try {
            const task = await WeeklyTaskService.addTask(req.body);
            res.status(201).json({ message: "Task submitted successfully!", task });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Get submitted tasks for a user
    async getUserTasks(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.params;
            const tasks = await WeeklyTaskService.getSubmittedTasks(email);
            res.status(200).json({ message: "Tasks retrieved successfully!", tasks });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }
}