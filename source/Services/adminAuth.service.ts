import { Iadmin } from "../Interface/admin.interface";
import bcrypt from "bcrypt"
import admin from "../Model/admin.model";
import { Iuser } from "../Interface/user.interface";
import myuser from "../Model/user.model";


export class adminService {
    async signUp(data: Iadmin): Promise<Iadmin> {
        const existingUser = await admin.findOne({ email: data.email })
        if (existingUser) {
            throw new Error("user alredy exists")
        }
        const newUser = admin.create(data)
        return await newUser;
    };

    async signIn(data: { email: string; password: string }) {
        const user = await admin.findOne({ email: data.email });
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new Error('Invalid credentials');
        }
        return {
            user: {
              id: user.id,
              name: user.firstname, // Include relevant user fields
              email: user.email,
              role: user.role,  // Add any other necessary fields
            },
          };
    };


    //get all user
    async getAllUsers(): Promise<Iuser[]> {
        try {
            const users = await myuser.find().select('-password');
            return users;
        } catch (error: any) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    };


    //update a user
    async updateUser(id: string, user: Iuser): Promise<Iuser | null> {
        return await myuser.findByIdAndUpdate(id, user, { new: true })
    };


    async getUserById(id: string): Promise<Iuser | null> {
        return await myuser.findById(id);
    }


    async resetPassword(data: { email?: string; password?: string }) {
        const { email, password } = data;

        // Check if email or new password is missing
        if (!email || !password) {
            throw new Error("Email and new password are required");
        }

        // Check if user exists in the database
        const user = await admin.findOne({ email }).select('email password');
        if (!user) {
            throw new Error("admin with this email not found");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        return { message: "Password reset successfully" };
    }

};