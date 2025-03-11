import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../Model/user.model";
import  dotenv  from "dotenv";
dotenv.config();



passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.NODE_ENV === "production" 
            ? "https://learnx-official-api.onrender.com/auth/google/callback"
            : "http://localhost:9000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ googleId: profile.id });
            if (!user) {
                user = await userModel.findOne({ email: profile.emails?.[0].value });
                if (!user) {
                    user = await userModel.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails?.[0].value || "",
                        password: "password",
                        confirmPassword: "password",
                        role: "user",
                    });
                }
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Serialize user to store user info in session
passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
// Deserialize user from session (fetch full user data)
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);  // Attach the user object to req.user
    } catch (error) {
        done(error, null);
    }
});