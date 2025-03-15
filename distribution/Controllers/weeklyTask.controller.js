"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeklyTaskController = void 0;
const weeklyTask_service_1 = require("../Services/weeklyTask.service");
const weeklyTaskService = new weeklyTask_service_1.WeeklyTaskService();
class WeeklyTaskController {
    // ✅ Submit a new task (Uses `(req as any).user.id`)
    submitTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user; // Extract authenticated user
                if (!user || !user.id) {
                    res.status(401).json({ message: "Unauthorized. User not found." });
                    return;
                }
                const { taskWeek, taskURL } = req.body;
                const task = yield weeklyTaskService.addTask(user.id, { taskWeek, taskURL });
                res.status(201).json({ message: "Task submitted successfully!", task });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    // ✅ Get all submitted tasks
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield weeklyTaskService.getAllTasks();
                res.status(200).json({ message: "All tasks retrieved successfully!", tasks });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.WeeklyTaskController = WeeklyTaskController;
