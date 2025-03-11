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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator_1.default.isEmail, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        minlength: 8,
        validate: {
            validator: function (confirmPassword) {
                return confirmPassword === this.password;
            },
            message: 'Password and confirm password do not match',
        },
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number'],
        minlength: 11,
        unique: [true, 'Please enter a new phone number']
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isSubscribed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
// Pre-save hook to hash the password
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, 10);
        this.confirmPassword = undefined;
        next();
    });
});
exports.default = (0, mongoose_1.model)("user", userSchema);
