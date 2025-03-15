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
exports.CourseEnrollService = void 0;
const courseEnroll_model_1 = require("../Model/courseEnroll.model");
const tracking_model_1 = __importDefault(require("../Model/tracking.model"));
const user_model_1 = __importDefault(require("../Model/user.model"));
class CourseEnrollService {
    static enrollUser(courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = courseData;
            try {
                // Step 1: Check if the user exists
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    throw new Error("User not found. Please sign up with the same email you used to register on learnx.");
                }
                // // Step 2: Check if the user has paid (isSubscribed)
                // if (!user.isSubscribed) {
                //     throw new Error("Payment required. Please pay before enrolling in a course or track.");
                // }
                // Step 3: Check if the user is already enrolled
                let existingEnrollment = yield tracking_model_1.default.findOne({ studentId: user._id });
                if (existingEnrollment) {
                    return { message: "You are already enrolled.", tracking: existingEnrollment };
                }
                // Step 4: Save new course enrollment
                const newEnrollment = new courseEnroll_model_1.CourseEnrollModel(courseData);
                yield newEnrollment.save();
                // Step 5: Create new tracking record
                const newTracking = new tracking_model_1.default({
                    studentId: user._id,
                    email: user.email,
                    enrollmentDate: new Date(),
                    currentWeek: 1,
                    usertrack: newEnrollment.track
                });
                yield newTracking.save();
                return { message: "Enrollment successful", tracking: newTracking };
            }
            catch (error) {
                throw new Error(`Enrollment failed: ${error.message}`);
            }
        });
    }
}
exports.CourseEnrollService = CourseEnrollService;
