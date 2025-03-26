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
router.get("/payment-success", (req, res) => {
  res.send(`
      <html>
          <head>
              <title>Payment Success</title>
          </head>
          <body style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
              <h2>Payment was successful! 🎉</h2>
              <p>You can now access your content.</p>
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

export default router;