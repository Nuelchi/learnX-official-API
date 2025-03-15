import { Router } from "express";
import { certificateController } from "../Controllers/certificate.controller";
import { Authorization } from "../Authorization/auth.middleware";

const { authUser } = new Authorization();
const { addCertificate, getCertForUser } = new certificateController();

const router = Router();

// Routes
router.post("/addCert", addCertificate);
router.get("/getCert", authUser, getCertForUser);

export default router;