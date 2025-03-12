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
exports.CourseEnrollController = void 0;
const courseEnroll_service_1 = require("../Services/courseEnroll.service");
class CourseEnrollController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enrollment = yield courseEnroll_service_1.CourseEnrollService.enrollUser(req.body);
                res.status(201).json({ message: "Submitted successfully ", enrollment });
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
    }
}
exports.CourseEnrollController = CourseEnrollController;
