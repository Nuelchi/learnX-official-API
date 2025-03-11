import { Request, Response } from "express";
import { adminService } from "../Services/adminAuth.service";
import { Iuser } from "../Interface/user.interface"

const userService = new adminService();

export class adminController {
    //sign up
    async createAdmin(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        const { name, email, password } = userData;
        if (!name || !email || !password) throw new Error("all field required");

        try {
            const newUser = await userService.signUp(userData);
            res.status(201).json({ message: "user registered successfully", user: newUser });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "something went wrong" })

        }
    };


    //sign in
    async loginAdmin(req: Request, res: Response) {

        try {
            await userService.signIn(req.body)
            res.status(201).json({ message: "welcome back, you are successfully signed in" });

        } catch (error) {
            console.log(error)
            res.status(404).json({ message: "something went wrong" })
        }
    };


    //get all user
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAllUsers();

            // If no users are found, return a message
            if (!users || users.length === 0) {
                res.status(404).json({ message: "No user in Db yet" });
                return;
            }
            // Send the products in the response if they exist
            res.status(200).json({ message: "users fetched successfully", users });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };


    async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const userData: Iuser = req.body;

        try {
            // Pass the extracted id to the service
            const updatedUser = await userService.updateUser(id, userData);

            if (!updatedUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json({ message: "User updated successfully", user: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    // Get user by ID
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
};