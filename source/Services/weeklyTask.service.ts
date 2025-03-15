import { Itask } from "../Interface/weeklyTask.interface";
import weeklyTaskModel from "../Model/weeklyTask.model";
import trackingModel from "../Model/tracking.model";

export class WeeklyTaskService {
    //  Submit a new task (Fetching currentWeek from tracking model)
    async addTask(taskData: Itask): Promise<Itask> {
        const { email, taskWeek, taskURL } = taskData;

        // Fetch user's current week from trackingModel
        const userTracking = await trackingModel.findOne({ email });

        if (!userTracking) {
            throw new Error("User not found in tracking records.");
        }

        const currentWeek = userTracking.currentWeek;

        //  Ensure users are not submitting tasks beyond their current week
        if (taskWeek > currentWeek) {
            throw new Error(`You cannot submit a task for week ${taskWeek}. Your current progress is week ${currentWeek}.`);
        }

        //  Create task with email 
        return await weeklyTaskModel.create({ email, taskWeek, taskURL });
    }

    // Get all submitted tasks
    async getAllTasks(): Promise<Itask[]> {
        const tasks = await weeklyTaskModel.find();
        if (!tasks.length) {
            throw new Error("No tasks have been submitted yet.");
        }
        return tasks;
    }

    // // Get tasks submitted by a specific user (using email)
    // async getUserTasks(email: string): Promise<Itask[]> {
    //     const tasks = await weeklyTaskModel.find({ email });

    //     if (!tasks.length) {
    //         throw new Error("No tasks found for this user.");
    //     }

    //     return tasks;
    // }
}