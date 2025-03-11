"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachUserAndGenerateReference = void 0;
const crypto_1 = __importDefault(require("crypto"));
const attachUserAndGenerateReference = (req, res, next) => {
    const user = req.user; // Extract user from JWT middleware
    if (!user) {
        return res.status(401).json({ message: "Unauthorized. User not found." });
    }
    req.reference = `PAY_${crypto_1.default.randomUUID()}`; // Unique reference
    next();
};
exports.attachUserAndGenerateReference = attachUserAndGenerateReference;
