"use client";

import React, { useState } from "react";
import { Package, AlertTriangle, Flame, Activity, ArrowDownRight, RefreshCw, Calendar, Eye, Plus, ShieldCheck, Thermometer } from "lucide-react";
import InventoryCreatePOModal from "@/components/InventoryCreatePOModal";
import InventoryAddStockModal from "@/components/InventoryAddStockModal";
import InventoryAddNewModal from "@/components/InventoryAddNewModal";

interface PropaneLog {
  id: string;
  date: string;
  tank: string;
  startPercent: number;
  endPercent: number;
  hoursUsed: number;
  refillEvent: boolean;
  refillGallons?: number;
}

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("powder_inventory");
  const [poItem, setPoItem] = useState<any>(null);
  const [stockItem, setStockItem] = useState<any>(null);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [addCategory, setAddCategory] = useState("powder_coating");

  // Propane state
  const [propaneLogs, setPropaneLogs] = useState<PropaneLog[]>([
    { id: "1", date: "June 28, 2026", tank: "Tank A (Main Oven)", startPercent: 78, endPercent: 62, hoursUsed: 8.5, refillEvent: false },
    { id: "2", date: "June 28, 2026", tank: "Tank B (Pre-Heat)", startPercent: 45, endPercent: 38, hoursUsed: 4.0, refillEvent: false },
    { id: "3", date: "June 27, 2026", tank: "Tank A (Main Oven)", startPercent: 92, endPercent: 78, hoursUsed: 7.2, refillEvent: false },
    { id: "4", date: "June 26, 2026", tank: "Tank C (Backup)", startPercent: 12, endPercent: 90, hoursUsed: 1.5, refillEvent: true, refillGallons: 400 }
  ]);

  // Propane inputs
  const [logTank, setLogTank] = useState("Tank A (Main Oven)");
  const [logStart, setLogStart] = useState("80");
  const [logEnd, setLogEnd] = useState("65");
  const [logHours, setLogHours] = useState("6.5");
  const [logRefill, setLogRefill] = useState(false);
  const [logRefillGal, setLogRefillGal] = useState("");
  const [showLogForm, setShowLogForm] = useState(false);

  const chartData = [
    { date: "Apr 15", blue: 40, purple: 28, green: 20 },
    { date: "Apr 16", blue: 65, purple: 38, green: 25 },
    { date: "Apr 17", blue: 55, purple: 30, green: 15 },
    { date: "Apr 18", blue: 80, purple: 48, green: 30 },
    { date: "Apr 19", blue: 68, purple: 45, green: 28 },
    { date: "Apr 20", blue: 90, purple: 55, green: 35 },
    { date: "Apr 21", blue: 75, purple: 48, green: 25 },
  ];

  // Expanded Powder Inventory data with alert triggers
  const [powders, setPowders] = useState([
    { color: "bg-blue-600", type: "Epoxy Blue RAL 5010", branch: "Houston", remaining: 8, min: 25, stockLevel: 16, pours: 42 },
    { color: "bg-slate-900", type: "Matte Black RAL 9005", branch: "Dallas", remaining: 12, min: 30, stockLevel: 20, pours: 18 },
    { color: "bg-orange-500", type: "Safety Orange RAL 2010", branch: "Houston", remaining: 45, min: 20, stockLevel: 100, pours: 8 },
    { color: "bg-emerald-600", type: "Forest Green RAL 6002", branch: "Houston", remaining: 38, min: 15, stockLevel: 85, pours: 12 },
    { color: "bg-red-650", type: "Safety Red RAL 3001", branch: "Dallas", remaining: 5, min: 20, stockLevel: 10, pours: 35 }
  ]);

  const handleAddPropaneLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: PropaneLog = {
      id: String(propaneLogs.length + 1),
      date: "Today",
      tank: logTank,
      startPercent: parseFloat(logStart) || 0,
      endPercent: parseFloat(logEnd) || 0,
      hoursUsed: parseFloat(logHours) || 0,
      refillEvent: logRefill,
      refillGallons: logRefill ? parseFloat(logRefillGal) || undefined : undefined
    };

    setPropaneLogs([newLog, ...propaneLogs]);
    setShowLogForm(false);
    // Reset inputs
    setLogStart("80");
    setLogEnd("65");
    setLogHours("6.5");
    setLogRefill(false);
    setLogRefillGal("");
  };

  const getLowStockCount = () => {
    return powders.filter(p => p.remaining <= p.min).length;
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900 leading-tight">Inventory Management</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">{getLowStockCount()} low stock powder alerts across all branches</p>
        </div>
        <button 
          onClick={() => {
            if (activeTab === "powder_inventory") {
              setAddCategory("powder_coating");
            } else if (activeTab === "propane_tracking") {
              setAddCategory("propane");
            } else {
              setAddCategory("other");
            }
            setIsAddNewOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center"
        >
          <span className="mr-1.5 text-lg leading-none">+</span> Add Inventory Item
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Package size={16} className="text-blue-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">{powders.length}</div>
            <div className="text-[12px] font-medium text-slate-400">Powder Types registered</div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={16} className="text-red-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">{getLowStockCount()}</div>
            <div className="text-[12px] font-medium text-slate-400">Critical Low Stock Items</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
            <Flame size={16} className="text-orange-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">3 Tanks</div>
            <div className="text-[12px] font-medium text-slate-400">Active Propane Tanks</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
            <Activity size={16} className="text-yellow-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">21.3 lbs/day</div>
            <div className="text-[12px] font-medium text-slate-400">Avg. Powder Pour Usage</div>
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
            activeTab === "low_stock_alerts" ? "bg-blue-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-505 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          Low Stock Alerts ({getLowStockCount()})
        </button>
      </div>

      {/* Tab 1: Powder Inventory */}
      {activeTab === "powder_inventory" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-16">Color</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Powder Type</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Branch</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pours logged</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Remaining</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Min. Threshold</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stock Level</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {powders.map((item, index) => {
                  const isLowStock = item.remaining <= item.min;
                  return (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className={`w-3.5 h-3.5 rounded-full ${item.color}`}></div>
                      </td>
                      <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{item.type}</td>
                      <td className="py-4 px-6 text-[13px] text-slate-500">{item.branch}</td>
                      <td className="py-4 px-6 text-[13px] text-slate-500 font-semibold">{item.pours} pours</td>
                      <td className={`py-4 px-6 text-[13px] font-bold ${isLowStock ? "text-red-500 animate-pulse" : "text-slate-900"}`}>
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
                              className="px-3 py-1.5 bg-[#ef4444] hover:bg-red-600 text-white rounded-full text-[11px] font-bold transition-colors shadow-sm cursor-pointer"
                            >
                              Create PO
                            </button>
                          )}
                          <button 
                            onClick={() => setStockItem(item)}
                            className="px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full text-[11px] font-bold transition-colors shadow-sm cursor-pointer"
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

      {/* Tab 2: Propane Tracking */}
      {activeTab === "propane_tracking" && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          
          {/* Tank Visual Meters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Tank A (Main Oven)", cap: "1000 Gal", current: 62, status: "Normal", color: "text-blue-600", bg: "bg-blue-600" },
              { name: "Tank B (Pre-Heat)", cap: "1000 Gal", current: 38, status: "Low Fuel Warning", color: "text-orange-500", bg: "bg-orange-500" },
              { name: "Tank C (Backup)", cap: "500 Gal", current: 90, status: "Refilled", color: "text-emerald-500", bg: "bg-emerald-500" }
            ].map((tank) => (
              <div key={tank.name} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-800 text-[14px]">{tank.name}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      tank.current <= 40 ? "bg-orange-50 text-orange-600 border border-orange-100" : "bg-slate-50 text-slate-500"
                    }`}>
                      {tank.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Capacity: {tank.cap}</span>
                </div>
                
                <div className="my-5">
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-[26px] font-black text-slate-900 leading-none">{tank.current}%</span>
                    <span className="text-slate-400 text-xs font-semibold">Remaining</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className={`h-full rounded-full ${tank.bg}`} style={{ width: `${tank.current}%` }}></div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-450 border-t border-slate-100 pt-3 font-semibold">
                  Last Reading: Daily Bake Logs &middot; 4 hours ago
                </div>
              </div>
            ))}
          </div>

          {/* Propane Table & Form Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-slate-150 flex justify-between items-center bg-slate-50/20">
              <div>
                <h3 className="font-bold text-slate-800 text-[15px]">Propane Consumption Logs</h3>
                <p className="text-[12px] text-slate-400">Daily start/end readings and oven hours burned</p>
              </div>
              <button 
                onClick={() => setShowLogForm(!showLogForm)}
                className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100 px-4 py-2 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} /> Log Daily Meter
              </button>
            </div>

            {/* Inline Reading Form */}
            {showLogForm && (
              <form onSubmit={handleAddPropaneLog} className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-5 gap-4 animate-in slide-in-from-top-2 duration-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Select Tank</label>
                  <select 
                    value={logTank} 
                    onChange={(e)=>setLogTank(e.target.value)} 
                    className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
                  >
                    <option value="Tank A (Main Oven)">Tank A (Main Oven)</option>
                    <option value="Tank B (Pre-Heat)">Tank B (Pre-Heat)</option>
                    <option value="Tank C (Backup)">Tank C (Backup)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Start Level (%)</label>
                  <input 
                    type="number" 
                    value={logStart} 
                    onChange={(e)=>setLogStart(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-center font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">End Level (%)</label>
                  <input 
                    type="number" 
                    value={logEnd} 
                    onChange={(e)=>setLogEnd(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-center font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Hours Burned</label>
                  <input 
                    type="number" 
                    step="any"
                    value={logHours} 
                    onChange={(e)=>setLogHours(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-center font-semibold"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex-1 shadow-sm transition-colors cursor-pointer">
                      Save Log
                    </button>
                    <button type="button" onClick={()=>setShowLogForm(false)} className="bg-white border border-slate-200 text-slate-700 font-bold px-3 py-2 rounded-lg text-xs">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-150 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Tank ID</th>
                    <th className="py-3 px-6 text-center">Start %</th>
                    <th className="py-3 px-6 text-center">End %</th>
                    <th className="py-3 px-6 text-center">Hours Used</th>
                    <th className="py-3 px-6 text-center">Fuel Consumption</th>
                    <th className="py-3 px-6">Refill Event</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {propaneLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/20 transition-colors">
                      <td className="py-3 px-6 font-medium text-slate-700">{log.date}</td>
                      <td className="py-3 px-6 font-bold text-slate-800">{log.tank}</td>
                      <td className="py-3 px-6 text-center font-mono font-bold">{log.startPercent}%</td>
                      <td className="py-3 px-6 text-center font-mono font-bold text-slate-600">{log.endPercent}%</td>
                      <td className="py-3 px-6 text-center font-mono font-bold text-blue-600">{log.hoursUsed} hrs</td>
                      <td className="py-3 px-6 text-center">
                        <span className="font-mono text-slate-500 font-bold">
                          {(log.startPercent - log.endPercent)}% capacity drop
                        </span>
                      </td>
                      <td className="py-3 px-6">
                        {log.refillEvent ? (
                          <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">
                            REFILLED (+{log.refillGallons} gal)
                          </span>
                        ) : (
                          <span className="text-slate-350">&mdash;</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Low Stock Alerts */}
      {activeTab === "low_stock_alerts" && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-red-800 text-[15px]">Active Shortage Flags</h3>
              <p className="text-[13px] text-red-600 mt-1">
                The following powder coatings have hit their safety stock threshold. Re-order immediately to prevent oven-queue bottlenecks.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-150 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Powder Type</th>
                  <th className="py-3.5 px-6">Branch</th>
                  <th className="py-3.5 px-6">Remaining</th>
                  <th className="py-3.5 px-6">Required Threshold</th>
                  <th className="py-3.5 px-6">Deficit</th>
                  <th className="py-3.5 px-6">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {powders.filter(p => p.remaining <= p.min).map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/20">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="font-bold text-slate-850">{item.type}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-500 font-medium">{item.branch}</td>
                    <td className="py-3.5 px-6 font-bold text-red-600">{item.remaining} lbs</td>
                    <td className="py-3.5 px-6 text-slate-500">{item.min} lbs</td>
                    <td className="py-3.5 px-6 font-bold text-slate-700">{item.min - item.remaining} lbs deficit</td>
                    <td className="py-3.5 px-6">
                      <button 
                        onClick={() => setPoItem(item)}
                        className="px-3.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                      >
                        Generate Restock PO
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        defaultCategory={addCategory}
      />

    </div>
  );
}
