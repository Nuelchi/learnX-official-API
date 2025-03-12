import { CourseEnrollModel } from "../Model/courseEnroll.model";
import { IcourseEnroll } from "../Interface/courseEnroll.interface";

export class CourseEnrollService {
    static async enrollUser(courseData: IcourseEnroll) {
        try {
            const newEnrollment = new CourseEnrollModel(courseData);
            await newEnrollment.save();

            return { success: true, message: "Enrollment successful", enrollment: newEnrollment };
        } catch (error: any) {
            throw new Error(`Enrollment failed: ${error.message}`);
        }
    }
}