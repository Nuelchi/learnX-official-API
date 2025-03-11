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
exports.adminController = void 0;
const adminAuth_service_1 = require("../Services/adminAuth.service");
const userService = new adminAuth_service_1.adminService();
class adminController {
    //sign up
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const { name, email, password } = userData;
            if (!name || !email || !password)
                throw new Error("all field required");
            try {
                const newUser = yield userService.signUp(userData);
                res.status(201).json({ message: "user registered successfully", user: newUser });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "something went wrong" });
            }
        });
    }
    ;
    //sign in
    loginAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userService.signIn(req.body);
                res.status(201).json({ message: "welcome back, you are successfully signed in" });
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ message: "something went wrong" });
            }
        });
    }
    ;
    //get all user
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.getAllUsers();
                // If no users are found, return a message
                if (!users || users.length === 0) {
                    res.status(404).json({ message: "No user in Db yet" });
                    return;
                }
                // Send the products in the response if they exist
                res.status(200).json({ message: "users fetched successfully", users });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    ;
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userData = req.body;
            try {
                // Pass the extracted id to the service
                const updatedUser = yield userService.updateUser(id, userData);
                if (!updatedUser) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(200).json({ message: "User updated successfully", user: updatedUser });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Something went wrong" });
            }
        });
    }
    // Get user by ID
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield userService.getUserById(id);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.adminController = adminController;
;
