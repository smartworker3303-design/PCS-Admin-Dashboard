"use client";

import React, { useState } from "react";
import { ShoppingCart, Play, CheckCircle2, Flame, Plus, Clock, Search, ListPlus, History, ShieldCheck, Thermometer } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  branch: string;
  status: "idle" | "in-process" | "oven-cure" | "completed";
  currentStage: string;
  assignedPartsCount: number;
  assignedParts: { id: string; clientPipeId: string; desc: string; qty: number }[];
  ovenRunTimeMinutes?: number;
  ovenRunTimeElapsed?: number;
  batchNumber?: string;
}

export default function CartsPage() {
  const [activeTab, setActiveTab] = useState("active_carts");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateCartOpen, setIsCreateCartOpen] = useState(false);
  const [isAssignPartsOpen, setIsAssignPartsOpen] = useState(false);

  // Cart list state
  const [carts, setCarts] = useState<CartItem[]>([
    {
      id: "CRT-101",
      name: "Oven Rack Alpha",
      branch: "Houston",
      status: "oven-cure",
      currentStage: "Oven Cure Stage",
      assignedPartsCount: 14,
      assignedParts: [
        { id: "PCS-P-001", clientPipeId: "P-101", desc: '6" Tubing CS', qty: 10 },
        { id: "PCS-P-002", clientPipeId: "FL-202", desc: '6" Flange Cl-150', qty: 4 }
      ],
      ovenRunTimeMinutes: 45,
      ovenRunTimeElapsed: 18,
      batchNumber: "ABC-100"
    },
    {
      id: "CRT-102",
      name: "Drying Cart Beta",
      branch: "Houston",
      status: "in-process",
      currentStage: "Sandblasting Station",
      assignedPartsCount: 8,
      assignedParts: [
        { id: "PCS-P-003", clientPipeId: "T-809", desc: '4" Tubing Steel', qty: 8 }
      ],
      batchNumber: "XYZ-500"
    },
    {
      id: "CRT-103",
      name: "Staging Rack Gamma",
      branch: "Dallas",
      status: "idle",
      currentStage: "Receiving Dock",
      assignedPartsCount: 0,
      assignedParts: []
    }
  ]);

  const [historyLogs, setHistoryLogs] = useState([
    { id: "LOG-501", cartId: "CRT-101", cartName: "Oven Rack Alpha", branch: "Houston", batch: "ABC-100", temp: "395°F", duration: "45 mins", date: "June 27, 2026", operator: "Bobby Lee", status: "Passed QC" },
    { id: "LOG-502", cartId: "CRT-104", cartName: "Oven Rack Delta", branch: "Dallas", batch: "FBE-800", temp: "420°F", duration: "30 mins", date: "June 26, 2026", operator: "Mike Torres", status: "Passed QC" },
    { id: "LOG-503", cartId: "CRT-102", cartName: "Drying Cart Beta", branch: "Houston", batch: "HYB-200", temp: "380°F", duration: "40 mins", date: "June 25, 2026", operator: "John Smith", status: "Rework Required" }
  ]);

  // Form states
  const [newCartName, setNewCartName] = useState("");
  const [newCartBranch, setNewCartBranch] = useState("Houston");

  const [selectedCartId, setSelectedCartId] = useState("");
  const [partToAssign, setPartToAssign] = useState("PCS-P-004");
  const [partClientPipeId, setPartClientPipeId] = useState("P-305");
  const [partDesc, setPartDesc] = useState("4\" Flange Series 300");
  const [partQty, setPartQty] = useState(6);

  const handleCreateCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCartName.trim()) return;

    const newCart: CartItem = {
      id: `CRT-${100 + carts.length + 1}`,
      name: newCartName,
      branch: newCartBranch,
      status: "idle",
      currentStage: "Receiving Dock",
      assignedPartsCount: 0,
      assignedParts: []
    };

    setCarts([...carts, newCart]);
    setNewCartName("");
    setIsCreateCartOpen(false);
  };

  const handleAssignPart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCartId) return;

    setCarts(carts.map(cart => {
      if (cart.id !== selectedCartId) return cart;

      const newPart = {
        id: partToAssign,
        clientPipeId: partClientPipeId,
        desc: partDesc,
        qty: partQty
      };

      return {
        ...cart,
        assignedPartsCount: cart.assignedPartsCount + partQty,
        assignedParts: [...cart.assignedParts, newPart],
        status: cart.status === "idle" ? "in-process" : cart.status
      };
    }));

    setIsAssignPartsOpen(false);
  };

  const startOvenRun = (id: string) => {
    setCarts(carts.map(cart => {
      if (cart.id !== id) return cart;
      return {
        ...cart,
        status: "oven-cure",
        currentStage: "Oven Cure Stage",
        ovenRunTimeMinutes: 45,
        ovenRunTimeElapsed: 0
      };
    }));
  };

  const completeOvenRun = (id: string) => {
    const cart = carts.find(c => c.id === id);
    if (!cart) return;

    setCarts(carts.map(c => {
      if (c.id !== id) return c;
      return {
        ...c,
        status: "completed",
        currentStage: "Quality Control",
        ovenRunTimeElapsed: c.ovenRunTimeMinutes
      };
    }));

    // Add to history
    const newLog = {
      id: `LOG-${500 + historyLogs.length + 1}`,
      cartId: cart.id,
      cartName: cart.name,
      branch: cart.branch,
      batch: cart.batchNumber || "ABC-100",
      temp: "400°F",
      duration: "45 mins",
      date: "Today",
      operator: "Admin",
      status: "Pending Inspection"
    };
    setHistoryLogs([newLog, ...historyLogs]);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 mb-1 flex items-center gap-2">
            <ShoppingCart className="text-blue-600" />
            Cart Processing & Assignment
          </h1>
          <p className="text-[14px] text-slate-500">Assign multiple parts/jobs together to carts for synchronized baking, grinding, and sandblasting logs</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button 
            onClick={() => setIsAssignPartsOpen(true)}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors shadow-sm flex items-center gap-1.5"
          >
            <ListPlus size={16} className="text-blue-500" />
            Assign Parts to Cart
          </button>
          <button 
            onClick={() => setIsCreateCartOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors shadow-sm flex items-center"
          >
            <span className="mr-1.5 text-lg leading-none">+</span> Create New Cart
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-8">
        <div className="bg-slate-50/80 p-1.5 rounded-2xl inline-flex gap-1 border border-slate-100">
          <button 
            onClick={() => setActiveTab("active_carts")}
            className={`px-6 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === "active_carts" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            Active Carts
          </button>
          <button 
            onClick={() => setActiveTab("cart_history")}
            className={`px-6 py-2 rounded-xl text-[13px] font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "cart_history" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            <History size={14} />
            Cart Processing History
          </button>
        </div>
      </div>

      {activeTab === "active_carts" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {carts.map((cart) => (
            <div key={cart.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:border-blue-300 transition-all hover:shadow-md">
              
              {/* Cart Header */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/40 flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 font-bold block">{cart.id}</span>
                  <h3 className="font-bold text-slate-800 text-[15px]">{cart.name}</h3>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">{cart.branch} Branch</span>
                </div>
                <div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    cart.status === "idle" ? "bg-slate-100 text-slate-600" :
                    cart.status === "in-process" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                    cart.status === "oven-cure" ? "bg-orange-50 text-orange-605 border border-orange-100 animate-pulse" :
                    "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }`}>
                    {cart.status === "oven-cure" ? "OVEN CURING" : cart.status}
                  </span>
                </div>
              </div>

              {/* Cart Details */}
              <div className="p-5 flex-1 flex flex-col gap-4">
                
                {/* Stage Tracker */}
                <div className="flex justify-between items-center bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">
                  <span className="text-[11px] text-slate-400 font-bold uppercase">Current Station</span>
                  <span className="text-[12px] font-bold text-slate-800 flex items-center gap-1">
                    {cart.status === "oven-cure" ? <Flame size={14} className="text-orange-500" /> : <Clock size={14} className="text-blue-500" />}
                    {cart.currentStage}
                  </span>
                </div>

                {/* Assigned Parts List */}
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase mb-2">Assigned Pipes & Materials ({cart.assignedPartsCount} total parts)</h4>
                  {cart.assignedParts.length === 0 ? (
                    <div className="text-center py-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/20 text-slate-400 text-xs italic">
                      No materials assigned yet.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto no-scrollbar">
                      {cart.assignedParts.map((part, index) => (
                        <div key={index} className="flex justify-between items-center text-[12px] border border-slate-100 rounded-lg p-2 bg-white shadow-xs">
                          <div>
                            <span className="font-bold text-slate-850">{part.clientPipeId}</span>
                            <span className="text-slate-400 text-[10px] ml-1.5 font-medium">{part.desc}</span>
                          </div>
                          <span className="font-bold text-slate-500">Qty: {part.qty}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Batch Code Tracker */}
                {cart.batchNumber && (
                  <div className="text-[12px] text-slate-500 flex justify-between items-center border-t border-slate-100 pt-2.5">
                    <span>Active Powder Batch:</span>
                    <span className="font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                      {cart.batchNumber}
                    </span>
                  </div>
                )}

                {/* Oven Cure Timer (Simulation) */}
                {cart.status === "oven-cure" && cart.ovenRunTimeMinutes && cart.ovenRunTimeElapsed !== undefined && (
                  <div className="bg-orange-50/40 border border-orange-100/50 rounded-xl p-3.5 mt-2 flex flex-col gap-2">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-orange-700 font-bold flex items-center gap-1">
                        <Thermometer size={14} className="animate-bounce" />
                        Oven Temp: 405°F (Curing)
                      </span>
                      <span className="text-orange-650 font-bold">{cart.ovenRunTimeMinutes - cart.ovenRunTimeElapsed} mins left</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-orange-100 rounded-full h-1.5">
                      <div 
                        className="bg-orange-500 h-1.5 rounded-full transition-all duration-1000" 
                        style={{ width: `${(cart.ovenRunTimeElapsed / cart.ovenRunTimeMinutes) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

              </div>

              {/* Action Footer */}
              <div className="px-5 py-4 bg-slate-50/20 border-t border-slate-100 flex gap-2">
                {cart.status === "idle" && (
                  <button 
                    disabled={cart.assignedPartsCount === 0}
                    onClick={() => startOvenRun(cart.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-2 rounded-xl text-[12px] flex items-center justify-center gap-1 shadow-sm transition-colors cursor-pointer"
                  >
                    <Play size={13} />
                    Start Bake / Process
                  </button>
                )}
                {cart.status === "in-process" && (
                  <button 
                    onClick={() => startOvenRun(cart.id)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl text-[12px] flex items-center justify-center gap-1 shadow-sm transition-colors cursor-pointer"
                  >
                    <Flame size={13} />
                    Move to Oven Curing
                  </button>
                )}
                {cart.status === "oven-cure" && (
                  <button 
                    onClick={() => completeOvenRun(cart.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-[12px] flex items-center justify-center gap-1 shadow-sm transition-colors cursor-pointer"
                  >
                    <CheckCircle2 size={13} />
                    Complete Bake & Send to QC
                  </button>
                )}
                {cart.status === "completed" && (
                  <div className="w-full bg-emerald-50 text-emerald-700 font-bold py-2 rounded-xl text-[12px] flex items-center justify-center gap-1 border border-emerald-100 select-none">
                    <ShieldCheck size={14} />
                    Ready for Quality Inspection
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      ) : (
        // Cart Processing History
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cart ID</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cart Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Powder Batch</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Temp</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cure Time</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date Logged</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Operator</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">QC Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {historyLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors bg-white">
                    <td className="px-6 py-3 font-mono text-[12px] font-bold text-blue-600">{log.cartId}</td>
                    <td className="px-6 py-3 font-semibold text-slate-800">{log.cartName}</td>
                    <td className="px-6 py-3 text-slate-500 font-medium">{log.branch}</td>
                    <td className="px-6 py-3 font-mono text-slate-600 font-bold bg-slate-50 px-2 rounded max-w-fit">{log.batch}</td>
                    <td className="px-6 py-3 text-slate-600 font-bold">{log.temp}</td>
                    <td className="px-6 py-3 text-slate-500 font-medium">{log.duration}</td>
                    <td className="px-6 py-3 text-slate-400 font-medium">{log.date}</td>
                    <td className="px-6 py-3 text-slate-700 font-semibold">{log.operator}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        log.status === "Passed QC" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                        log.status === "Rework Required" ? "bg-red-50 text-red-700 border-red-100" :
                        "bg-yellow-50 text-yellow-600 border-yellow-100"
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE NEW CART MODAL */}
      {isCreateCartOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCreateCartOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-[450px] p-6 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-slate-900 text-[16px] mb-4">Create New Processing Cart</h3>
            <form onSubmit={handleCreateCart} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Cart Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Oven Rack Epsilon"
                  value={newCartName}
                  onChange={(e) => setNewCartName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Select Facility Branch</label>
                <select 
                  value={newCartBranch}
                  onChange={(e) => setNewCartBranch(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="Houston">Houston (Main Plant)</option>
                  <option value="Dallas">Dallas Branch</option>
                  <option value="Austin">Austin Hub</option>
                </select>
              </div>
              <div className="flex gap-2.5 mt-2.5">
                <button 
                  type="button" 
                  onClick={() => setIsCreateCartOpen(false)}
                  className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-2.5 rounded-full text-[12px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-full text-[12px]"
                >
                  Create Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ASSIGN PARTS TO CART MODAL */}
      {isAssignPartsOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAssignPartsOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-[480px] p-6 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-slate-900 text-[16px] mb-4">Assign Unscheduled Pipes to Cart</h3>
            <form onSubmit={handleAssignPart} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Select Target Cart</label>
                <select 
                  value={selectedCartId}
                  onChange={(e) => setSelectedCartId(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 bg-white font-bold text-slate-700"
                  required
                >
                  <option value="">-- Choose Active Cart --</option>
                  {carts.filter(c => c.status !== "completed").map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.assignedPartsCount} parts)</option>
                  ))}
                </select>
              </div>
              
              <div className="border-t border-slate-100 pt-3 flex flex-col gap-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Scanner Simulator / Choose Received Material</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">PCS Part ID</label>
                    <input 
                      type="text" 
                      value={partToAssign}
                      onChange={(e) => setPartToAssign(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[12px] focus:outline-none bg-slate-50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Client Pipe ID</label>
                    <input 
                      type="text" 
                      value={partClientPipeId}
                      onChange={(e) => setPartClientPipeId(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[12px] focus:outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Part Description</label>
                    <input 
                      type="text" 
                      value={partDesc}
                      onChange={(e) => setPartDesc(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[12px] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Quantity</label>
                    <input 
                      type="number" 
                      value={partQty}
                      onChange={(e) => setPartQty(parseInt(e.target.value) || 1)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[12px] text-center font-bold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 mt-2.5">
                <button 
                  type="button" 
                  onClick={() => setIsAssignPartsOpen(false)}
                  className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-2.5 rounded-full text-[12px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!selectedCartId}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-full text-[12px]"
                >
                  Assign to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
