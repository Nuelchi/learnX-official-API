import { Router } from "express";
import { mentorController } from "../Controllers/mentor.controller";

const  {addMentor, getMentors} = new mentorController;
const router = Router();

router.post("/addMentor",addMentor);
router.get("/getMentors",getMentors);

export default router