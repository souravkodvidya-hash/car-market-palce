import mongoose, { Document,Schema } from "mongoose";
const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },   // "Tyre Change"
    description: String
  });
  