import mongoose from "mongoose"
const vendorServiceSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    price: { type: Number, required: true }
  });
  