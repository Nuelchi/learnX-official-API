"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paystack_controller_1 = require("../Controllers/paystack.controller");
const auth_middleware_1 = require("../Authorization/auth.middleware");
const { authUser, payAuth } = new auth_middleware_1.Authorization;
const paymentController = new paystack_controller_1.InitializePayment();
const router = express_1.default.Router();
// Use middleware to attach user and generate reference
router.post("/pay", authUser, paymentController.initPay);
router.get("/verify/:reference", paymentController.verifyPay);
exports.default = router;
