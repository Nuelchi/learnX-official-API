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
exports.CourseService = void 0;
const course_model_1 = __importDefault(require("../Model/course.model"));
const course_model_2 = __importDefault(require("../Model/course.model"));
class CourseService {
    // Add a new course
    addCourse(courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield course_model_1.default.create(courseData);
        });
    }
    // Get a course by ID
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield course_model_1.default.findById(id);
        });
    }
    // Get all courses (optionally filter by title)
    getCourses(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = title ? { title: { $regex: new RegExp(title, "i") } } : {};
            return yield course_model_1.default.find(query);
        });
    }
    // Get all courses in a category (backend, frontend etc)
    getCourseCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            if (category) {
                return yield course_model_1.default.find({ category: { $regex: new RegExp(category, "i") } });
            }
            return yield course_model_1.default.find({});
        });
    }
    getTrackCourses(week, category) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch all courses from week 1 to the current week
            return yield course_model_2.default.find({
                week: { $lte: week }, // Get all courses where week is less than or equal to the current week
                category
            });
        });
    }
    // Update a course by ID
    updateCourse(id, courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield course_model_1.default.findByIdAndUpdate(id, courseData, { new: true, runValidators: true });
        });
    }
}
exports.CourseService = CourseService;
exports.default = new CourseService();
