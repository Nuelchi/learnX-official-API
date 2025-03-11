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
        const Newuser = await admin.findOne({ email: data.email });
        if (!Newuser || !(await bcrypt.compare(data.password, Newuser.password))) {
            throw new Error('Invalid credentials');
        }
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
};