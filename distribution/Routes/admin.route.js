"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAuth_controller_1 = require("../Controllers/adminAuth.controller");
const { createAdmin, loginAdmin, getAllUsers, updateUser, getUserById, resetPassword } = new adminAuth_controller_1.adminController;
const router = (0, express_1.Router)();
router.post("/signUp", createAdmin);
router.post("/signIn", loginAdmin);
router.get("/allUser", getAllUsers);
router.post("/resetPassword", resetPassword);
router.get("/allUser/:id", getUserById);
router.put("/update/:id", updateUser);
exports.default = router;
