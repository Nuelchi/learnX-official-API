"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("../Controllers/course.controller");
// import { Authorization } from "../Authorization/auth.middleware";
// const {authUser, payAuth, restriction} = new Authorization
const { addCourse, getCourseById, getCourses, getCourseCategry, updateCourse } = new course_controller_1.CourseController();
const router = (0, express_1.Router)();
router.post("/addcourse", addCourse);
router.get("/getcourses", getCourses);
router.get("/coursecategory", getCourseCategry);
router.get("/:id", getCourseById);
router.put("/update/:id", updateCourse);
exports.default = router;
