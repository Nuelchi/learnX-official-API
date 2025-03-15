"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 9000;
// Serve favicon
app.use("/favicon.ico", express_1.default.static(path_1.default.join(__dirname, "public", "favicon.ico")));
//ROUTE IMPORTS
const mongoose_1 = __importDefault(require("mongoose"));
const user_route_1 = __importDefault(require("./Routes/user.route"));
const admin_route_1 = __importDefault(require("./Routes/admin.route"));
const course_route_1 = __importDefault(require("./Routes/course.route"));
const courseEnroll_route_1 = __importDefault(require("./Routes/courseEnroll.route"));
const paystack_route_1 = __importDefault(require("./Routes/paystack.route"));
const weeklyTask_route_1 = __importDefault(require("./Routes/weeklyTask.route"));
const certificate_route_1 = __importDefault(require("./Routes/certificate.route"));
const mentor_route_1 = __importDefault(require("./Routes/mentor.route"));
//MIDDLEWARES
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*", // Allow both specific frontend and any origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
//ROUTES
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/admin", admin_route_1.default);
app.use("/api/v1/course", course_route_1.default);
app.use("/api/v1/enroll", courseEnroll_route_1.default);
app.use("/api/v1/payment", paystack_route_1.default);
app.use("/", paystack_route_1.default);
app.use("/api/v1/Asessments", weeklyTask_route_1.default);
app.use("/api/v1/certificate", certificate_route_1.default);
app.use("/api/v1/mentor", mentor_route_1.default);
//DATABASE CONNECTION
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => console.log("mongoDb connected"))
    .catch((err) => console.log("mongoDB connection error", err));
//PORT
app.listen(PORT, () => console.log(`server is successfully connected at http://localhost:${PORT}`));
