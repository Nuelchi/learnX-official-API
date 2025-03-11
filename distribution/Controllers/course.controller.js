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
exports.CourseController = void 0;
const course_service_1 = __importDefault(require("../Services/course.service"));
const auth_middleware_1 = require("../Authorization/auth.middleware");
//Auth instance
const { authUser, payAuth } = new auth_middleware_1.Authorization;
class CourseController {
    // Add a new course
    addCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_service_1.default.addCourse(req.body);
                res.status(201).json({ message: "Course added successfully!", course });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    // Get a course by ID
    getCourseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const course = yield course_service_1.default.getCourseById(id);
                if (!course) {
                    res.status(404).json({ message: "Course not found" });
                    return;
                }
                res.status(200).json(course);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Get all courses
    getCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.query;
                const courses = title
                    ? yield course_service_1.default.getCourses(title)
                    : yield course_service_1.default.getCourses(); // Fetch all courses if no title is provided
                if (!courses.length) {
                    res.status(404).json({ message: "No courses found" });
                    return;
                }
                res.status(200).json(courses);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Get all courses in a category (backend, frontend etc)
    getCourseCategry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = req.query;
                const courses = yield course_service_1.default.getCourseCategory(category);
                if (!courses.length) {
                    res.status(404).json({ message: "No courses found" });
                    return;
                }
                res.status(200).json(courses);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Update a course by ID
    updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedCourse = yield course_service_1.default.updateCourse(id, req.body);
                if (!updatedCourse) {
                    res.status(404).json({ message: "Course not found, provide a valid ID" });
                    return;
                }
                res.status(200).json({ message: "Course updated successfully!", course: updatedCourse });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.CourseController = CourseController;
exports.default = new CourseController();
