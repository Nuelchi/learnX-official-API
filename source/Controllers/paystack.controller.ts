import { Request, Response } from "express";
import { paystackService } from "../Services/paystackService";
import axios from "axios";
import Payment from "../Model/payment.model";
import User from "../Model/user.model";

export class InitializePayment {
    // Initialize Payment
    initPay = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ success: false, message: "Unauthorized. User not found." });
                return;
            }

            const amount = 45000000; // Fixed amount

            // Initialize payment with Paystack
            const response = await axios.post(
                "https://api.paystack.co/transaction/initialize",
                { email: user.email, amount },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const paymentData = response.data.data;

            if (!paymentData || !paymentData.reference) {
                res.status(500).json({ success: false, message: "Failed to initialize payment with Paystack." });
                return;
            }

            // Save payment in the database using Paystack's response status
            await Payment.create({
                userId: user._id,
                userEmail: user.email,
                amount,
                reference: paymentData.reference,
                status: paymentData.status, // Use Paystack's status
            });


            res.status(200).json({ success: true, message: "Payment initialized", data: paymentData });
        } catch (error: any) {
            res.status(500).json({ success: false, message: "Error initializing payment", error: error.message });
        }
    };


    // Verify Payment
    verifyPay = async (req: Request, res: Response): Promise<void> => {
        try {
            const { reference } = req.params;
            const user = (req as any).user;

            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }
            const subscriptionUpdated = await this.updateSubscription(user.email);

            if (!subscriptionUpdated) {
                res.status(500).json({ message: "Payment verified but subscription update failed" });
                return;
            }

            if (!reference) {
                res.status(400).json({ message: "Reference is required" });
                return;
            }

            // Verify payment via Paystack
            const verificationResponse: any = await paystackService.verifyPayment(reference);

            console.log("Paystack Verification Response:", verificationResponse);

            if (!verificationResponse.status || verificationResponse.data.status !== "success") {
                res.status(400).json({ message: "Payment verification failed", details: verificationResponse });
                return;
            }

            // Update payment status in DB to "paid"
            const updatedPayment = await Payment.findOneAndUpdate(
                { reference },
                { status: "paid" },
                { new: true }
            );

            if (!updatedPayment) {
                res.status(404).json({ message: "Payment record not found in database" });
                return;
            }

            // Call the function to update subscription status

            res.status(200).json({
                message: "Payment verified, status updated, and user subscribed",
                payment: updatedPayment
            });

        } catch (error: any) {
            console.error("Error in verifyPay:", error);
            res.status(500).json({ message: error.message });
        }
    };

    // Update user subscription status
    updateSubscription = async (email: string): Promise<boolean> => {
        try {
             console.log("Updating subscription for email:", email);

            const updatedUser = await User.findOneAndUpdate(
                { email },
                { $set: { isSubscribed: true } },
                { new: true }
            );

            if (!updatedUser) {
                console.error("User not found, subscription not updated.");
                return false;
            }

             console.log("User subscription updated successfully:", updatedUser);
            return true;
        } catch (error: any) {
            console.error("Error updating user subscription:", error.message);
            return false;
        }
    };
    
}
