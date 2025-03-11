import { Request, Response, NextFunction } from "express";
import User from "../Model/user.model";
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: { _id: string };
}

export class Authorization {

    //midlleware to verify payment before access  to course
    payAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const user = await User.findById(req.user._id);
            if (!user || (!user.isSubscribed && user.role !== "admin")) {
                return res.status(403).json({ message: "Access denied. Subscription required." });
            }

            next();
        } catch (error: any) {
            res.status(500).json({ error: "Server error" });
        }
    }

    //middleware to verify JWT
    authUser = async (req: Request & { user?: any }, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader || !authorizationHeader.toLowerCase().startsWith("bearer")) {
                res.status(401).json({ message: "Authorization header missing or invalid" });
                return;
            }

            const token = authorizationHeader.split(" ")[1]; // Extract the token
            const decoded: any = jwt.verify(token, process.env.SECRET_STRING as string); // Verify token


            const user = await User.findById(decoded.id);
            if (!user) {
                res.status(400).json({ message: "User with token not found in DB. Please sign up or log in." });
                return;
            }

            req.user = user; // Attach user object to request
            req.user.id =
                next();
        } catch (error: any) {
            console.error("Token verification failed:", error.message);
            res.status(401).json({ message: "Invalid or expired token" });
        }
    };



    // Middleware to restrict certain roles
    restriction = (...roles: string[]) => {
        return (req: Request & { user?: any }, res: Response, next: NextFunction): void => {
            if (!req.user) {
                res.status(401).json({ message: "User not authenticated" });
                return;
            }

            if (!roles.includes(req.user.role)) {
                res.status(403).json({ message: "You do not have access to perform this action" });
                return;
            }

            next();
        };
    };
};