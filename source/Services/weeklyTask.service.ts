import { Itask } from "../Interface/weeklyTask.interface";
import weeklyTaskModel from "../Model/weeklyTask.model";
import trackingModel from "../Model/tracking.model";

export class    weeklyTaskService {
    // Submit a new task
    async addTask(taskData: Itask): Promise<Itask> {
        const { email, taskWeek } = taskData;

        // Check if the user exists in the tracking model
        const user = await trackingModel.findOne({ email });

        if (!user) {
            throw new Error("User not found. Please submit the task with the same email used during enrollment.");
        }

        // Ensure users are not submitting tasks greater than their current week
        if (taskWeek > user.currentWeek) {
            throw new Error(`You cannot submit a task for week ${taskWeek}. Your current progress is week ${user.currentWeek}.`);
        }

        return await weeklyTaskModel.create(taskData);
    }

    // Get all submitted tasks for a user
    async getSubmittedTasks(email: string): Promise<Itask[]> {
        const tasks = await weeklyTaskModel.find({ email });

        if (!tasks.length) {
            throw new Error("No submitted tasks found from users yet.");
        }

        return tasks;
    }
}