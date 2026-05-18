"use client";

import React, { useState } from "react";
import { Phone, Mail, Star, Eye } from "lucide-react";
import ViewVendorModal from "@/components/ViewVendorModal";
import AddVendorModal from "@/components/AddVendorModal";

export default function VendorsPage() {
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const vendors = [
    {
      id: 1,
      initial: "C",
      name: "ChemCorp Coatings",
      type: "Powder Coatings",
      status: "Active",
      phone: "+1 (713) 555-1234",
      email: "rchen@chemcorp.com",
      rating: 5,
      ordersText: "42 orders - $87,400",
      activePOs: "3 active POs"
    },
    {
      id: 2,
      initial: "P",
      name: "ProPowder Supply",
      type: "Powder Coatings",
      status: "Active",
      phone: "+1 (214) 555-5678",
      email: "mjohnson@propowder.com",
      rating: 4,
      ordersText: "28 orders - $54,200",
      activePOs: "1 active POs"
    },
    {
      id: 3,
      initial: "I",
      name: "Industrial Gas Co.",
      type: "Gas & Fuel",
      status: "Active",
      phone: "+1 (512) 555-9012",
      email: "sbrown@indgas.com",
      rating: 4,
      ordersText: "18 orders - $12,600",
      activePOs: "2 active POs"
    },
    {
      id: 4,
      initial: "M",
      name: "Metal Prep Inc.",
      type: "Chemicals",
      status: "Inactive",
      phone: "+1 (210) 555-3456",
      email: "kdavis@metalprep.com",
      rating: 3,
      ordersText: "8 orders - $7,500",
      activePOs: "0 active POs"
    },
    {
      id: 5,
      initial: "B",
      name: "Blast Media TX",
      type: "Abrasives",
      status: "Active",
      phone: "+1 (713) 555-7890",
      email: "twilson@blastmedia.com",
      rating: 5,
      ordersText: "14 orders - $19,800",
      activePOs: "1 active POs"
    }
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900">Vendors</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">5 registered vendors</p>
        </div>
        <div>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors shadow-sm flex items-center"
          >
            <span className="mr-1.5 text-lg leading-none">+</span> Add Vendor
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm">
          <div className="text-[28px] font-bold text-blue-600 mb-1 leading-none">5</div>
          <div className="text-[13px] font-medium text-slate-500">Total Vendors</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm">
          <div className="text-[28px] font-bold text-emerald-500 mb-1 leading-none">4</div>
          <div className="text-[13px] font-medium text-slate-500">Active</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm">
          <div className="text-[28px] font-bold text-amber-500 mb-1 leading-none">7</div>
          <div className="text-[13px] font-medium text-slate-500">Active POs</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm">
          <div className="text-[28px] font-bold text-[#8b5cf6] mb-1 leading-none">$181K</div>
          <div className="text-[13px] font-medium text-slate-500">Total Spend</div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            
            {/* Top row */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-[42px] h-[42px] bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-[16px] shadow-sm shrink-0">
                  {vendor.initial}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900 leading-tight">{vendor.name}</h3>
                  <p className="text-[12px] text-slate-400 font-medium mt-0.5">{vendor.type}</p>
                </div>
              </div>
              <div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  vendor.status === "Active" ? "bg-[#d1fae5] text-emerald-600" : "bg-slate-100 text-slate-600"
                }`}>
                  {vendor.status}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-2.5 mb-6">
              <div className="flex items-center text-slate-500">
                <Phone size={14} className="mr-2.5 text-slate-400 shrink-0" />
                <span className="text-[13px] font-medium">{vendor.phone}</span>
              </div>
              <div className="flex items-center text-slate-500">
                <Mail size={14} className="mr-2.5 text-slate-400 shrink-0" />
                <span className="text-[13px] font-medium">{vendor.email}</span>
              </div>
            </div>

            {/* Ratings and Stats */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={`${i < vendor.rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-slate-300"}`} 
                  />
                ))}
              </div>
              <span className="text-[12px] font-medium text-slate-400">{vendor.ordersText}</span>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-5 flex justify-between items-center mt-auto">
              <span className="text-[13px] font-medium text-slate-500">{vendor.activePOs}</span>
              <button 
                onClick={() => setSelectedVendor(vendor)}
                className="flex items-center px-3.5 py-1.5 border border-slate-200 rounded-full text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Eye size={14} className="mr-1.5 text-slate-400" />
                View Details
              </button>
            </div>

          </div>
        ))}
      </div>

      <ViewVendorModal 
        isOpen={!!selectedVendor} 
        onClose={() => setSelectedVendor(null)} 
        vendor={selectedVendor} 
      />

      <AddVendorModal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
      />

    </div>
  );
}
