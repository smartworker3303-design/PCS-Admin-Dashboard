"use client";

import React, { useState } from "react";
import { Package, AlertTriangle, Flame, Activity } from "lucide-react";
import InventoryCreatePOModal from "@/components/InventoryCreatePOModal";
import InventoryAddStockModal from "@/components/InventoryAddStockModal";
import InventoryAddNewModal from "@/components/InventoryAddNewModal";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("powder_inventory");
  const [poItem, setPoItem] = useState<any>(null);
  const [stockItem, setStockItem] = useState<any>(null);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);

  const chartData = [
    { date: "Apr 15", blue: 40, purple: 28, green: 20 },
    { date: "Apr 16", blue: 65, purple: 38, green: 25 },
    { date: "Apr 17", blue: 55, purple: 30, green: 15 },
    { date: "Apr 18", blue: 80, purple: 48, green: 30 },
    { date: "Apr 19", blue: 68, purple: 45, green: 28 },
    { date: "Apr 20", blue: 90, purple: 55, green: 35 },
    { date: "Apr 21", blue: 75, purple: 48, green: 25 },
  ];

  const powderInventoryData = [
    { color: "bg-blue-600", type: "Epoxy Blue RAL 5010", branch: "Houston", remaining: 8, min: 25, stockLevel: 16 },
    { color: "bg-slate-900", type: "Matte Black RAL 9005", branch: "Dallas", remaining: 12, min: 30, stockLevel: 20 },
    { color: "bg-orange-500", type: "Safety Orange RAL 2010", branch: "Houston", remaining: 45, min: 20, stockLevel: 100 },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900 leading-tight">Inventory Management</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">4 low stock alerts across all branches</p>
        </div>
        <button 
          onClick={() => setIsAddNewOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center"
        >
          <span className="mr-1.5 text-lg leading-none">+</span> Add Inventory
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Package size={16} className="text-blue-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">8</div>
            <div className="text-[12px] font-medium text-slate-400">Powder Types</div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={16} className="text-red-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">4</div>
            <div className="text-[12px] font-medium text-slate-400">Low Stock Items</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
            <Flame size={16} className="text-orange-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">4</div>
            <div className="text-[12px] font-medium text-slate-400">Propane Tanks</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
            <Activity size={16} className="text-yellow-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">18 lbs/day</div>
            <div className="text-[12px] font-medium text-slate-400">Avg. Powder Usage</div>
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-[15px] font-bold text-slate-900 mb-6">Powder Usage (lbs/day) — Last 7 Days</h2>
        
        <div className="h-48 flex items-end justify-between relative pl-8 pb-6">
          
          {/* Y Axis Guides */}
          <div className="absolute left-0 top-0 bottom-6 w-full flex flex-col justify-between">
            <div className="border-t border-slate-100 border-dashed w-full relative">
              <span className="absolute -left-6 -top-2 text-[10px] font-medium text-slate-300">28</span>
            </div>
            <div className="border-t border-slate-100 border-dashed w-full relative">
              <span className="absolute -left-6 -top-2 text-[10px] font-medium text-slate-300">21</span>
            </div>
            <div className="border-t border-slate-100 border-dashed w-full relative">
              <span className="absolute -left-6 -top-2 text-[10px] font-medium text-slate-300">14</span>
            </div>
            <div className="border-t border-slate-100 border-dashed w-full relative">
              <span className="absolute -left-6 -top-2 text-[10px] font-medium text-slate-300">7</span>
            </div>
            <div className="border-t border-slate-200 w-full relative">
              <span className="absolute -left-6 -top-2 text-[10px] font-medium text-slate-300">0</span>
            </div>
          </div>

          {/* Bar Groups */}
          {chartData.map((data, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center flex-1 h-full">
              <div className="flex-1 flex items-end gap-1 sm:gap-1.5 justify-center w-full pb-0">
                <div 
                  className="w-3 sm:w-8 bg-[#2563eb] rounded-t-sm hover:opacity-90 transition-opacity" 
                  style={{ height: `${data.blue}%` }}
                ></div>
                <div 
                  className="w-3 sm:w-8 bg-[#a855f7] rounded-t-sm hover:opacity-90 transition-opacity" 
                  style={{ height: `${data.purple}%` }}
                ></div>
                <div 
                  className="w-3 sm:w-8 bg-[#22c55e] rounded-t-sm hover:opacity-90 transition-opacity" 
                  style={{ height: `${data.green}%` }}
                ></div>
              </div>
              <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{data.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar py-1">
        <button 
          onClick={() => setActiveTab("powder_inventory")}
          className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all shrink-0 ${
            activeTab === "powder_inventory" ? "bg-blue-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          Powder Inventory
        </button>
        <button 
          onClick={() => setActiveTab("propane_tracking")}
          className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all shrink-0 ${
            activeTab === "propane_tracking" ? "bg-blue-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          Propane Tracking
        </button>
        <button 
          onClick={() => setActiveTab("low_stock_alerts")}
          className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all shrink-0 ${
            activeTab === "low_stock_alerts" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent"
          }`}
        >
          Low Stock Alerts (4)
        </button>
      </div>

      {/* Content */}
      {activeTab === "powder_inventory" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-16">Color</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Powder Type</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Branch</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Remaining</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Min. Threshold</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stock Level</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {powderInventoryData.map((item, index) => {
                  const isLowStock = item.remaining <= item.min;
                  return (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className={`w-3.5 h-3.5 rounded-full ${item.color}`}></div>
                      </td>
                      <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{item.type}</td>
                      <td className="py-4 px-6 text-[13px] text-slate-500">{item.branch}</td>
                      <td className={`py-4 px-6 text-[13px] font-bold ${isLowStock ? "text-red-500" : "text-slate-900"}`}>
                        {item.remaining} lbs
                      </td>
                      <td className="py-4 px-6 text-[13px] text-slate-500">{item.min} lbs</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                            <div 
                              className={`h-full rounded-full ${isLowStock ? "bg-red-500" : "bg-emerald-500"}`} 
                              style={{ width: `${item.stockLevel}%` }}
                            ></div>
                          </div>
                          <span className="text-[12px] font-medium text-slate-400">{item.stockLevel}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {isLowStock && (
                            <button 
                              onClick={() => setPoItem(item)}
                              className="px-3 py-1.5 bg-[#ef4444] hover:bg-red-600 text-white rounded-full text-[11px] font-bold transition-colors shadow-sm"
                            >
                              Create PO
                            </button>
                          )}
                          <button 
                            onClick={() => setStockItem(item)}
                            className="px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full text-[11px] font-bold transition-colors shadow-sm"
                          >
                            Add Stock
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab !== "powder_inventory" && (
        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-300 bg-white border border-slate-200 rounded-2xl">
          <p className="text-[15px] font-medium text-slate-500">Content for {activeTab.replace("_", " ")} is currently under development.</p>
        </div>
      )}

      <InventoryCreatePOModal 
        isOpen={!!poItem} 
        onClose={() => setPoItem(null)} 
        item={poItem} 
      />

      <InventoryAddStockModal 
        isOpen={!!stockItem} 
        onClose={() => setStockItem(null)} 
        item={stockItem} 
      />

      <InventoryAddNewModal 
        isOpen={isAddNewOpen} 
        onClose={() => setIsAddNewOpen(false)} 
      />

    </div>
  );
}
