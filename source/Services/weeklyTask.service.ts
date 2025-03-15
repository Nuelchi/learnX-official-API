import { Itask } from "../Interface/weeklyTask.interface";
import weeklyTaskModel from "../Model/weeklyTask.model";
import trackingModel from "../Model/tracking.model";

export class weeklyTaskService {
    // Add a new course
    async addTask(courseData: Itask): Promise<Itask> {
        const { email } = courseData;
        const user = await trackingModel.findOne({ email });

        if (!user) {
            throw new Error("User not found. Please Submit task with the same email you used during enrollment");
        }
        return await weeklyTaskModel.create(courseData);
    }
}