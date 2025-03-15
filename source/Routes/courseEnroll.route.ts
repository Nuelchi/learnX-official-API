import { Router } from "express";
import { CourseEnrollController } from "../Controllers/courseEnroll.controller";
import { Authorization } from "../Authorization/auth.middleware";


const {authUser, payAuth, restriction} = new Authorization

const {signUp} = new CourseEnrollController

const router = Router();
router.post("/signUp", signUp );

export default router;