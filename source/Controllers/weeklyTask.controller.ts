import { Itask } from "../Interface/weeklyTask.interface";
import weeklyTaskModel from "../Model/weeklyTask.model";
import trackingModel from "../Model/tracking.model";

export class WeeklyTaskService {
    // Submit a new task
    async addTask(taskData: Itask): Promise<Itask> {
        const { email, taskWeek } = taskData;

        // Check if the user exists in the tracking model
        const user = await trackingModel.findOne({ email });

        if (!user) {
            throw new Error("User not found. Please submit the task with the same email used during enrollment.");
        }

        //  Ensure users are not submitting tasks greater than their current week
        if (taskWeek > user.currentWeek) {
            throw new Error(`You cannot submit a task for week ${taskWeek}. Your current progress is up to week ${user.currentWeek}.`);
        }

        // Check if a submission already exists for the same week
        const existingTask = await weeklyTaskModel.findOne({ email, taskWeek });
        if (existingTask) {
            throw new Error(`Task for Week ${taskWeek} has already been submitted.`);
        }

        return await weeklyTaskModel.create(taskData);
    }

    // Get all submitted tasks for a user
    async getSubmittedTasks(email: string): Promise<Itask[]> {
        const tasks = await weeklyTaskModel.find({ email });

        if (!tasks.length) {
            throw new Error("No submitted tasks found for this user.");
        }

        return tasks;
    }
}
