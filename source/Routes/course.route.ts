import { Router } from "express";
import { CourseController } from "../Controllers/course.controller";
import { Authorization } from "../Authorization/auth.middleware";


const {authUser, payAuth, restriction} = new Authorization

const { addCourse, getCourseById, getCourses, getCoursebyTracker, updateCourse, getCourseCategory } = new CourseController();
const router = Router();

router.post("/addcourse", addCourse);
router.get("/getcourses", getCourses);
router.get("/coursecategory", getCourseCategory);
router.get("/CourseForTrack", authUser, getCoursebyTracker); 
router.get("/:id", getCourseById);
router.put("/update/:id", updateCourse);

export default router;