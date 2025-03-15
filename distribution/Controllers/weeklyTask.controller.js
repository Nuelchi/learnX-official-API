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
exports.weeklyTaskController = void 0;
const weeklyTask_service_1 = require("../Services/weeklyTask.service");
const weeklyTask = new weeklyTask_service_1.weeklyTaskService();
class weeklyTaskController {
    // Add a new course
    submitTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Task = yield weeklyTask.addTask(req.body);
                res.status(201).json({ message: "Task submitted successfully!", Task });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.weeklyTaskController = weeklyTaskController;
;
