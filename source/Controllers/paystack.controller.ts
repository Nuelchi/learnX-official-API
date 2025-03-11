import { Request, Response } from "express";
import { paystackService } from "../Services/paystackService";
import Payment from "../Model/payment.model";
import User from "../Model/user.model";

export class InitializePayment {
    initPay = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }

            const reference = Math.random().toString(36).substring(2, 15);
            const amount = 100000; // Fixed amount

            // ✅ Save payment in the database
            const newPayment = new Payment({
                userId: user._id, // Use `_id` from the user object
                userEmail: user.email,
                amount,
                reference,
                status: "pending",
            });

            await newPayment.save();

            const paymentResponse = await paystackService.initializePayment(user.email, amount);

            res.status(200).json(paymentResponse);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };


    
    verifyPay = async (req: Request, res: Response): Promise<void> => {
        try {
            const { reference } = req.params;
            const user = (req as any).user;
    
            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }
    
            if (!reference) {
                res.status(400).json({ message: "Reference is required" });
                return;
            }
    
            // Verify payment via Paystack
            const verificationResponse:any = await paystackService.verifyPayment(reference);
    
            if (typeof verificationResponse.status !== "string" || verificationResponse.status.toLowerCase() !== "success") {
                res.status(400).json({ message: "Payment verification failed", details: verificationResponse });
                return;
            }
    
            // ✅ Update payment status in DB to "paid"
            await Payment.findOneAndUpdate(
                { reference },
                { status: "paid" }, // Update status to 'paid'
                { new: true } // Return the updated document
            );
    
            // ✅ Mark the user as subscribed
            await User.findByIdAndUpdate(user._id, { isSubscribed: true });
    
            res.status(200).json({ message: "Payment verified and status updated to paid", verificationResponse });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }}
    };
