"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User", required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        required: true, unique: true
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
    transactionDate: { type: Date, default: Date.now },
}, { timestamps: true });
// Create and export the Payment model
const Payment = (0, mongoose_1.model)("Payment", PaymentSchema);
exports.default = Payment;
