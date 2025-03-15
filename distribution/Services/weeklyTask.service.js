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
exports.WeeklyTaskService = void 0;
const weeklyTask_model_1 = __importDefault(require("../Model/weeklyTask.model"));
const tracking_model_1 = __importDefault(require("../Model/tracking.model"));
class WeeklyTaskService {
    //  Submit a new task (Using student ID)
    addTask(userId, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskWeek, taskURL } = taskData;
            // Check if the user exists in the tracking model
            const user = yield tracking_model_1.default.findOne({ userId });
            if (!user) {
                throw new Error("User not found. Please submit the task with the same account used during enrollment.");
            }
            // Ensure users are not submitting tasks greater than their current week
            if (taskWeek > user.currentWeek) {
                throw new Error(`You cannot submit a task for week ${taskWeek}. Your current progress is week ${user.currentWeek}.`);
            }
            // Create task with authenticated user's ID
            return yield weeklyTask_model_1.default.create({ studentId: userId, taskWeek, taskURL });
        });
    }
    // Get all submitted tasks
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield weeklyTask_model_1.default.find();
            if (!tasks.length) {
                throw new Error("No tasks have been submitted yet.");
            }
            return tasks;
        });
    }
}
exports.WeeklyTaskService = WeeklyTaskService;
