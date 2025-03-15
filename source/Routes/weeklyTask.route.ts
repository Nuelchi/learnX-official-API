import { Router } from "express";
import { weeklyTaskController } from "../Controllers/weeklyTask.controller";

const  {submitTask} = new weeklyTaskController;
const router = Router();

router.post("/SubmitTask", submitTask);

export default router