import express, { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import passport from "passport";
 // Ensure passport strategy is loaded before using it
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";
import './Services/googleAuth.service'

const app = express();
const PORT = process.env.PORT || 9000


//ROUTE IMPORTS
import mongoose from "mongoose";
import userRoute from "./Routes/user.route"
import adminRoute from "./Routes/admin.route"
import courseRoute from "./Routes/course.route"
import paymentRoute from "./Routes/paystack.route";


//MIDDLEWARES
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:9000",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL, 
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true in production (HTTPS)
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());


//ROUTES
app.use("/api/v1/user", userRoute)
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/payment", paymentRoute)



//GOOGLE SIGIN SERVER AND SETUP
type User = {
    name: string;
    email: string;
  };
  app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
    }),
    (req:Request, res:Response) => {
      res.redirect('/profile'); 
    }
  );
//profile route
app.get('/profile', (req:Request, res:Response) => {
    const user = req.user as User;
    res.send(`welcome ${user.name} you have successfully signed into E-commerce app, you may continue your shopping now!!`)
});
//logout route
app.get("/logout", (req: Request, res: Response) => {
    req.logout(() => {
      res.redirect("/");
    });
  });






//DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL as string)
.then(()=>console.log("mongoDb connected"))
.catch((err)=>console.log("mongoDB connection error", err));

//PORT
app.listen(PORT, ()=>
    console.log(`server is successfully connected at http://localhost:${PORT}`));

