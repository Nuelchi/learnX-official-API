"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const certificate_controller_1 = require("../Controllers/certificate.controller");
const auth_middleware_1 = require("../Authorization/auth.middleware");
const { authUser } = new auth_middleware_1.Authorization();
const { addCertificate, getCertForUser } = new certificate_controller_1.certificateController();
const router = (0, express_1.Router)();
// Routes
router.post("/addCert", addCertificate);
router.get("/getCert", authUser, getCertForUser);
exports.default = router;
