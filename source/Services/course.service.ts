import { Icourse } from "../Interface/course.interface";
import Course from "../Model/course.model";
import trackingModel from "../Model/tracking.model";
import courseModel from "../Model/course.model";

export class CourseService {
    // Add a new course
    async addCourse(courseData: Icourse): Promise<Icourse> {
        return await Course.create(courseData);
    }

    // Get a course by ID
    async getCourseById(id: string): Promise<Icourse | null> {
        return await Course.findById(id);
    }

    // Get all courses (optionally filter by title)
    async getCourses(title?: string): Promise<Icourse[]> {
        const query = title ? { title: { $regex: new RegExp(title, "i") } } : {};
        return await Course.find(query);
    }

    // Get all courses in a category (backend, frontend etc)
    async getCourseCategory(category?: string): Promise<Icourse[]> {
        if (category) {
            return await Course.find({ category: { $regex: new RegExp(category, "i") } });
        }
        return await Course.find({});
    }

    async getTrackCourses(week: number, category: string): Promise<{ allCourses: Icourse[], currentWeekVideos: Icourse[] }> {
        console.log(`Querying for courses with week <= ${week} and category = ${category}`);
    
        const query = { week: { $lte: week }, category: category.toLowerCase() };
        console.log("MongoDB Query:", JSON.stringify(query));
    
        // Step 1: Fetch all courses up to the given week
        const allCourses = await Course.find(query);
        console.log("Filtered courses:", allCourses);
    
        // Step 2: Filter courses to return only videos for the current week
        const currentWeekVideos = allCourses.filter(course => course.week === week && course.type.toLowerCase() === "video");
    
        return { allCourses, currentWeekVideos };
    }

    // Update a course by ID
    async updateCourse(id: string, courseData: Partial<Icourse>): Promise<Icourse | null> {
        return await Course.findByIdAndUpdate(id, courseData, { new: true, runValidators: true });
    }
}

export default new CourseService();