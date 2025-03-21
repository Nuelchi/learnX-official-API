import { Router } from "express";
import { UserController } from "../Controllers/userAuth.controller";

const {signUp, signIn, resetPassword} = new UserController
const router = Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/resetPassword", resetPassword);

export default router