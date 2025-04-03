import { Request, Response } from "express";
import CourseService from "../Services/course.service";
import trackingModel from "../Model/tracking.model";
import userModel from "../Model/user.model";
import courseService from "../Services/course.service";

export class CourseController {
    // Add a new course
    async addCourse(req: Request, res: Response): Promise<void> {
        try {
            const course = await CourseService.addCourse(req.body);
            res.status(201).json({ message: "Course added successfully!", course });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Get a course by ID
    async getCourseById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const course = await CourseService.getCourseById(id);

            if (!course) {
                res.status(404).json({ message: "Course not found" });
                return;
            }

            res.status(200).json(course);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get all courses

    async getCoursebyTracker(req: Request, res: Response): Promise<void> {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }
    
            // Find the user in the database
            const foundUser = await userModel.findById(user._id);
            if (!foundUser) {
                res.status(404).json({ message: "User not found in the database." });
                return;
            }
    
            // Find the user's tracking record
            const usertrack = await trackingModel.findOne({ studentId: user._id });
            if (!usertrack) {
                res.status(404).json({ message: "Tracking record not found for user" });
                return;
            }
    
            const currentWeek = usertrack.currentWeek;
            const track = usertrack.track.toLowerCase();
    
            // Fetch courses based on the user's track
            const { allCourses, currentWeekVideos } = await CourseService.getTrackCourses(currentWeek, track);
    
            if (!allCourses.length) {
                res.status(404).json({ message: "No courses found" });
                return;
            }
    
            res.status(200).json({
                message: "Courses retrieved successfully",
                allCourses,
                currentWeekVideos, // Only videos for the current week
            });
        } catch (error: any) {
            console.error("Error fetching courses:", error.message);
            res.status(500).json({ message: "Server error. Please try again later." });
        }
    }

    async getCourses(req: Request, res: Response): Promise<void> {
        try {
            const { title } = req.query;
            const courses = title
                ? await CourseService.getCourses(title as string)
                : await CourseService.getCourses(); // Fetch all courses if no title is provided

            if (!courses.length) {
                res.status(404).json({ message: "No courses found" });
                return;
            }

            res.status(200).json(courses);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }


    // Get all courses in a category (backend, frontend etc)
    async getCourseCategory(req: Request, res: Response): Promise<void> {
        try {
            const { category } = req.query;
            const courses = await CourseService.getCourseCategory(category as string);

            if (!courses.length) {
                res.status(404).json({ message: "No courses found" });
                return;
            }

            res.status(200).json(courses);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update a course by ID
    async updateCourse(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedCourse = await CourseService.updateCourse(id, req.body);

            if (!updatedCourse) {
                res.status(404).json({ message: "Course not found, provide a valid ID" });
                return;
            }

            res.status(200).json({ message: "Course updated successfully!", course: updatedCourse });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new CourseController();