import { Request, Response } from "express";
import { weeklyTaskService } from "../Services/weeklyTask.service";
import weeklyTaskModel from "../Model/weeklyTask.model";

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

    // Get all submitted tasks for a user
    async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await weeklyTaskModel.find(); // Get all tasks from DB
            res.status(200).json({ message: "All tasks retrieved successfully!", tasks });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
};