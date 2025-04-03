import express from "express";
import { InitializePayment } from "../Controllers/paystack.controller";
import { Authorization } from "../Authorization/auth.middleware";
import dotenv from 'dotenv';
dotenv.config()

const {authUser, payAuth} = new Authorization

const paymentController = new InitializePayment();
const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || "example.com";


// Use middleware to attach user and generate reference
router.post("/pay", authUser, paymentController.initPay);
router.get("/verify/:reference", authUser,paymentController.verifyPay);
router.get("/getAllPayment",paymentController.getAllPayment);


export default router;