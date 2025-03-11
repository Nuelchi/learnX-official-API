import { Router } from "express";
import { UserController } from "../Controllers/userAuth.controller";

const {signUp, signIn} = new UserController
const router = Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);

export default router