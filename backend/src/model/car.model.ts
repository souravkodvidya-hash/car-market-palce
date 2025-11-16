
import mongoose, { Schema, Document } from "mongoose";
export interface ICar {
  userId: mongoose.Schema.Types.ObjectId;  // Reference to the User who owns the car
  brand: string;                            // Car brand (e.g., Toyota)
  model: string;                            // Car model (e.g., Corolla)
  year: number;                             // Car manufacturing year
  transactionIds: mongoose.Types.ObjectId[] // Array of references to transactions
}

const CarSchema = new Schema<ICar>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    transactionIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }
    ]  // Storing references to transactions
  },
  { timestamps: true }
);

export default mongoose.model<ICar>("Car", CarSchema);
