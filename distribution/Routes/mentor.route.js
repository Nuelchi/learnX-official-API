"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mentor_controller_1 = require("../Controllers/mentor.controller");
const { addMentor, getMentors } = new mentor_controller_1.mentorController;
const router = (0, express_1.Router)();
router.post("/addMentor", addMentor);
router.get("/getMentors", getMentors);
exports.default = router;
