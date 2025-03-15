"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weeklyTask_controller_1 = require("../Controllers/weeklyTask.controller");
const { submitTask } = new weeklyTask_controller_1.weeklyTaskController;
const router = (0, express_1.Router)();
router.post("/SubmitTask", submitTask);
exports.default = router;
