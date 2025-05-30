"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paystack_controller_1 = require("../Controllers/paystack.controller");
const auth_middleware_1 = require("../Authorization/auth.middleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { authUser, payAuth } = new auth_middleware_1.Authorization;
const paymentController = new paystack_controller_1.InitializePayment();
const router = express_1.default.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || "example.com";
// Use middleware to attach user and generate reference
router.post("/pay", authUser, paymentController.initPay);
router.get("/verify/:reference", authUser, paymentController.verifyPay);
router.get("/getAllPayment", paymentController.getAllPayment);
exports.default = router;
