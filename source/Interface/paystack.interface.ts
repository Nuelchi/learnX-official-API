import { Document, Schema, model } from "mongoose";

export interface IPayment extends Document {
  userId: Schema.Types.ObjectId;
  userEmail: string;
  amount: number;
  reference: string;
  status: "pending" | "success" | "failed";
  transactionDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}