import { Itask } from "../Interface/weeklyTask.interface";
import weeklyTaskModel from "../Model/weeklyTask.model";
import trackingModel from "../Model/tracking.model";

export class WeeklyTaskService {
    //  Submit a new task (Using student ID)
    async addTask(userId: string, taskData: Omit<Itask, "studentId">): Promise<Itask> {
        const { taskWeek, taskURL } = taskData;

        // Check if the user exists in the tracking model
        const user = await trackingModel.findOne({ userId });

        if (!user) {
            throw new Error("User not found. Please submit the task with the same account used during enrollment.");
        }

        // Ensure users are not submitting tasks greater than their current week
        if (taskWeek > user.currentWeek) {
            throw new Error(`You cannot submit a task for week ${taskWeek}. Your current progress is week ${user.currentWeek}.`);
        }

        // Create task with authenticated user's ID
        return await weeklyTaskModel.create({ studentId: userId, taskWeek, taskURL });
    }

    // Get all submitted tasks
    async getAllTasks(): Promise<Itask[]> {
        const tasks = await weeklyTaskModel.find();
        if (!tasks.length) {
            throw new Error("No tasks have been submitted yet.");
        }
        return tasks;
    }

}