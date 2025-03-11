
import User from "../Model/user.model";
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export const attachUserAndGenerateReference = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user; // Extract user from JWT middleware

    if (!user) {
        return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    (req as any).reference = `PAY_${crypto.randomUUID()}`; // Unique reference
    next();
};