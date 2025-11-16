// auth.service.ts
import { User } from "../model/user.model";
import {ApiError} from "../utils/ApiError";

export const registerUserService = async (
  fullName: string,
  email: string,
  password: string,
  phoneNumber: string
) => {
  // 1️⃣ Check if email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }

  // 2️⃣ Create user
  const user = await User.create({ fullName, email, password, phoneNumber });

  // 3️⃣ Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // 4️⃣ Save refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { user, accessToken, refreshToken };
};

export const loginUserService = async(email : string,password : string)=>{
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");
  
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new ApiError(401, "Invalid credentials");
  
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
  
    user.refreshToken = refreshToken;
    await user.save();

    return{user,accessToken,refreshToken}
}