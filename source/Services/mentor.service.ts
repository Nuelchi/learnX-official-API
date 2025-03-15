import { Imentor } from "../Interface/mentor.interface";
import mentorsModel from "../Model/mentors.model";


export class mentorService {
    // Add a new course
    async addMentor(mentorData: Imentor): Promise<Imentor> {
        return await mentorsModel.create(mentorData);
    }

    //get all user
    async getAllMentor(): Promise<Imentor[]> {
        try {
            const mentors = await mentorsModel.find();
            return mentors;
        } catch (error: any) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    };
}