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
exports.certificateService = void 0;
const certificate_model_1 = __importDefault(require("../Model/certificate.model"));
class certificateService {
    // Add a new course
    addCertificate(certData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield certificate_model_1.default.create(certData);
        });
    }
    // Get certificates for a specific user by email
    getCertForUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const certificates = yield certificate_model_1.default.find({ email });
                return certificates;
            }
            catch (error) {
                throw new Error(`Failed to fetch certificates: ${error.message}`);
            }
        });
    }
}
exports.certificateService = certificateService;
;
