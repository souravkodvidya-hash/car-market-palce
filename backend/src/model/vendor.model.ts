import {Schema } from "mongoose";
import {User} from "../model/user.model"
const VendorSchema = new Schema({
  companyName: { type: String, required: true },
  personInChargeName: String,
  commercialRegistrationNumber: String,
  licenceNumber: String,
  companyAddress: String,
  whatsappNumber: String,
  available: { type: Boolean, default: true },

  serviceProvided: {
    type: [String],
    enum: ["tire_change", "car_transport", "battery", "car_wash"],
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: { type: [Number], required: true }
  },

  rating: { type: Number, default: 0 },
});


// Create Vendor model (using discriminator for the vendor role)
export const Vendor = User.discriminator('Vendor', VendorSchema);