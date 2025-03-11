import { Router } from "express";
import { adminController } from "../Controllers/adminAuth.controller";

const {createAdmin , loginAdmin, getAllUsers, updateUser, getUserById} = new adminController
const router = Router();

router.post("/signUp", createAdmin );
router.post("/signIn", loginAdmin);
router.get("/allUser", getAllUsers )
router.get("/allUser/:id", getUserById )
router.put("/update/:id", updateUser )

export default router