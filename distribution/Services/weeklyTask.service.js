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
    // ✅ Submit a new task (Store multiple tasks under the same email)
    addTask(email, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskWeek, taskURL } = taskData;
            // Fetch the user's current week from the tracking model
            const user = yield tracking_model_1.default.findOne({ email });
            if (!user) {
                throw new Error("User not found.");
            }
            // Ensure the user is not submitting a task beyond their progress
            if (taskWeek > user.currentWeek) {
                throw new Error(`You cannot submit a task for week ${taskWeek}. Your current progress is week ${user.currentWeek}.`);
            }
            // ✅ Check if the email already exists in the WeeklyTask collection
            const existingUserTask = yield weeklyTask_model_1.default.findOne({ email });
            if (existingUserTask) {
                // ✅ Push the new task into the existing array
                existingUserTask.tasks.push({ taskWeek, taskURL });
                yield existingUserTask.save();
                return existingUserTask;
            }
            else {
                // ✅ Create a new document for this user with the task array
                return yield weeklyTask_model_1.default.create({
                    email,
                    tasks: [{ taskWeek, taskURL }],
                });
            }
        });
    }
    // ✅ Get all submitted tasks
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
