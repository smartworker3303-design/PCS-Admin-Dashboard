import React, { useState } from "react";
import { X } from "lucide-react";

interface Branch {
  name: string;
  location: string;
  manager?: string;
  status: string;
  jobs?: string;
  staff?: string;
  efficiency?: string;
  isComingSoon?: boolean;
}

interface BranchDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  branch: Branch | null;
}

export default function BranchDetailsPanel({ isOpen, onClose, branch }: BranchDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  if (!isOpen || !branch) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl z-[210] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-6 flex justify-between items-start">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[20px] font-bold text-slate-900 leading-none">{branch.name}</h2>
            <span className="text-[12px] text-slate-500 font-medium">910 Tech Corridor, {branch.location}, TX 78701</span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pb-2">
          <div className="bg-slate-50 p-1.5 rounded-full flex border border-slate-100 shadow-sm">
            {["Overview", "Employees", "Inventory", "Jobs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-[12px] font-bold rounded-full transition-all ${
                  activeTab === tab 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === "Overview" && !branch.isComingSoon && (
            <div className="grid grid-cols-2 gap-4">
              
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-1.5 border border-slate-100 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400">Branch Manager</span>
                <span className="text-[13px] font-bold text-slate-900">{branch.manager}</span>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-1.5 border border-slate-100 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400">Phone</span>
                <span className="text-[13px] font-bold text-slate-900">+1 (512) 555-3000</span>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-1.5 border border-slate-100 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400">Active Jobs</span>
                <span className="text-[13px] font-bold text-slate-900">{branch.jobs}</span>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-1.5 border border-slate-100 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400">Total Employees</span>
                <span className="text-[13px] font-bold text-slate-900">{branch.staff}</span>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-1.5 border border-slate-100 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400">Status</span>
                <span className="text-[13px] font-bold text-slate-900">{branch.status}</span>
              </div>

              <div className="col-span-2 bg-slate-50 rounded-2xl p-4 flex flex-col gap-1.5 border border-slate-100 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400">Address</span>
                <span className="text-[13px] font-bold text-slate-900">910 Tech Corridor, {branch.location}, TX 78701</span>
              </div>

            </div>
          )}

          {activeTab === "Overview" && branch.isComingSoon && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <span className="text-[14px] font-bold uppercase tracking-widest mt-12">Opening Soon</span>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
