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
router.get("/payment-success", (req, res) => {
    res.send(`
      <html>
          <head>
              <title>Payment Success</title>
          </head>
          <body style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
              <h2>Payment was successful! 🎉</h2>
              <p>Click the button below to return to the dashboard.</p>
              <p>
                  <a href="${FRONTEND_URL}" style="display: inline-block; padding: 10px 15px; background-color: #4CAF50; 
                  color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                      Click here to return to the dashboard
                  </a>
              </p>
          </body>
      </html>
  `);
});
exports.default = router;
