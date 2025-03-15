"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weeklyTask_controller_1 = require("../Controllers/weeklyTask.controller");
const auth_middleware_1 = require("../Authorization/auth.middleware");
const router = (0, express_1.Router)();
const weeklyTaskController = new weeklyTask_controller_1.WeeklyTaskController();
const { authUser, restriction } = new auth_middleware_1.Authorization();
// Route to submit a task (protected)
router.post("/SubmitTask", weeklyTaskController.submitTask);
//  Route to get all submitted tasks for a user 
router.get("/gradeTask", weeklyTaskController.getAllTasks);
exports.default = router;
