import mongoose, { Schema, Document } from "mongoose";

// Define the Transaction schema
export interface ITransaction extends Document {
  carId: mongoose.Schema.Types.ObjectId; // Reference to the car
  serviceId: mongoose.Schema.Types.ObjectId; // Reference to the service provided
  vendorId:mongoose.Schema.Types.ObjectId;
  amount: number; // Amount charged for the service
  transactionDate: Date; // Date of the transaction
  paymentStatus: "pending" | "completed" | "failed"; // Status of the payment
  paymentMethod: string; // Method of payment (e.g., Credit Card, Cash, etc.)
  serviceStatus: "pending" | "completed"; // Status of the service
}

const TransactionSchema = new Schema<ITransaction>(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    amount: { type: Number, required: true },
    transactionDate: { type: Date, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: { type: String, required: true }, // Cash, Card, etc.
    serviceStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
