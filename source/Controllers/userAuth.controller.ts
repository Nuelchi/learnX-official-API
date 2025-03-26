import { Request, Response } from "express";
import { UserService } from "../Services/userAuth.service";


const userService = new UserService();

export class UserController {
  //signup
  async signUp(req: Request, res: Response): Promise<void> {
    const userData = req.body;
    const { firstname, lastname, email, password } = userData;
    if (!firstname || !lastname || !email || !password) throw new Error("all fiel~d required");

    try {
      const newUser = await userService.signUp(userData);
      res.status(201).json({ message: "user registered successfully", user: newUser });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({message: "user validation failed", error:error.message})
    }
  };

  //sign in
  async signIn(req: Request, res: Response) {
    try {
        const { user, token } = await userService.signIn(req.body);
      res.status(200).json({ 
        message: "You have signed in successfully", 
        user, 
        token,
      });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  //reset password
  async resetPassword(req: Request, res: Response) {
    try {
      const response = await userService.resetPassword(req.body);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};