"use client";

import React, { useState } from "react";
import { Plus, MapPin } from "lucide-react";
import AddBranchModal from "@/components/AddBranchModal";
import BranchDetailsPanel from "@/components/BranchDetailsPanel";

export default function LocationsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewBranch, setViewBranch] = useState<any>(null);
  const branches = [
    {
      initial: "H",
      name: "Houston - Main",
      location: "Houston",
      manager: "Mike Torres",
      status: "Active",
      jobs: "87",
      staff: "24",
      efficiency: "92%",
    },
    {
      initial: "D",
      name: "Dallas - North",
      location: "Dallas",
      manager: "Sara Kim",
      status: "Active",
      jobs: "64",
      staff: "18",
      efficiency: "92%",
    },
    {
      initial: "A",
      name: "Austin - Central",
      location: "Austin",
      manager: "Elena Cruz",
      status: "Active",
      jobs: "52",
      staff: "15",
      efficiency: "92%",
    },
    {
      initial: "S",
      name: "San Antonio - South",
      location: "San Antonio",
      manager: "Paul Adams",
      status: "Active",
      jobs: "41",
      staff: "12",
      efficiency: "92%",
    },
    {
      initial: "F",
      name: "Fort Worth - West",
      location: "Fort Worth",
      status: "Coming Soon",
      isComingSoon: true,
    },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 leading-tight">Multi-Location Management</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">4 active branches</p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={16} strokeWidth={3} /> Add Branch
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-1.5 items-start justify-center h-[96px]">
          <span className="text-[28px] font-bold text-blue-600 leading-none">5</span>
          <span className="text-[13px] font-medium text-slate-500">Total Branches</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-1.5 items-start justify-center h-[96px]">
          <span className="text-[28px] font-bold text-emerald-500 leading-none">4</span>
          <span className="text-[13px] font-medium text-slate-500">Active Branches</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-1.5 items-start justify-center h-[96px]">
          <span className="text-[28px] font-bold text-purple-600 leading-none">69</span>
          <span className="text-[13px] font-medium text-slate-500">Total Employees</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-1.5 items-start justify-center h-[96px]">
          <span className="text-[28px] font-bold text-amber-500 leading-none">244</span>
          <span className="text-[13px] font-medium text-slate-500">Total Active Jobs</span>
        </div>
      </div>

      {/* Branch Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {branches.map((branch, i) => (
          <div 
            key={i} 
            onClick={() => setViewBranch(branch)}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-[230px] transition-all hover:shadow-md cursor-pointer hover:border-blue-200"
          >
            
            {/* Top Row: Avatar, Title, Status */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[18px] shrink-0 ${
                  branch.isComingSoon ? "bg-slate-300" : "bg-blue-600"
                }`}>
                  {branch.initial}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[15px] font-bold text-slate-900 leading-none">{branch.name}</h2>
                  <div className="flex items-center text-slate-500 text-[12px] font-medium gap-1">
                    <MapPin size={12} /> {branch.location}
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                branch.status === "Active" 
                  ? "bg-emerald-50 text-emerald-600" 
                  : "bg-slate-100 text-slate-500"
              }`}>
                {branch.status}
              </span>
            </div>

            {/* Content Body */}
            {branch.isComingSoon ? (
              <div className="flex-1 flex items-center justify-center">
                <span className="text-[14px] font-bold text-slate-300 uppercase tracking-widest mt-4">Opening Soon</span>
              </div>
            ) : (
              <div className="flex flex-col flex-1">
                <div className="text-[12px] font-medium text-slate-500 mb-4">
                  Manager: <span className="font-bold text-slate-900">{branch.manager}</span>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mt-auto">
                  <div className="bg-[#f8fafc] rounded-xl p-3 flex flex-col items-center justify-center gap-1">
                    <span className="text-[16px] font-bold text-slate-900 leading-none">{branch.jobs}</span>
                    <span className="text-[11px] font-medium text-slate-500">Jobs</span>
                  </div>
                  <div className="bg-[#faf5ff] rounded-xl p-3 flex flex-col items-center justify-center gap-1">
                    <span className="text-[16px] font-bold text-slate-900 leading-none">{branch.staff}</span>
                    <span className="text-[11px] font-medium text-slate-500">Staff</span>
                  </div>
                  <div className="bg-[#f0fdf4] rounded-xl p-3 flex flex-col items-center justify-center gap-1">
                    <span className="text-[16px] font-bold text-emerald-600 leading-none">{branch.efficiency}</span>
                    <span className="text-[11px] font-medium text-slate-500">Efficiency</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

      <AddBranchModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <BranchDetailsPanel 
        isOpen={!!viewBranch}
        onClose={() => setViewBranch(null)}
        branch={viewBranch}
      />

    </div>
  );
}
