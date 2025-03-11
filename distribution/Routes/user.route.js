"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuth_controller_1 = require("../Controllers/userAuth.controller");
const { signUp, signIn } = new userAuth_controller_1.UserController;
const router = (0, express_1.Router)();
router.post("/signUp", signUp);
router.post("/signIn", signIn);
exports.default = router;
