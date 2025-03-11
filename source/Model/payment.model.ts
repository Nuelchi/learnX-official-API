import { Document, Schema, model } from "mongoose";
import { IPayment } from "../Interface/paystack.interface";

const PaymentSchema = new Schema<IPayment>(
    {
      userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", required: true 
    },
      userEmail: { 
        type: String, 
        required: true 
    },
      amount: { 
        type: Number, 
        required: true 
    },
      reference: { 
        type: String, 
        required: true, unique: true 
    },
      status: { 
        type: String, 
        enum: ["pending", "success", "failed"], 
        default: "pending" },
      transactionDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );
  
  // Create and export the Payment model
  const Payment = model<IPayment>("Payment", PaymentSchema);
  export default Payment;