import express from "express";
import { InitializePayment } from "../Controllers/paystack.controller";
import { Authorization } from "../Authorization/auth.middleware";


const {authUser, payAuth} = new Authorization

const paymentController = new InitializePayment();
const router = express.Router();

// Use middleware to attach user and generate reference
router.post("/pay", authUser, paymentController.initPay);
router.get("/verify/:reference", paymentController.verifyPay);

export default router;