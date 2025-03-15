"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weeklyTask_controller_1 = require("../Controllers/weeklyTask.controller");
const router = (0, express_1.Router)();
const weeklyTaskController = new weeklyTask_controller_1.WeeklyTaskController();
// Route to submit a task (No auth required)
router.post("/submitTask", weeklyTaskController.submitTask);
//  Route to get all submitted tasks
router.get("/gradeTask", weeklyTaskController.getAllTasks);
// Route to get tasks for a specific user (query email)
router.get("/myTasks", weeklyTaskController.getUserTasks);
exports.default = router;
