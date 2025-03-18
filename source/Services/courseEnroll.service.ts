import { CourseEnrollModel } from "../Model/courseEnroll.model";
import { IcourseEnroll } from "../Interface/courseEnroll.interface";
import TrackingModel from "../Model/tracking.model";
import UserModel from "../Model/user.model";

export class CourseEnrollService {
    static async enrollUser(courseData: IcourseEnroll) {
        const { firstname, lastname, email, phone, track} = courseData;

        try {
            // Step 1: Check if the user exists
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error("User not found. Please sign up with the same email you used to register on learnx.");
            }

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
                firstname: firstname,
                lastname: lastname,
                email: user.email,
                phone: phone,
                track: track,
                enrollmentDate: new Date(),
                currentWeek: 1,
                
            });

            await newTracking.save();

            return { message: "Enrollment successful", tracking: newTracking };
        } catch (error: any) {
            throw new Error(`Enrollment failed: ${error.message}`);
        }
    }
}