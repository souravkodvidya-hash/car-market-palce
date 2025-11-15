import mongoose from "mongoose";
const carSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true }
  }, { timestamps: true });
  