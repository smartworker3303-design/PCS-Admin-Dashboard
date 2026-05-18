"use client";

import React, { useState } from "react";
import { Package, Clock, CheckCircle2, Calendar } from "lucide-react";
import ConfirmPickupModal from "@/components/ConfirmPickupModal";

export default function DeliveryPickupPage() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedPickup, setSelectedPickup] = useState<any>(null);

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-slate-900 mb-1">Pickup & Delivery</h1>
        <p className="text-[14px] text-slate-500">Manage pickups, deliveries, and returns</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Package size={20} className="text-blue-500" />
            </div>
            <span className="text-2xl font-bold text-slate-900">1</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500">Ready for Pickup</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
              <Clock size={20} className="text-amber-500" />
            </div>
            <span className="text-2xl font-bold text-slate-900">1</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500">Partial Pickup</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-500" />
            </div>
            <span className="text-2xl font-bold text-slate-900">2</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500">Delivered Today</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Calendar size={20} className="text-purple-500" />
            </div>
            <span className="text-2xl font-bold text-slate-900">1</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500">Scheduled</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-8">
        <div className="bg-slate-50/80 p-1.5 rounded-2xl inline-flex gap-1 border border-slate-100">
          <button 
            onClick={() => setActiveTab("schedule")}
            className={`px-6 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === "schedule" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            Schedule
          </button>
          <button 
            onClick={() => setActiveTab("pickup-tickets")}
            className={`px-6 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === "pickup-tickets" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            Pickup Tickets
          </button>
          <button 
            onClick={() => setActiveTab("returns")}
            className={`px-6 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === "returns" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            Returns
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === "schedule" && (
        <div className="animate-in fade-in duration-300">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-slate-900 mb-6">Pickup Schedule — This Week</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Monday */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-3 min-h-[140px]">
                <h3 className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Mon</h3>
                <div className="flex flex-col gap-2">
                  <div className="bg-blue-600 text-white px-3 py-2 rounded-full text-[12px] font-medium truncate shadow-sm text-center">
                    ABC
                  </div>
                </div>
              </div>

              {/* Tuesday */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-3 min-h-[140px]">
                <h3 className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Tue</h3>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-[12px] font-medium text-slate-300">No pickups</span>
                </div>
              </div>

              {/* Wednesday */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-3 min-h-[140px]">
                <h3 className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Wed</h3>
                <div className="flex flex-col gap-2">
                  <div className="bg-blue-600 text-white px-3 py-2 rounded-full text-[12px] font-medium truncate shadow-sm text-center">
                    Lone
                  </div>
                  <div className="bg-blue-600 text-white px-3 py-2 rounded-full text-[12px] font-medium truncate shadow-sm text-center">
                    Gulf
                  </div>
                </div>
              </div>

              {/* Thursday */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-3 min-h-[140px]">
                <h3 className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Thu</h3>
                <div className="flex flex-col gap-2">
                  <div className="bg-blue-600 text-white px-3 py-2 rounded-full text-[12px] font-medium truncate shadow-sm text-center">
                    Metro
                  </div>
                </div>
              </div>

              {/* Friday */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-3 min-h-[140px]">
                <h3 className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Fri</h3>
                <div className="flex flex-col gap-2">
                  <div className="bg-blue-600 text-white px-3 py-2 rounded-full text-[12px] font-medium truncate shadow-sm text-center">
                    Iron
                  </div>
                  <div className="bg-blue-600 text-white px-3 py-2 rounded-full text-[12px] font-medium truncate shadow-sm text-center">
                    Tex-Max
                  </div>
                </div>
              </div>

              {/* Saturday */}
              <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-3 min-h-[140px]">
                <h3 className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Sat</h3>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-[12px] font-medium text-slate-300">No pickups</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pickup Tickets Tab */}
      {activeTab === "pickup-tickets" && (
        <div className="animate-in fade-in duration-300 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">PICKUP ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TICKET</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">CUSTOMER</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">PARTS</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">READY</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">DRIVER</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">DATE</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { pickupId: "PU-0482", ticket: "TK-2847", customer: "ABC Steel Corp", parts: "24", ready: "24", driver: "John Driver", status: "Ready for Pickup", date: "Apr 21, 2026" },
                { pickupId: "PU-0481", ticket: "TK-2844", customer: "Lone Star Mfg", parts: "42", ready: "28", driver: "Maria Santos", status: "Partial Pickup", date: "Apr 20, 2026" },
                { pickupId: "PU-0480", ticket: "TK-2843", customer: "Tex-Mex Metals", parts: "6", ready: "6", driver: "Bob Turner", status: "Delivered", date: "Apr 19, 2026" },
                { pickupId: "PU-0479", ticket: "TK-2840", customer: "Coastal Pipeline", parts: "56", ready: "56", driver: "John Driver", status: "Delivered", date: "Apr 18, 2026" },
                { pickupId: "PU-0478", ticket: "TK-2839", customer: "Prime Steel Inc.", parts: "12", ready: "0", driver: "Maria Santos", status: "Scheduled", date: "Apr 22, 2026" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-[13px] font-bold text-blue-600">{row.pickupId}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{row.ticket}</td>
                  <td className="px-6 py-4 text-[13px] font-bold text-slate-700">{row.customer}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{row.parts}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{row.ready}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{row.driver}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      row.status === "Ready for Pickup" ? "bg-blue-100/80 text-blue-600" :
                      row.status === "Partial Pickup" ? "bg-amber-100/80 text-amber-600" :
                      row.status === "Delivered" ? "bg-emerald-100/80 text-emerald-600" :
                      "bg-purple-100/80 text-purple-600"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{row.date}</td>
                  <td className="px-6 py-4">
                    {(row.status === "Ready for Pickup" || row.status === "Partial Pickup") && (
                      <button 
                        onClick={() => setSelectedPickup(row)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-colors shadow-sm"
                      >
                        Confirm Pickup
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Returns Tab */}
      {activeTab === "returns" && (
        <div className="animate-in fade-in duration-300 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-[16px] font-bold text-slate-900">Return Tracking</h2>
          </div>
          <div className="flex flex-col divide-y divide-slate-100">
            {[
              { id: "P-2180", reason: "Customer requested modification", status: "In Transit", date: "Expected: Apr 24, 2026" },
              { id: "P-2175", reason: "Color mismatch", status: "Received", date: "Expected: Apr 22, 2026" },
              { id: "P-2162", reason: "Additional coating required", status: "Processing", date: "Expected: Apr 23, 2026" },
            ].map((item, idx) => (
              <div key={idx} className="px-6 py-5 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-bold text-slate-900">{item.id}</span>
                  <span className="text-[12px] text-slate-500">{item.reason}</span>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    item.status === "In Transit" ? "bg-blue-100/80 text-blue-600" :
                    item.status === "Received" ? "bg-emerald-100/80 text-emerald-600" :
                    "bg-amber-100/80 text-amber-600"
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmPickupModal 
        isOpen={!!selectedPickup} 
        onClose={() => setSelectedPickup(null)} 
        record={selectedPickup} 
      />

    </div>
  );
}
