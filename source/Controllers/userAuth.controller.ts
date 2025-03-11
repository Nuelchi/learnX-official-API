import { Request, Response } from "express";
import { UserService } from "../Services/userAuth.service";


const userService= new UserService();

export class UserController{

  async signUp(req:Request, res:Response): Promise<void>{
    const userData=req.body;
    const{name, email, password, phone}= userData;
    if(!name||!email||!password||!phone)throw new Error("all filed required");

    try {
        const newUser= await userService.signUp(userData);
        res.status(201).json({message:"user registered successfully", user:newUser});
    } catch (error: any) {
      console.log(error);
      res.status(500).json({error: error.message})
    }

  };

  async signIn(req: Request, res: Response) {
    try {
      const token = await userService.signIn(req.body);
      res.status(200).json({message:"you have signed in succesfully", token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }


//   async updateUser(req:Request, res:Response):Promise<void>{
//     const{user}= req.params
//     const userData:Iuser=req.body
//     try {
//       const updateUser = await userService.updateUser({...userData})
//       if (!updateUser) throw new Error ("user not found")
//         res.status(404).json({message:"user updated successfully", user:updateUser})
//     } catch (error) {
//       console.log(error)
//       res.status(500).json({message:"something went wrong"})}
//   }
};