import mongoose, {Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import {User} from "../model/user.model"

import { Document } from "mongoose";

export interface IVendor extends Document {
  companyName: string;
  personInChargeName?: string;
  commercialRegistrationNumber?: string;

  email?: string;               // Not in schema (optional to avoid TS error)
  password: string;
  phoneNumber?: string;         // Not in schema (optional)
  refreshToken?: string;
  role?: string;

  licenceNumber?: string;
  companyAddress?: string;
  whatsappNumber?: string;

  available?: boolean;

  serviceProvided?: ("tire_change" | "car_transport" | "battery" | "car_wash")[];

  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };

  rating: number;

  // Methods
  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}



const VendorSchema = new Schema<IVendor>({
  companyName: { type: String, required: true },
  personInChargeName: String,
  commercialRegistrationNumber: String,
  password: { type: String, required: true },
  licenceNumber: String,
  companyAddress: String,
  whatsappNumber: String,
  role: String,
  refreshToken:String,
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

//hash pasword before saving 
VendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
VendorSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Generate Access Token
VendorSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" } // short lifespan
  );
};

// Generate Refresh Token
VendorSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" } // longer lifespan
  );
};


export const Vendor = mongoose.model("Vendor",VendorSchema)
// Create Vendor model (using discriminator for the vendor role)
// export const Vendor = User.discriminator('Vendor', VendorSchema);