import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import path from "path";




const app = express();
const PORT = process.env.PORT || 9000
// Serve favicon
app.use("/favicon.ico", express.static(path.join(__dirname, "public", "favicon.ico")));

//ROUTE IMPORTS
import mongoose from "mongoose";
import userRoute from "./Routes/user.route"
import adminRoute from "./Routes/admin.route"
import courseRoute from "./Routes/course.route"
import courseEnrollRoute from "./Routes/courseEnroll.route"
import paymentRoute from "./Routes/paystack.route";
import TaskRoute from "./Routes/weeklyTask.route"
import certRoute from "./Routes/certificate.route"
import mentorRoute from "./Routes/mentor.route"
import trackingRoutes from "./Routes/trackingRoutes"


//MIDDLEWARES
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const allowedOrigins = [
    "https://learnxuser.netlify.app",
    "https://learnxadmin.netlify.app",
    "https://learnx-official-api.onrender.com"

];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));


//ROUTES
app.use("/api/v1/user", userRoute)
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/enroll", courseEnrollRoute)
app.use("/api/v1/payment", paymentRoute)
app.use("/", paymentRoute)
app.use("/api/v1/Asessments", TaskRoute)
app.use("/api/v1/certificate", certRoute)
app.use("/api/v1/mentor", mentorRoute)
app.use("/api/v1/tracking", trackingRoutes)



//DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL as string)
.then(()=>console.log("mongoDb connected"))
.catch((err)=>console.log("mongoDB connection error", err));

//PORT
app.listen(PORT, ()=>
    console.log(`server is successfully connected at http://localhost:${PORT}`));

