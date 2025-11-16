import mongoose, { mongo } from "mongoose";
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  
    requestType: {
      type: String,
      enum: ["immediate", "scheduled"],
      required: true
    },
  
    scheduledDate: { type: Date },  // if scheduled,
    
    note: String,
  
    userLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: { type: [Number], required: true }
    },
  
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending"
    }
  }, { timestamps: true });
  export const Order  = mongoose.model("Order",orderSchema)
  