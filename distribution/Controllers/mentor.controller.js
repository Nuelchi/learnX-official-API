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
exports.mentorController = void 0;
const mentor_service_1 = require("../Services/mentor.service");
const mentorservice = new mentor_service_1.mentorService();
class mentorController {
    addMentor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentor = yield mentorservice.addMentor(req.body);
                res.status(201).json({ message: "Mentor added successfully!", mentor });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getMentors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentors = yield mentorservice.getAllMentor();
                // If no users are found, return a message
                if (!mentors || mentors.length === 0) {
                    res.status(404).json({ message: "No mentors in Db yet" });
                    return;
                }
                // Send the products in the response if they exist
                res.status(200).json({ message: "users fetched successfully", mentors });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    ;
}
exports.mentorController = mentorController;
