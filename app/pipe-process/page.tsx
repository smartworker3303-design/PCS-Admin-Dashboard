"use client";

import React, { useState } from "react";
import { Search, Plus, Eye, Pencil } from "lucide-react";
import PipeProcessDetailsModal from "@/components/PipeProcessDetailsModal";
import NewPipeSetupModal from "@/components/NewPipeSetupModal";

export default function PipeProcessSetupPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);

  const tableData = [
    { id: "PPS-0041", ticket: "TK-2847", customer: "ABC Steel Corp", pipeSize: '4"', coating: "Epoxy", parts: 24, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", branch: "Houston", created: "Apr 21, 2026" },
    { id: "PPS-0040", ticket: "TK-2846", customer: "Metro Fab LLC", pipeSize: '2"', coating: "Polyester", parts: 8, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", branch: "Dallas", created: "Apr 21, 2026" },
    { id: "PPS-0039", ticket: "TK-2845", customer: "Gulf Coast Ind.", pipeSize: '6"', coating: "Hybrid", parts: 15, status: "Pending", statusColor: "bg-amber-100 text-amber-700", branch: "Houston", created: "Apr 20, 2026" },
    { id: "PPS-0038", ticket: "TK-2844", customer: "Lone Star Mfg", pipeSize: '8"', coating: "Epoxy", parts: 42, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", branch: "Austin", created: "Apr 20, 2026" },
  ];

  return (
    <div className="p-4 sm:p-8 flex-1 overflow-y-auto no-scrollbar bg-[#f8fafc]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Pipe Process Setup</h1>
          <p className="text-sm text-slate-500">Define pipe details, coating specs, and process rules before work begins</p>
        </div>
        <button 
          onClick={() => setIsNewFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-colors flex items-center justify-center whitespace-nowrap shadow-sm"
        >
          <Plus size={18} className="mr-2" />
          New Pipe Setup
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <span className="text-[32px] font-bold text-blue-600 mb-1 leading-none">3</span>
          <p className="text-[13px] font-medium text-slate-500">Active Setups</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <span className="text-[32px] font-bold text-amber-500 mb-1 leading-none">1</span>
          <p className="text-[13px] font-medium text-slate-500">Pending Review</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <span className="text-[32px] font-bold text-emerald-500 mb-1 leading-none">89</span>
          <p className="text-[13px] font-medium text-slate-500">Total Parts Configured</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <span className="text-[32px] font-bold text-purple-500 mb-1 leading-none">3</span>
          <p className="text-[13px] font-medium text-slate-500">Templates Available</p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        {/* Search Bar */}
        <div className="p-5 border-b border-slate-100">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search setups..."
              className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-[13px] transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-sm text-left whitespace-nowrap min-w-[1000px]">
            <thead className="text-[11px] text-slate-400 font-semibold bg-slate-50/50 border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">SETUP ID</th>
                <th className="px-6 py-4">TICKET</th>
                <th className="px-6 py-4">CUSTOMER</th>
                <th className="px-6 py-4">PIPE SIZE</th>
                <th className="px-6 py-4">COATING TYPE</th>
                <th className="px-6 py-4">PARTS</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4">BRANCH</th>
                <th className="px-6 py-4">CREATED</th>
                <th className="px-6 py-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.map((record, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">{record.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-500">{record.ticket}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{record.customer}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{record.pipeSize}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{record.coating}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{record.parts}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${record.statusColor}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{record.branch}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{record.created}</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button 
                      onClick={() => { setSelectedRecord(record); setIsModalOpen(true); }}
                      className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                    >
                      <Eye size={16} />
                    </button>
                    <button className="text-slate-400 hover:text-blue-600 transition-colors p-1">
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PipeProcessDetailsModal 
        record={selectedRecord}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <NewPipeSetupModal
        isOpen={isNewFormOpen}
        onClose={() => setIsNewFormOpen(false)}
      />
    </div>
  );
}
