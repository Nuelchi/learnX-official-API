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
exports.weeklyTaskService = void 0;
const weeklyTask_model_1 = __importDefault(require("../Model/weeklyTask.model"));
const tracking_model_1 = __importDefault(require("../Model/tracking.model"));
class weeklyTaskService {
    // Add a new course
    addTask(courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = courseData;
            const user = yield tracking_model_1.default.findOne({ email });
            if (!user) {
                throw new Error("User not found. Please Submit task with the same email you used during enrollment");
            }
            return yield weeklyTask_model_1.default.create(courseData);
        });
    }
}
exports.weeklyTaskService = weeklyTaskService;
