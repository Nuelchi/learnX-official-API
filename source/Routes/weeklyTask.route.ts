import { Router } from "express";
import { WeeklyTaskController } from "../Controllers/weeklyTask.controller";

const router = Router();
const weeklyTaskController = new WeeklyTaskController();

// Route to submit a task (No auth required)
router.post("/submitTask", weeklyTaskController.submitTask);

//  Route to get all submitted tasks
router.get("/gradeTask", weeklyTaskController.getAllTasks);


export default router;