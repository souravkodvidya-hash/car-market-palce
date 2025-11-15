"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
// import { GoogleIcon, AppleIcon } from "@/components/Icons"; // optional

export default function Sing_iNPage() {
  const router = useRouter();
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen bg-[#F2EEE7] flex items-center justify-center px-4">
      <div className="bg-white rounded-[35px] shadow-md w-full max-w-md p-6 relative">

        {/* Back button */}
        <button
          className="absolute top-4 left-4 text-gray-600"
          onClick={() => router.back()}
        >
          ←
        </button>

        {/* Log In Title */}
        <h2 className="text-center text-2xl font-bold mt-8">Log In</h2>
        <p className="text-center text-sm mt-2">
          I don’t have an account.{" "}
          <span className="text-black font-semibold cursor-pointer">
            Sign Up
          </span>
        </p>

        {/* FORM */}
        <div className="mt-6 space-y-4">

          {/* Email / Phone */}
          <div className="relative">
            <input
              type="text"
              placeholder="Email or Phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
              value={emailPhone}
              onChange={(e) => setEmailPhone(e.target.value)}
            />
            <span className="absolute right-3 top-3.5 text-gray-500">👤</span>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
            >
              👁️
            </span>
          </div>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
            >
              👁️
            </span>
          </div>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
            >
              👁️
            </span>
          </div>

          {/* Forgot Password */}
          <p className="text-sm font-semibold text-black cursor-pointer">
            I forgot my password
          </p>

          {/* Login Button */}
          <button className="w-full bg-black text-white py-3 rounded-xl mt-2">
            Log In
          </button>
        </div>

        {/* OR */}
        <p className="text-center text-sm mt-5 text-gray-600">Or Log In with:</p>

        {/* Social Login Buttons */}
        <div className="mt-4 flex gap-3">
          <button className="w-1/2 py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-2 bg-white">
            <img src="/google-logo.png" className="w-5 h-5" />
            Google
          </button>

          <button className="w-1/2 py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-2 bg-white">
            <img src="/apple-logo.png" className="w-5 h-5" />
            Apple
          </button>
        </div>

        {/* Bottom Illustration */}
        <div className="w-full mt-8 opacity-70">
          <img src="/city-footer.svg" alt="city" className="w-full" />
        </div>
      </div>
    </div>
  );
}
