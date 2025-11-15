"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, Wrench, Clock, Package, Shield, Lightbulb } from 'lucide-react';

export default function ServiceCatalog() {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      icon: <Settings className="w-12 h-12" />,
      title: "General Fixes",
      subtitle: "Quick repairs",
      badge: "3hr",
      color: "bg-black",
      textColor: "text-white"
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Service Available",
      subtitle: "Multiple services",
      badge: "24hr",
      color: "bg-red-600",
      textColor: "text-white"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Warranty",
      subtitle: "Protected service",
      badge: "30d",
      color: "bg-black",
      textColor: "text-white"
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Instant Service",
      subtitle: "Same day",
      badge: "1hr",
      color: "bg-black",
      textColor: "text-white"
    },
    {
      icon: <Package className="w-12 h-12" />,
      title: "Robot Control",
      subtitle: "Automated systems",
      badge: "Pro",
      color: "bg-black",
      textColor: "text-white"
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Top related services",
      subtitle: "Best options",
      badge: "New",
      color: "bg-white",
      textColor: "text-black",
      border: "border-2 border-gray-200"
    }
  ];

  const images = [
    { url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400", title: "Workshop Space", badge: "Available", time: "24/7" },
    { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400", title: "Creative Workspace", badge: "Office Setup", time: "9-5" },
    { url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400", title: "Modern Office", badge: "Tech Space", time: "24/7" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Services</h1>
            <p className="text-sm text-gray-500">Choose your service</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button 
          onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => setActiveIndex(Math.min(services.length - 1, activeIndex + 1))}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Service Cards Container */}
        <div className="overflow-hidden px-16">
          <div 
            className="flex gap-6 transition-transform duration-300"
            style={{ transform: `translateX(-${activeIndex * 320}px)` }}
          >
            {services.map((service, index) => (
              <div key={index} className="flex-shrink-0 w-72">
                {/* Service Card */}
                <div className={`${service.color} ${service.textColor} ${service.border || ''} rounded-2xl p-6 mb-4 relative overflow-hidden`}>
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-12">
                    {service.icon}
                  </div>
                  
                  {/* Text Content */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className={`text-sm ${service.textColor === 'text-white' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {service.subtitle}
                    </p>
                  </div>
                  
                  {/* Footer Dots */}
                  <div className="flex gap-1 mt-8">
                    <div className={`w-2 h-2 rounded-full ${service.textColor === 'text-white' ? 'bg-white' : 'bg-black'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${service.textColor === 'text-white' ? 'bg-white' : 'bg-black'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${service.textColor === 'text-white' ? 'bg-white' : 'bg-black'}`}></div>
                  </div>
                </div>

                {/* Image Card */}
                {index < images.length && (
                  <div className="relative rounded-2xl overflow-hidden h-64">
                    <img 
                      src={images[index].url} 
                      alt={images[index].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-400 text-black text-xs font-bold px-2 py-1 rounded">
                          {images[index].badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-lg">{images[index].title}</h4>
                      <p className="text-sm text-gray-200">{images[index].time}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex ? 'bg-black w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}