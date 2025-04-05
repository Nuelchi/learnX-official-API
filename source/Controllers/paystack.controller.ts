import { Request, Response } from "express";
import { paystackService } from "../Services/paystackService";
import Payment from "../Model/payment.model";
import User from "../Model/user.model";

export class InitializePayment {
    // Initialize Payment
    initPay = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }

            const amount = 450000; // Fixed amount

            // Initialize payment with Paystack
            const paymentResponse = await paystackService.initializePayment(user.email, amount);

            if (!paymentResponse.status || !paymentResponse.data || !paymentResponse.data.reference) {
                res.status(500).json({ message: "Failed to initialize payment with Paystack." });
                return;
            }

            const reference = paymentResponse.data.reference; // Get Paystack reference

            // Save payment in the database using Paystack's reference
            const newPayment = new Payment({
                userId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                userEmail: user.email,
                amount,
                reference, // Use Paystack reference
                status: "pending",
            });

            await newPayment.save();

            res.status(200).json(paymentResponse);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
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

            if (!reference) {
                res.status(400).json({ message: "Reference is required" });
                return;
            }

            // Verify payment via Paystack
            const verificationResponse: any = await paystackService.verifyPayment(reference);

            if (!verificationResponse.status || verificationResponse.data.status !== "success") {
                res.status(400).json({ message: "Payment verification failed", details: verificationResponse });
                return;
            }

            // Update payment status in DB to "paid"
            const updatedPayment = await Payment.findOneAndUpdate(
                { reference },
                { status: "paid" }, // Update status to 'paid'
                { new: true } // Return the updated document
            );

            if (!updatedPayment) {
                res.status(404).json({ message: "Payment record not found in database" });
                return;
            }

            // Mark the user as subscribed
            await User.findByIdAndUpdate(user._id, { isSubscribed: true });

            res.status(200).json({ message: "Payment verified and status updated to paid", verificationResponse });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
        // Get User Payment Details
        getAllPayment = async (req: Request, res: Response): Promise<void> => {
            try {
      
                const payments = await Payment.find();
    
                if (!payments || payments.length === 0) {
                    res.status(404).json({ message: "No payment records found." });
                    return;
                }
    
                res.status(200).json({ message: "User payment records retrieved successfully", payments });
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        };
}