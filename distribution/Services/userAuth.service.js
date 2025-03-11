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
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../Model/user.model"));
const user_model_2 = __importDefault(require("../Model/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
class UserService {
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield user_model_1.default.findOne({ email: data.email });
            if (existingUser) {
                throw new Error("user alredy exists");
            }
            const newUser = new user_model_1.default(data);
            return yield newUser.save();
        });
    }
    ;
    signIn(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_2.default.findOne({ email: data.email });
            if (!user || !(yield bcrypt_1.default.compare(data.password, user.password))) {
                throw new Error('Invalid credentials');
            }
            // Ensure SECRET_STRING is treated as a Secret type
            const secret = process.env.SECRET_STRING;
            const expiry = process.env.LOGIN_EXPIRY || '24h';
            if (!secret) {
                throw new Error('JWT secret is not defined in environment variables.');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, { expiresIn: expiry });
            return token;
        });
    }
}
exports.UserService = UserService;
;
