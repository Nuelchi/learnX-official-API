import { CourseEnrollModel } from "../Model/courseEnroll.model";
import { IcourseEnroll } from "../Interface/courseEnroll.interface";
import TrackingModel from "../Model/tracking.model";
import UserModel from "../Model/user.model";

export class CourseEnrollService {
    static async enrollUser(courseData: IcourseEnroll) {
        const { email } = courseData;

        try {
            // Step 1: Check if the user exists
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error("User not found. Please sign up with the same email you used to register on learnx.");
            }

            // // Step 2: Check if the user has paid (isSubscribed)
            // if (!user.isSubscribed) {
            //     throw new Error("Payment required. Please pay before enrolling in a course or track.");
            // }

            // Step 3: Check if the user is already enrolled
            let existingEnrollment = await TrackingModel.findOne({ studentId: user._id });

            if (existingEnrollment) {
                return { message: "You are already enrolled.", tracking: existingEnrollment };
            }

            // Step 4: Save new course enrollment
            const newEnrollment = new CourseEnrollModel(courseData);
            await newEnrollment.save();

            // Step 5: Create new tracking record
            const newTracking = new TrackingModel({
                studentId: user._id,
                email: user.email,
                enrollmentDate: new Date(),
                currentWeek: 1,
                usertrack: newEnrollment.track
            });

            await newTracking.save();

            return { message: "Enrollment successful", tracking: newTracking };
        } catch (error: any) {
            throw new Error(`Enrollment failed: ${error.message}`);
        }
    }
}