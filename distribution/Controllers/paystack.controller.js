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
        this.initPay = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(401).json({ message: "Unauthorized. User not found." });
                    return;
                }
                const reference = Math.random().toString(36).substring(2, 15);
                const amount = 100000; // Fixed amount
                // ✅ Save payment in the database
                const newPayment = new payment_model_1.default({
                    userId: user._id, // Use `_id` from the user object
                    userEmail: user.email,
                    amount,
                    reference,
                    status: "pending",
                });
                yield newPayment.save();
                const paymentResponse = yield paystackService_1.paystackService.initializePayment(user.email, amount);
                res.status(200).json(paymentResponse);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
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
                if (typeof verificationResponse.status !== "string" || verificationResponse.status.toLowerCase() !== "success") {
                    res.status(400).json({ message: "Payment verification failed", details: verificationResponse });
                    return;
                }
                // ✅ Update payment status in DB to "paid"
                yield payment_model_1.default.findOneAndUpdate({ reference }, { status: "paid" }, // Update status to 'paid'
                { new: true } // Return the updated document
                );
                // ✅ Mark the user as subscribed
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
;
