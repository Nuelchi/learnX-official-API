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
const WeeklyTaskService = new weeklyTask_service_1.weeklyTaskService();
class WeeklyTaskController {
    // Submit a new task
    submitTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield WeeklyTaskService.addTask(req.body);
                res.status(201).json({ message: "Task submitted successfully!", task });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    // Get submitted tasks for a user
    getUserTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const tasks = yield WeeklyTaskService.getSubmittedTasks(email);
                res.status(200).json({ message: "Tasks retrieved successfully!", tasks });
            }
            catch (error) {
                res.status(404).json({ message: error.message });
            }
        });
    }
}
exports.WeeklyTaskController = WeeklyTaskController;
