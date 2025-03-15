import { Request, Response } from "express";
import { WeeklyTaskService } from "../Services/weeklyTask.service";

const weeklyTaskService = new WeeklyTaskService();

export class WeeklyTaskController {
    //  Submit a new task (Fetches currentWeek from trackingModel)
    async submitTask(req: Request, res: Response): Promise<void> {
        try {
            const { email, taskWeek, taskURL } = req.body;

            if (!email || !taskWeek || !taskURL) {
                res.status(400).json({ message: "Missing required fields: email, taskWeek, or taskURL." });
                return;
            }

            const task = await weeklyTaskService.addTask({ email, taskWeek, taskURL });

            res.status(201).json({ message: "Task submitted successfully!", task });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    //  Get all submitted tasks
    async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await weeklyTaskService.getAllTasks();
            res.status(200).json({ message: "All tasks retrieved successfully!", tasks });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get tasks for a specific user (using email)
    // async getUserTasks(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { email } = req.query;

    //         if (!email) {
    //             res.status(400).json({ message: "Email is required to fetch tasks." });
    //             return;
    //         }

    //         const tasks = await weeklyTaskService.getUserTasks(email as string);
    //         res.status(200).json({ message: "User tasks retrieved successfully!", tasks });
    //     } catch (error: any) {
    //         res.status(400).json({ message: error.message });
    //     }
    // }
}