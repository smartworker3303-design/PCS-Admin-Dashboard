"use client";

import React, { useState } from "react";
import { Search, Plus, FileText, Clock, CheckCircle2, Eye } from "lucide-react";
import ReceivingDetailsModal from "@/components/ReceivingDetailsModal";
import NewReceivingModal from "@/components/NewReceivingModal";

export default function ReceivingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);

  const receivingData = [
    { id: "RCV-0142", customer: "ABC Steel Corp", rep: "John Smith", po: "PO-2026-041", parts: 18, status: "Submitted", statusColor: "bg-blue-100 text-blue-700", date: "Apr 21, 2028" },
    { id: "RCV-0141", customer: "Metro Fab LLC", rep: "Lisa Wang", po: "PO-2026-040", parts: 6, status: "Draft", statusColor: "bg-slate-100 text-slate-700", date: "Apr 21, 2026" },
    { id: "RCV-0140", customer: "Gulf Coast Ind.", rep: "Mark Davis", po: "PO-2026-039", parts: 22, status: "Approved", statusColor: "bg-emerald-100 text-emerald-700", date: "Apr 20, 2026" },
    { id: "RCV-0139", customer: "Lone Star Mfg", rep: "Amy Chen", po: "PO-2026-038", parts: 9, status: "Pending", statusColor: "bg-amber-100 text-amber-700", date: "Apr 20, 2026" },
    { id: "RCV-0138", customer: "Iron Works TX", rep: "John Smith", po: "PO-2026-037", parts: 34, status: "Approved", statusColor: "bg-emerald-100 text-emerald-700", date: "Apr 19, 2026" },
  ];

  return (
    <div className="p-4 sm:p-8 flex-1 overflow-y-auto no-scrollbar bg-[#f8fafc]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Receiving Management</h1>
          <p className="text-sm text-slate-500">Manage inbound parts and create receiving tickets</p>
        </div>
        <button 
          onClick={() => setIsNewFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center whitespace-nowrap shadow-sm"
        >
          <Plus size={18} className="mr-2" />
          New Receiving Form
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <FileText size={20} className="text-slate-400 mb-2" />
            <p className="text-sm font-medium text-slate-500">Draft</p>
          </div>
          <span className="text-[28px] font-bold text-slate-900">3</span>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <Clock size={20} className="text-blue-500 mb-2" />
            <p className="text-sm font-medium text-slate-500">Submitted</p>
          </div>
          <span className="text-[28px] font-bold text-slate-900">8</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <Clock size={20} className="text-amber-500 mb-2" />
            <p className="text-sm font-medium text-slate-500">Pending Approval</p>
          </div>
          <span className="text-[28px] font-bold text-slate-900">5</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <CheckCircle2 size={20} className="text-emerald-500 mb-2" />
            <p className="text-sm font-medium text-slate-500">Approved Today</p>
          </div>
          <span className="text-[28px] font-bold text-slate-900">12</span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        {/* Search Bar */}
        <div className="p-5 border-b border-slate-100">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search receiving records..."
              className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-[11px] text-slate-400 font-semibold bg-slate-50/50 border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">RECEIVING ID</th>
                <th className="px-6 py-4">CUSTOMER</th>
                <th className="px-6 py-4">REPRESENTATIVE</th>
                <th className="px-6 py-4">PO NUMBER</th>
                <th className="px-6 py-4">PARTS</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {receivingData.map((record, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">{record.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{record.customer}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{record.rep}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{record.po}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{record.parts}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${record.statusColor}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{record.date}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button 
                      onClick={() => { setSelectedRecord(record); setIsModalOpen(true); }}
                      className="flex items-center bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors shadow-sm"
                    >
                      <Eye size={14} className="mr-1.5" />
                      View
                    </button>
                    {record.status === "Draft" && (
                      <button className="flex items-center bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors shadow-sm">
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReceivingDetailsModal 
        record={selectedRecord}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <NewReceivingModal
        isOpen={isNewFormOpen}
        onClose={() => setIsNewFormOpen(false)}
      />
    </div>
  );
}
