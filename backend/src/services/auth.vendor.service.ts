// services/vendor.service.ts
import { Vendor } from "../model/vendor.model";
import { ApiError } from "../utils/ApiError";

export const registerVendorService = async (
  companyName: string,
  password: string,
  personInChargeName?: string,
  commercialRegistrationNumber?: string,
  licenceNumber?: string,
  companyAddress?: string,
  whatsappNumber?: string,
  serviceProvided?: string[],
  coordinates?: number[]
) => {
  // 1️⃣ Check if vendor with same company name exists
  const existingVendor = await Vendor.findOne({ companyName });
  if (existingVendor) throw new ApiError(400, "Vendor already exists");

  // 2️⃣ Create Vendor
  const vendor = await Vendor.create({
    companyName,
    password,
    personInChargeName,
    commercialRegistrationNumber,
    licenceNumber,
    companyAddress,
    whatsappNumber,
    serviceProvided,
    location: {
      type: "Point",
      coordinates,
    },
    role: "vendor",
  });

  // 3️⃣ Generate tokens
  const accessToken = vendor.generateAccessToken();
  const refreshToken = vendor.generateRefreshToken();

  // 4️⃣ Save refresh token
  (vendor as any).refreshToken = refreshToken;
  await vendor.save({ validateBeforeSave: false });

  return { vendor, accessToken, refreshToken };
};

export const loginVendorService = async (
  companyName: string,
  password: string
) => {
  const vendor = await Vendor.findOne({ companyName });
  if (!vendor) throw new ApiError(404, "Vendor not found");

  const isPasswordCorrect = await vendor.comparePassword(password);
  if (!isPasswordCorrect) throw new ApiError(401, "Invalid credentials");

  const accessToken = vendor.generateAccessToken();
  const refreshToken = vendor.generateRefreshToken();

  (vendor as any).refreshToken = refreshToken;
  await vendor.save();

  return { vendor, accessToken, refreshToken };
};
