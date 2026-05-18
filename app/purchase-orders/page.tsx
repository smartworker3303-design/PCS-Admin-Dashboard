"use client";

import React, { useState } from "react";
import { Search, Eye } from "lucide-react";
import ViewPOModal from "@/components/ViewPOModal";
import CreatePOModal from "@/components/CreatePOModal";

export default function PurchaseOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPO, setSelectedPO] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const posData = [
    { id: "PO-2026-041", vendor: "ChemCorp Coatings", client: "ABC Steel Corp", job: "TK-2847", items: 4, amount: "$2,400", status: "Open", date: "Apr 21, 2026" },
    { id: "PO-2026-040", vendor: "ProPowder Supply", client: "Metro Fab LLC", job: "TK-2846", items: 3, amount: "$1,850", status: "Received", date: "Apr 19, 2026" },
    { id: "PO-2026-039", vendor: "Industrial Gas Co.", client: "—", job: "—", items: 1, amount: "$680", status: "Pending", date: "Apr 18, 2026" },
    { id: "PO-2026-038", vendor: "ChemCorp Coatings", client: "Lone Star Mfg", job: "TK-2844", items: 6, amount: "$3,200", status: "Open", date: "Apr 17, 2026" },
    { id: "PO-2026-037", vendor: "Metal Prep Inc.", client: "—", job: "—", items: 2, amount: "$940", status: "Received", date: "Apr 15, 2026" },
    { id: "PO-2026-036", vendor: "ProPowder Supply", client: "Iron Works TX", job: "TK-2842", items: 3, amount: "$1,620", status: "Cancelled", date: "Apr 14, 2026" },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900">Purchase Orders</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">2 open orders &middot; $10,690 total</p>
        </div>
        <div>
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors shadow-sm flex items-center"
          >
            <span className="mr-1.5 text-lg leading-none">+</span> Create PO
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm">
          <div className="text-[28px] font-bold text-blue-600 mb-1 leading-none">2</div>
          <div className="text-[13px] font-medium text-slate-500">Open POs</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm">
          <div className="text-[28px] font-bold text-amber-500 mb-1 leading-none">8</div>
          <div className="text-[13px] font-medium text-slate-500">Pending Invoices</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm">
          <div className="text-[28px] font-bold text-emerald-500 mb-1 leading-none">14</div>
          <div className="text-[13px] font-medium text-slate-500">Received This Month</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm">
          <div className="text-[28px] font-bold text-[#8b5cf6] mb-1 leading-none">$10.7K</div>
          <div className="text-[13px] font-medium text-slate-500">Total Expense</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search PO number or vendor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm placeholder:text-slate-400"
          />
        </div>
        {/* Placeholder for the empty white rounded box seen in screenshot right of search */}
        <div className="w-[60px] h-[46px] bg-white border border-slate-200 rounded-xl shadow-sm flex-shrink-0"></div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">PO NUMBER</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">VENDOR</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">CLIENT</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">RELATED JOB</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">ITEMS</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">AMOUNT</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">STATUS</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">DATE</th>
              <th className="px-5 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-4 text-[13px] font-bold text-blue-600">{row.id}</td>
                <td className="px-5 py-4 text-[13px] font-medium text-slate-700">{row.vendor}</td>
                <td className="px-5 py-4 text-[13px] text-slate-500">{row.client}</td>
                <td className="px-5 py-4 text-[13px] text-slate-500">{row.job}</td>
                <td className="px-5 py-4 text-[13px] text-slate-500 text-center">{row.items}</td>
                <td className="px-5 py-4 text-[13px] font-bold text-slate-900">{row.amount}</td>
                <td className="px-5 py-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    row.status === "Open" ? "bg-[#dbeafe] text-blue-600" :
                    row.status === "Received" ? "bg-[#d1fae5] text-emerald-600" :
                    row.status === "Pending" ? "bg-amber-100/80 text-amber-600" :
                    "bg-[#fee2e2] text-red-600"
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-[13px] text-slate-500">{row.date}</td>
                <td className="px-5 py-4 flex items-center justify-center">
                  <button 
                    onClick={() => setSelectedPO(row)}
                    className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ViewPOModal 
        isOpen={!!selectedPO} 
        onClose={() => setSelectedPO(null)} 
        po={selectedPO} 
      />

      <CreatePOModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
      />

    </div>
  );
}
