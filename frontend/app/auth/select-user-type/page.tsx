import React from 'react';
import Link from 'next/link';
const ServiceButtons: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6">
        <Link href="/auth/vendor-auth/vendor-sign-up" className="px-6 py-3 text-lg font-medium bg-gray-200 border border-gray-400 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          I am a Service Provider
        </Link>
        <Link href="/auth/user-auth/sign-up" className="px-6 py-3 text-lg font-medium bg-gray-200 border border-gray-400 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          I am Looking for a Service
        </Link>
      </div>
    </div>
  );
};

export default ServiceButtons;
