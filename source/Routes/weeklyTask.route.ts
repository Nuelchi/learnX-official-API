import { Router } from "express";
import { WeeklyTaskController } from "../Controllers/weeklyTask.controller";
import { Authorization } from "../Authorization/auth.middleware";

const router = Router();
const weeklyTaskController = new WeeklyTaskController();
const { authUser, restriction } = new Authorization();

// Route to submit a task (protected)
router.post("/SubmitTask", weeklyTaskController.submitTask);

//  Route to get all submitted tasks for a user 
router.get("/gradeTask", restriction("admin"), weeklyTaskController.getUserTasks);

export default router;