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
exports.Authorization = void 0;
const user_model_1 = __importDefault(require("../Model/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
class Authorization {
    constructor() {
        //midlleware to verify payment before access  to course
        this.payAuth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const user = yield user_model_1.default.findById(req.user._id);
                if (!user || (!user.isSubscribed && user.role !== "admin")) {
                    return res.status(403).json({ message: "Access denied. Subscription required." });
                }
                next();
            }
            catch (error) {
                res.status(500).json({ error: "Server error" });
            }
        });
        //middleware to verify JWT
        this.authUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authorizationHeader = req.headers.authorization;
                if (!authorizationHeader || !authorizationHeader.toLowerCase().startsWith("bearer")) {
                    res.status(401).json({ message: "Authorization header missing or invalid" });
                    return;
                }
                const token = authorizationHeader.split(" ")[1]; // Extract the token
                const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_STRING); // Verify token
                const user = yield user_model_1.default.findById(decoded.id);
                if (!user) {
                    res.status(400).json({ message: "User with token not found in DB. Please sign up or log in." });
                    return;
                }
                req.user = user; // Attach user object to request
                req.user.id =
                    next();
            }
            catch (error) {
                console.error("Token verification failed:", error.message);
                res.status(401).json({ message: "Invalid or expired token" });
            }
        });
        // Middleware to restrict certain roles
        this.restriction = (...roles) => {
            return (req, res, next) => {
                if (!req.user) {
                    res.status(401).json({ message: "User not authenticated" });
                    return;
                }
                if (!roles.includes(req.user.role)) {
                    res.status(403).json({ message: "You do not have access to perform this action" });
                    return;
                }
                next();
            };
        };
    }
}
exports.Authorization = Authorization;
;
