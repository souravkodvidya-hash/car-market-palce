"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const VendorRegisterStep1: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    companyName: "",
    personInChargeName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    router.push("/auth/vendor-auth/vendor-sign-up/vendor-sign-up2");
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg w-full max-w-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          Vendor Registration
        </h2>

        <input
          name="companyName"
          placeholder="Company Name"
          className="border p-3 rounded"
          value={form.companyName}
          onChange={handleChange}
          required
        />

        <input
          name="personInChargeName"
          placeholder="Person In Charge Name"
          className="border p-3 rounded"
          value={form.personInChargeName}
          onChange={handleChange}
          required
        />

        <input
          name="phoneNumber"
          placeholder="Phone Number"
          className="border p-3 rounded"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-3 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="border p-3 rounded"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={form.termsAccepted}
            onChange={handleChange}
            required
          />
          I agree to the Terms & Conditions
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default VendorRegisterStep1;
