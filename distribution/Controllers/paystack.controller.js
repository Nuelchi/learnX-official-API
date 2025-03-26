"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializePayment = void 0;
const paystackService_1 = require("../Services/paystackService");
const axios_1 = __importDefault(require("axios"));
const payment_model_1 = __importDefault(require("../Model/payment.model"));
const user_model_1 = __importDefault(require("../Model/user.model"));
class InitializePayment {
    constructor() {
        // Initialize Payment
        this.initPay = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(401).json({ success: false, message: "Unauthorized. User not found." });
                    return;
                }
                const amount = 45000000; // Fixed amount
                // Initialize payment with Paystack
                const response = yield axios_1.default.post("https://api.paystack.co/transaction/initialize", { email: user.email, amount }, {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        "Content-Type": "application/json",
                    },
                });
                const paymentData = response.data.data;
                if (!paymentData || !paymentData.reference) {
                    res.status(500).json({ success: false, message: "Failed to initialize payment with Paystack." });
                    return;
                }
                // Save payment in the database using Paystack's response status
                yield payment_model_1.default.create({
                    userId: user._id,
                    userEmail: user.email,
                    amount,
                    reference: paymentData.reference,
                    status: paymentData.status, // Use Paystack's status
                });
                res.status(200).json({ success: true, message: "Payment initialized", data: paymentData });
            }
            catch (error) {
                res.status(500).json({ success: false, message: "Error initializing payment", error: error.message });
            }
        });
        // Verify Payment
        this.verifyPay = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { reference } = req.params;
                const user = req.user;
                if (!user) {
                    res.status(401).json({ message: "Unauthorized. User not found." });
                    return;
                }
                const subscriptionUpdated = yield this.updateSubscription(user.email);
                if (!subscriptionUpdated) {
                    res.status(500).json({ message: "Payment verified but subscription update failed" });
                    return;
                }
                if (!reference) {
                    res.status(400).json({ message: "Reference is required" });
                    return;
                }
                // Verify payment via Paystack
                const verificationResponse = yield paystackService_1.paystackService.verifyPayment(reference);
                console.log("Paystack Verification Response:", verificationResponse);
                if (!verificationResponse.status || verificationResponse.data.status !== "success") {
                    res.status(400).json({ message: "Payment verification failed", details: verificationResponse });
                    return;
                }
                // Update payment status in DB to "paid"
                const updatedPayment = yield payment_model_1.default.findOneAndUpdate({ reference }, { status: "paid" }, { new: true });
                if (!updatedPayment) {
                    res.status(404).json({ message: "Payment record not found in database" });
                    return;
                }
                // Call the function to update subscription status
                res.status(200).json({
                    message: "Payment verified, status updated, and user subscribed",
                    payment: updatedPayment
                });
            }
            catch (error) {
                console.error("Error in verifyPay:", error);
                res.status(500).json({ message: error.message });
            }
        });
        // Update user subscription status
        this.updateSubscription = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Updating subscription for email:", email);
                const updatedUser = yield user_model_1.default.findOneAndUpdate({ email }, { $set: { isSubscribed: true } }, { new: true });
                if (!updatedUser) {
                    console.error("User not found, subscription not updated.");
                    return false;
                }
                console.log("User subscription updated successfully:", updatedUser);
                return true;
            }
            catch (error) {
                console.error("Error updating user subscription:", error.message);
                return false;
            }
        });
    }
}
exports.InitializePayment = InitializePayment;
