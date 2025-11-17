// controllers/vendor.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResonse";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { Vendor } from "../model/vendor.model";
import {
  registerVendorService,
  loginVendorService,
} from "../services/auth.vendor.service";

export const registerVendor = asyncHandler(async (req: Request, res: Response) => {
  console.log("bodyyyyy",req.body)
  const {
    companyName,
    password,
    personInChargeName,
    commercialRegistrationNumber,
    licenceNumber,
    companyAddress,
    whatsappNumber,
    serviceProvided,
    coordinates,
  } = req.body;

  if (!companyName || !password || !coordinates) {
    throw new ApiError(400, "companyName, password, and coordinates are required");
  }

  const { vendor, accessToken, refreshToken } = await registerVendorService(
    companyName,
    password,
    personInChargeName,
    commercialRegistrationNumber,
    licenceNumber,
    companyAddress,
    whatsappNumber,
    serviceProvided,
    coordinates
  );

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json(
      new ApiResponse(
        201,
        {
          vendor,
          accessToken,
          refreshToken,
        },
        "Vendor registered successfully"
      )
    );
});

export const loginVendor = asyncHandler(async (req: Request, res: Response) => {
  const { companyName, password } = req.body;

  const { vendor, accessToken, refreshToken } = await loginVendorService(
    companyName,
    password
  );

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(new ApiResponse(200, { accessToken, refreshToken }, "Login successful"));
});

export const logoutVendor = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    await Vendor.updateOne({ refreshToken }, { $unset: { refreshToken: "" } });
  }

  res.clearCookie("accessToken").clearCookie("refreshToken").json(
    new ApiResponse(200, null, "Vendor logged out successfully")
  );
});

export const refreshAccessTokenVendor = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new ApiError(401, "No refresh token provided");

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as { _id: string };

    const vendor = await Vendor.findById(decoded._id);
    if (!vendor || (vendor as any).refreshToken !== refreshToken)
      throw new ApiError(401, "Invalid refresh token");

    const newAccessToken = vendor.generateAccessToken();

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
      })
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken },
          "Token refreshed"
        )
      );
  }
);
