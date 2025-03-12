"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseEnroll_controller_1 = require("../Controllers/courseEnroll.controller");
const { signUp } = new courseEnroll_controller_1.CourseEnrollController;
const router = (0, express_1.Router)();
router.post("/signUp", signUp);
exports.default = router;
