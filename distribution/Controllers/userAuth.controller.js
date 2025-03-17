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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userAuth_service_1 = require("../Services/userAuth.service");
const userService = new userAuth_service_1.UserService();
class UserController {
    //signup
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userData = req.body;
            const { firstname, lastname, email, password } = userData;
            if (!firstname || !lastname || !email || !password)
                throw new Error("all filed required");
            try {
                const newUser = yield userService.signUp(userData);
                res.status(201).json({ message: "user registered successfully", user: newUser });
            }
            catch (error) {
                console.log(error);
                if (error.name === "ValidationError") {
                    const validationErrors = error.errors;
                    const firstError = ((_a = Object.values(validationErrors)[0]) === null || _a === void 0 ? void 0 : _a.message) || "Validation failed";
                    res.status(400).json({ error: firstError });
                }
                res.status(500).json({ error: error.message });
            }
        });
    }
    ;
    //sign in
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield userService.signIn(req.body);
                res.status(200).json({ message: "you have signed in succesfully", token });
            }
            catch (error) {
                res.status(401).json({ error: error.message });
            }
        });
    }
    //reset password
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userService.resetPassword(req.body);
                res.status(200).json(response);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
;
