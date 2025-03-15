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
const payment_model_1 = __importDefault(require("../Model/payment.model"));
const user_model_1 = __importDefault(require("../Model/user.model"));
class InitializePayment {
    constructor() {
        // Initialize Payment
        this.initPay = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(401).json({ message: "Unauthorized. User not found." });
                    return;
                }
                const amount = 100000; // Fixed amount
                // Initialize payment with Paystack
                const paymentResponse = yield paystackService_1.paystackService.initializePayment(user.email, amount);
                if (!paymentResponse.status || !paymentResponse.data || !paymentResponse.data.reference) {
                    res.status(500).json({ message: "Failed to initialize payment with Paystack." });
                    return;
                }
                const reference = paymentResponse.data.reference; // Get Paystack reference
                // Save payment in the database using Paystack's reference
                const newPayment = new payment_model_1.default({
                    userId: user._id,
                    userEmail: user.email,
                    amount,
                    reference, // Use Paystack reference
                    status: "pending",
                });
                yield newPayment.save();
                res.status(200).json(paymentResponse);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
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
                if (!reference) {
                    res.status(400).json({ message: "Reference is required" });
                    return;
                }
                // Verify payment via Paystack
                const verificationResponse = yield paystackService_1.paystackService.verifyPayment(reference);
                if (!verificationResponse.status || verificationResponse.data.status !== "success") {
                    res.status(400).json({ message: "Payment verification failed", details: verificationResponse });
                    return;
                }
                // Update payment status in DB to "paid"
                const updatedPayment = yield payment_model_1.default.findOneAndUpdate({ reference }, { status: "paid" }, // Update status to 'paid'
                { new: true } // Return the updated document
                );
                if (!updatedPayment) {
                    res.status(404).json({ message: "Payment record not found in database" });
                    return;
                }
                // Mark the user as subscribed
                yield user_model_1.default.findByIdAndUpdate(user._id, { isSubscribed: true });
                res.status(200).json({ message: "Payment verified and status updated to paid", verificationResponse });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.InitializePayment = InitializePayment;
