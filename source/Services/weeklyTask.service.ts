import { Itask } from "../Interface/weeklyTask.interface";
import weeklyTaskModel from "../Model/weeklyTask.model";
import trackingModel from "../Model/tracking.model";

interface ITaskItem {
    taskWeek: Number;
    taskURL: string;
}

export class WeeklyTaskService {
    // ✅ Submit a new task (Store multiple tasks under the same email)
    async addTask(email: string, taskData: ITaskItem): Promise<Itask> {
        const { taskWeek, taskURL } = taskData;

        // Fetch the user's current week from the tracking model
        const user = await trackingModel.findOne({ email });
        if (!user) {
            throw new Error("User not found.");
        }

        // Ensure the user is not submitting a task beyond their progress
        if (taskWeek > user.currentWeek) {
            throw new Error(
                `You cannot submit a task for week ${taskWeek}. Your current progress is week ${user.currentWeek}.`
            );
        }

        // ✅ Check if the email already exists in the WeeklyTask collection
        const existingUserTask = await weeklyTaskModel.findOne({ email });

        if (existingUserTask) {
            // ✅ Push the new task into the existing array
            existingUserTask.tasks.push({ taskWeek, taskURL });
            await existingUserTask.save();
            return existingUserTask;
        } else {
            // ✅ Create a new document for this user with the task array
            return await weeklyTaskModel.create({
                email,
                tasks: [{ taskWeek, taskURL }],
            });
        }
    }

    // ✅ Get all submitted tasks
    async getAllTasks(): Promise<Itask[]> {
        const tasks = await weeklyTaskModel.find();
        if (!tasks.length) {
            throw new Error("No tasks have been submitted yet.");
        }
        return tasks;
    }

    // // ✅ Get tasks for a specific user
    // async getUserTasks(email: string): Promise<Itask> {
    //     const tasks = await weeklyTaskModel.findOne({ email });

    //     if (!tasks) {
    //         throw new Error("No tasks found for this user.");
    //     }

    //     return tasks;
    // }
}