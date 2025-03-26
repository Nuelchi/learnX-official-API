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
exports.certificateController = void 0;
const certificate_service_1 = require("../Services/certificate.service");
const tracking_model_1 = __importDefault(require("../Model/tracking.model"));
const course_model_1 = __importDefault(require("../Model/course.model"));
const certService = new certificate_service_1.certificateService();
class certificateController {
    // Add a new certificate
    addCertificate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const certData = req.body;
                const certificate = yield certService.addCertificate(certData);
                res.status(201).json({ message: "Certificate added successfully!", certificate });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    // Get certificates for a logged-in user
    getCertForUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(401).json({ message: "Unauthorized. User not found." });
                    return;
                }
                const email = user.email;
                const userData = yield tracking_model_1.default.findOne({ email });
                if (!userData) {
                    res.status(404).json({ message: "Tracking error: user not tracked" });
                    return;
                }
                const track = userData.track;
                const totalCourse = yield course_model_1.default.countDocuments({ category: track });
                const RemCourse = Number(userData.currentWeek);
                const RemainingCourse = Math.max(totalCourse - RemCourse, 0);
                const certificates = yield certService.getCertForUser(user.email);
                if (certificates.length === 0) {
                    res.status(404).json({ message: "No certificates found for this user.", totalCourse, RemainingCourse });
                    return;
                }
                res.status(200).json({ message: "Certificates retrieved successfully.", certificates, totalCourse, RemainingCourse });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.certificateController = certificateController;
