import mongoose, { Document,Schema } from "mongoose";
const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["tire_change", "car_transport", "battery", "car_wash"],
      required: true,
    },
    description: { type: String },  // Optional description for the service

    // Prices for tire-related services: an array of price tiers
    tirePriceTiers: [
      {
        numberOfItems: { type: Number},
        price: { type: Number },
      },
    ],

    // Prices for battery service: a fixed price and check-in issue price
    batteryPrice: {
      standardPrice: { type: Number },  // Standard price for a battery
      checkInIssuePrice: { type: Number }, // Price when there’s an issue during check-in
    },

    // Car wash service: one fixed price
    carWashPrice: { type: Number },

    // Towing service: one fixed price
    towingPrice: { type: Number },

    // Vendor this service belongs to
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },

  },
  { timestamps: true }
);

export const Service  = mongoose.model("Service",ServiceSchema)
  