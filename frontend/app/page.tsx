"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";
export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth/select-user-type");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <img src="/logo.png" alt="CarHelp" className="w-40" /> */}
      <p>Loading...</p>
    </div>
  );
}
