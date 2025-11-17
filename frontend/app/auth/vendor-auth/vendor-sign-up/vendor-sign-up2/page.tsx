"use client";
import React, { useState } from "react";

const serviceOptions = [
  { id: "tire_change", label: "Tire Change" },
  { id: "car_transport", label: "Car Transport" },
  { id: "battery", label: "Battery" },
  { id: "car_wash", label: "Car Wash" },
];

const VendorRegisterStep2: React.FC = () => {
  const [form, setForm] = useState({
    commercialRegistrationNumber: "",
    licenceNumber: "",
    companyAddress: "",
    whatsappNumber: "",
    serviceProvided: [] as string[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      serviceProvided: prev.serviceProvided.includes(service)
        ? prev.serviceProvided.filter((s) => s !== service)
        : [...prev.serviceProvided, service],
    }));
  };

  const handleSubmit = () => {
    console.log("Final Vendor Data:", form);
    alert("Vendor Registered Successfully!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-lg flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Business Details
        </h2>

        <input
          name="commercialRegistrationNumber"
          placeholder="Commercial Registration Number"
          className="border p-3 rounded"
          value={form.commercialRegistrationNumber}
          onChange={handleInputChange}
          required
        />

        <input
          name="licenceNumber"
          placeholder="Licence Number"
          className="border p-3 rounded"
          value={form.licenceNumber}
          onChange={handleInputChange}
          required
        />

        <input
          name="companyAddress"
          placeholder="Company Address"
          className="border p-3 rounded"
          value={form.companyAddress}
          onChange={handleInputChange}
          required
        />

        <input
          name="whatsappNumber"
          placeholder="WhatsApp Number"
          className="border p-3 rounded"
          value={form.whatsappNumber}
          onChange={handleInputChange}
          required
        />

        <h3 className="font-medium mt-2">Services Provided</h3>

        <div className="flex flex-col gap-2">
          {serviceOptions.map((service) => (
            <label key={service.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.serviceProvided.includes(service.id)}
                onChange={() => toggleService(service.id)}
              />
              {service.label}
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Submit Business Info
        </button>
      </div>
    </div>
  );
};

export default VendorRegisterStep2;
