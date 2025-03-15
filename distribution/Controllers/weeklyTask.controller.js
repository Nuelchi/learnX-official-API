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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeklyTaskController = void 0;
const weeklyTask_service_1 = require("../Services/weeklyTask.service");
const weeklyTask_model_1 = __importDefault(require("../Model/weeklyTask.model"));
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
    // Get all submitted tasks for a user
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield weeklyTask_model_1.default.find(); // Get all tasks from DB
                res.status(200).json({ message: "All tasks retrieved successfully!", tasks });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.WeeklyTaskController = WeeklyTaskController;
;
