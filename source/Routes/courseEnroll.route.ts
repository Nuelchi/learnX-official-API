import { Router } from "express";
import { CourseEnrollController } from "../Controllers/courseEnroll.controller";


const {signUp} = new CourseEnrollController

const router = Router();
router.post("/signUp", signUp );

export default router;