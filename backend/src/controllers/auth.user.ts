import { Request, Response, NextFunction } from "express";
import { User } from "../model/user.model";
import { ApiResponse } from "../utils/ApiResonse";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import {loginUserService, registerUserService} from "../services/auth.service"

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password, phoneNumber } = req.body;

  if (!fullName || !email || !password || !phoneNumber) {
    throw new ApiError(400, "All fields are required");
  }

  const { user, accessToken, refreshToken } = await registerUserService(
    fullName,
    email,
    password,
    phoneNumber
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
          user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
          },
          accessToken,
          refreshToken,
        },
        "User registered successfully"
      )
    );
});



export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

 const {user,accessToken,refreshToken} = await loginUserService(email,password)

  // Send tokens as HttpOnly cookies
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 min
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json(new ApiResponse(200, { accessToken, refreshToken }, "Login successful"));
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  console.log("heloooooooooooooooo",req.cookies)
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    await User.updateOne({ refreshToken }, { $unset: { refreshToken: "" } });
  }

  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new ApiError(401, "No refresh token provided");

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { _id: string };
  const user = await User.findById(decoded._id);
  if (!user || user.refreshToken !== refreshToken)
    throw new ApiError(401, "Invalid refresh token");

  const newAccessToken = user.generateAccessToken();

  res
    .cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    })
    .json(new ApiResponse(200, { accessToken: newAccessToken }, "Token refreshed"));
});
