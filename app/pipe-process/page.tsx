"use client";

import React, { useState } from "react";
import { Search, Plus, Eye, Pencil, Search as SearchIcon, Image as ImageIcon, QrCode, X } from "lucide-react";
import PipeProcessDetailsModal from "@/components/PipeProcessDetailsModal";
import NewPipeSetupModal from "@/components/NewPipeSetupModal";

interface PipeLookupItem {
  pipeId: string;
  clientPipeId: string;
  description: string;
  photoName: string;
  coatingSpec: string;
  thicknessRequired: string;
  holidayVoltage: string;
  currentStage: string;
  stageColor: string;
  ticket: string;
  customer: string;
}

export default function PipeProcessSetupPage() {
  const [activeTab, setActiveTab] = useState("setups");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);
  
  // Photo preview modal state
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const tableData = [
    { id: "PPS-0041", ticket: "TK-2847", customer: "ABC Steel Corp", pipeSize: '4"', coating: "Epoxy", parts: 24, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", branch: "Houston", created: "Apr 21, 2026" },
    { id: "PPS-0040", ticket: "TK-2846", customer: "Metro Fab LLC", pipeSize: '2"', coating: "Polyester", parts: 8, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", branch: "Dallas", created: "Apr 21, 2026" },
    { id: "PPS-0039", ticket: "TK-2845", customer: "Gulf Coast Ind.", pipeSize: '6"', coating: "Hybrid", parts: 15, status: "Pending", statusColor: "bg-amber-100 text-amber-700", branch: "Houston", created: "Apr 20, 2026" },
    { id: "PPS-0038", ticket: "TK-2844", customer: "Lone Star Mfg", pipeSize: '8"', coating: "Epoxy", parts: 42, status: "Active", statusColor: "bg-emerald-100 text-emerald-700", branch: "Austin", created: "Apr 20, 2026" },
  ];

  // Pipe Lookup mock database for employees answering customer calls
  const pipeLookupData: PipeLookupItem[] = [
    {
      pipeId: "PCS-P-101",
      clientPipeId: "P-101",
      description: "6\" Carbon Steel Schedule 40 Pipe (10ft)",
      photoName: "pipe_delivery_sketch.jpg",
      coatingSpec: "RAL 5010 (Epoxy Blue)",
      thicknessRequired: "3.0 - 5.5 mils",
      holidayVoltage: "1250V DC",
      currentStage: "Oven Cure Stage",
      stageColor: "bg-orange-50 text-orange-600 border border-orange-100",
      ticket: "TK-2847",
      customer: "ABC Steel Corp"
    },
    {
      pipeId: "PCS-P-102",
      clientPipeId: "P-102",
      description: "6\" Carbon Steel Schedule 40 Pipe (10ft)",
      photoName: "pipe_delivery_sketch.jpg",
      coatingSpec: "RAL 5010 (Epoxy Blue)",
      thicknessRequired: "3.0 - 5.5 mils",
      holidayVoltage: "1250V DC",
      currentStage: "Oven Cure Stage",
      stageColor: "bg-orange-50 text-orange-600 border border-orange-100",
      ticket: "TK-2847",
      customer: "ABC Steel Corp"
    },
    {
      pipeId: "PCS-P-103",
      clientPipeId: "P-103",
      description: "6\" Carbon Steel Schedule 40 Pipe (10ft)",
      photoName: "incoming_tubing_inspect.png",
      coatingSpec: "RAL 5010 (Epoxy Blue)",
      thicknessRequired: "3.0 - 5.5 mils",
      holidayVoltage: "1250V DC",
      currentStage: "Sandblasting Station",
      stageColor: "bg-blue-50 text-blue-600 border border-blue-100",
      ticket: "TK-2847",
      customer: "ABC Steel Corp"
    },
    {
      pipeId: "PCS-P-104",
      clientPipeId: "FL-202",
      description: "6\" Flange Class 150",
      photoName: "fitting_flange_side.jpg",
      coatingSpec: "RAL 5010 (Epoxy Blue)",
      thicknessRequired: "3.0 - 5.5 mils",
      holidayVoltage: "1250V DC",
      currentStage: "Quality Control Check",
      stageColor: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      ticket: "TK-2847",
      customer: "ABC Steel Corp"
    },
    {
      pipeId: "PCS-P-105",
      clientPipeId: "T-809",
      description: "4\" Tubing Carbon Steel (8ft)",
      photoName: "fab_part_front.jpg",
      coatingSpec: "RAL 9005 (Matte Black Polyester)",
      thicknessRequired: "2.5 - 4.0 mils",
      holidayVoltage: "N/A (External Only)",
      currentStage: "Ready for Pickup",
      stageColor: "bg-indigo-50 text-indigo-600 border border-indigo-100",
      ticket: "TK-2846",
      customer: "Metro Fab LLC"
    }
  ];

  return (
    <div className="p-4 sm:p-8 flex-1 overflow-y-auto no-scrollbar bg-[#f8fafc]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Pipe & Materials Processing</h1>
          <p className="text-sm text-slate-500">Define pipe specs, load customer templates, and look up pipe status on customer calls</p>
        </div>
        <button 
          onClick={() => setIsNewFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-colors flex items-center justify-center whitespace-nowrap shadow-sm"
        >
          <Plus size={18} className="mr-2" />
          New Pipe Setup
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-slate-200/60 p-1.5 rounded-2xl inline-flex gap-1 mb-6 border border-slate-200/10">
        <button 
          onClick={() => { setActiveTab("setups"); setSearchQuery(""); }}
          className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all ${
            activeTab === "setups" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
          }`}
        >
          Process Setup Profiles
        </button>
        <button 
          onClick={() => { setActiveTab("lookup"); setSearchQuery(""); }}
          className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "lookup" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
          }`}
        >
          <SearchIcon size={14} />
          Customer Call Pipe Lookup
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <span className="text-[32px] font-bold text-blue-600 mb-1 leading-none">
            {activeTab === "setups" ? tableData.length : pipeLookupData.length}
          </span>
          <p className="text-[13px] font-medium text-slate-500">
            {activeTab === "setups" ? "Active Setup Profiles" : "Total Tracked Pipes"}
          </p>
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

      {/* Tab 1: Setup Profiles Table */}
      {activeTab === "setups" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden animate-in fade-in duration-300">
          
          {/* Search Bar */}
          <div className="p-5 border-b border-slate-100">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search setups by customer or ticket..."
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
                  <th className="px-6 py-4 text-center">PARTS</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4">BRANCH</th>
                  <th className="px-6 py-4">CREATED</th>
                  <th className="px-6 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData
                  .filter(r => r.customer.toLowerCase().includes(searchQuery.toLowerCase()) || r.ticket.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((record, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors bg-white">
                      <td className="px-6 py-4 font-semibold text-blue-600">{record.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-500">{record.ticket}</td>
                      <td className="px-6 py-4 font-semibold text-slate-700">{record.customer}</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{record.pipeSize}</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{record.coating}</td>
                      <td className="px-6 py-4 text-slate-600 font-medium text-center">{record.parts}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${record.statusColor}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{record.branch}</td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{record.created}</td>
                      <td className="px-6 py-4 flex items-center justify-end gap-3">
                        <button 
                          onClick={() => { setSelectedRecord(record); setIsModalOpen(true); }}
                          className="text-slate-400 hover:text-blue-500 transition-colors p-1 hover:bg-slate-100 rounded"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="text-slate-400 hover:text-blue-500 transition-colors p-1 hover:bg-slate-100 rounded">
                          <Pencil size={16} />
                        </button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Pipe Lookup System (Office search index) */}
      {activeTab === "lookup" && (
        <div className="bg-white rounded-2xl border border-slate-150 shadow-sm flex flex-col overflow-hidden animate-in fade-in duration-300">
          
          {/* Search Inputs */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/40">
            <div className="relative max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search pipe index (e.g. PCS-P-101, client ID, description)..."
                className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-[13px] font-medium shadow-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Grid view/table */}
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-sm text-left whitespace-nowrap min-w-[1000px]">
              <thead className="text-[11px] text-slate-400 font-bold bg-slate-50/70 border-b border-slate-150 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">PIPE ID</th>
                  <th className="px-6 py-4">CLIENT PIPE ID</th>
                  <th className="px-6 py-4">CUSTOMER</th>
                  <th className="px-6 py-4">DESCRIPTION</th>
                  <th className="px-6 py-4">COATING INFORMATION</th>
                  <th className="px-6 py-4 text-center">SKETCH / PHOTO</th>
                  <th className="px-6 py-4">CURRENT STAGE</th>
                  <th className="px-6 py-4">TICKET</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {pipeLookupData
                  .filter(p => 
                    p.pipeId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    p.clientPipeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.customer.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((pipe) => (
                    <tr key={pipe.pipeId} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-mono text-[12px] font-bold text-blue-600">{pipe.pipeId}</td>
                      <td className="px-6 py-3.5 font-mono font-bold text-slate-800">{pipe.clientPipeId}</td>
                      <td className="px-6 py-3.5 font-semibold text-slate-700">{pipe.customer}</td>
                      <td className="px-6 py-3.5 text-slate-550 font-medium max-w-xs truncate" title={pipe.description}>
                        {pipe.description}
                      </td>
                      <td className="px-6 py-3.5 text-slate-600 font-semibold">
                        <div className="flex flex-col text-[12px]">
                          <span>Spec: <strong className="text-slate-800">{pipe.coatingSpec}</strong></span>
                          <span className="text-[10px] text-slate-400 font-medium">Thickness: {pipe.thicknessRequired} &middot; Holiday: {pipe.holidayVoltage}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <button 
                          onClick={() => setPreviewPhoto(pipe.photoName)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-2 py-1 rounded transition-colors cursor-pointer"
                        >
                          <ImageIcon size={12} />
                          {pipe.photoName}
                        </button>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${pipe.stageColor}`}>
                          {pipe.currentStage}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-slate-500 font-bold">{pipe.ticket}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expandable Image Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setPreviewPhoto(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[500px] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
              <span className="font-bold text-slate-800 text-[14px]">Pipe Photo Log Preview</span>
              <button onClick={() => setPreviewPhoto(null)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-50 rounded">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 bg-slate-100 flex flex-col items-center justify-center min-h-[300px] border-b border-slate-150">
              <ImageIcon size={48} className="text-slate-350 mb-3" />
              <span className="font-mono text-[13px] font-bold text-slate-700">{previewPhoto}</span>
              <span className="text-xs text-slate-400 mt-1 block">Photographic sketch reference loaded successfully</span>
            </div>
            <div className="p-4 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setPreviewPhoto(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-sm cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

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
