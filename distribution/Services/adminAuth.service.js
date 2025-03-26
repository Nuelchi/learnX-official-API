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
exports.adminService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_model_1 = __importDefault(require("../Model/admin.model"));
const user_model_1 = __importDefault(require("../Model/user.model"));
class adminService {
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield admin_model_1.default.findOne({ email: data.email });
            if (existingUser) {
                throw new Error("user alredy exists");
            }
            const newUser = admin_model_1.default.create(data);
            return yield newUser;
        });
    }
    ;
    signIn(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield admin_model_1.default.findOne({ email: data.email });
            if (!user || !(yield bcrypt_1.default.compare(data.password, user.password))) {
                throw new Error('Invalid credentials');
            }
            return {
                user: {
                    id: user.id,
                    name: user.firstname, // Include relevant user fields
                    email: user.email,
                    role: user.role, // Add any other necessary fields
                },
            };
        });
    }
    ;
    //get all user
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find().select('-password');
                return users;
            }
            catch (error) {
                throw new Error(`Failed to fetch users: ${error.message}`);
            }
        });
    }
    ;
    //update a user
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findByIdAndUpdate(id, user, { new: true });
        });
    }
    ;
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findById(id);
        });
    }
    resetPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            // Check if email or new password is missing
            if (!email || !password) {
                throw new Error("Email and new password are required");
            }
            // Check if user exists in the database
            const user = yield admin_model_1.default.findOne({ email }).select('email password');
            if (!user) {
                throw new Error("admin with this email not found");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Update the user's password in the database
            user.password = hashedPassword;
            yield user.save();
            return { message: "Password reset successfully" };
        });
    }
}
exports.adminService = adminService;
;
