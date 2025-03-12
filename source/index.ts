import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 9000


//ROUTE IMPORTS
import mongoose from "mongoose";
import userRoute from "./Routes/user.route"
import adminRoute from "./Routes/admin.route"
import courseRoute from "./Routes/course.route"
import courseEnrollRoute from "./Routes/courseEnroll.route"
import paymentRoute from "./Routes/paystack.route";


//MIDDLEWARES
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "https://learnx-official-api.onrender.com",
//     credentials: true, 
//     methods: ["GET", "POST", "PUT", "DELETE"], 
//     allowedHeaders: ["Content-Type", "Authorization"], 
//   })
// );



//ROUTES
app.use("/api/v1/user", userRoute)
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/enroll", courseEnrollRoute)
app.use("/api/v1/payment", paymentRoute)



//DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL as string)
.then(()=>console.log("mongoDb connected"))
.catch((err)=>console.log("mongoDB connection error", err));

//PORT
app.listen(PORT, ()=>
    console.log(`server is successfully connected at http://localhost:${PORT}`));

