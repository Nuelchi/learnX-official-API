import { Request, Response } from "express";
import { CourseEnrollService } from "../Services/courseEnroll.service";

export class CourseEnrollController {
   async signUp(req: Request, res: Response) {
        try {
            const enrollment = await CourseEnrollService.enrollUser(req.body);
            res.status(201).json({message:"Submitted successfully ", enrollment});
        } catch (error: any) {
            res.status(500).json( error.message );
        }
    }
}