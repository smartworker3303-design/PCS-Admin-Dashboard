"use client";

import React, { useState } from "react";
import { Search, Clock, CheckCircle2, AlertTriangle, Lock, Check, X, Edit2 } from "lucide-react";
import AdjustTimeEntryModal from "@/components/AdjustTimeEntryModal";

export default function TimeApprovalPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [editEntry, setEditEntry] = useState<any>(null);

  const timeEntries = [
    { id: "E1", initials: "MT", name: "Mike Torres", role: "Supervisor", branch: "Houston", date: "Apr 21, 2026", clockIn: "07:02", clockOut: "15:08", totalHrs: "8.10h", jobHrs: "7.50h", gpsStatus: "Verified", gpsColor: "emerald", status: "Pending", statusColor: "orange" },
    { id: "E2", initials: "SK", name: "Sara Kim", role: "Supervisor", branch: "Dallas", date: "Apr 21, 2026", clockIn: "06:55", clockOut: "15:12", totalHrs: "8.30h", jobHrs: "7.80h", gpsStatus: "Verified", gpsColor: "emerald", status: "Approved", statusColor: "emerald" },
    { id: "E3", initials: "JR", name: "James Rowe", role: "QC Inspector", branch: "Houston", date: "Apr 21, 2026", clockIn: "08:00", clockOut: "—", totalHrs: "—", jobHrs: "—", gpsStatus: "Missing", gpsColor: "red", status: "Flagged", statusColor: "red" },
    { id: "E4", initials: "EC", name: "Elena Cruz", role: "Worker", branch: "Austin", date: "Apr 21, 2026", clockIn: "07:05", clockOut: "15:03", totalHrs: "7.97h", jobHrs: "7.40h", gpsStatus: "Verified", gpsColor: "emerald", status: "Pending", statusColor: "orange" },
    { id: "E5", initials: "PA", name: "Paul Adams", role: "Supervisor", branch: "San Antonio", date: "Apr 21, 2026", clockIn: "08:01", clockOut: "16:15", totalHrs: "8.23h", jobHrs: "7.90h", gpsStatus: "Verified", gpsColor: "emerald", status: "Approved", statusColor: "emerald" },
    { id: "E6", initials: "RM", name: "Rachel Martinez", role: "Worker", branch: "Houston", date: "Apr 21, 2026", clockIn: "15:02", clockOut: "23:08", totalHrs: "8.10h", jobHrs: "7.80h", gpsStatus: "Verified", gpsColor: "emerald", status: "Pending", statusColor: "orange" },
    { id: "E7", initials: "TW", name: "Tom Williams", role: "Worker", branch: "Houston", date: "Apr 21, 2026", clockIn: "07:00", clockOut: "15:00", totalHrs: "8.00h", jobHrs: "7.50h", gpsStatus: "Partial", gpsColor: "orange", status: "Pending", statusColor: "orange" },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 leading-tight">Time Approval</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">Review, adjust, and approve employee time entries</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-[140px] h-[38px] border border-slate-200 rounded-lg bg-white shadow-sm"></div>
          <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2">
            <Lock size={14} /> Lock Timesheet
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-[100px]">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
              <Clock size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[24px] font-bold text-slate-900 leading-none">4</span>
          </div>
          <span className="text-[12px] font-medium text-slate-500">Pending Approval</span>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-[100px]">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[24px] font-bold text-slate-900 leading-none">3</span>
          </div>
          <span className="text-[12px] font-medium text-slate-500">Approved</span>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-[100px]">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <AlertTriangle size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[24px] font-bold text-slate-900 leading-none">1</span>
          </div>
          <span className="text-[12px] font-medium text-slate-500">Flagged / Issues</span>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-[100px]">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
              <Clock size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[24px] font-bold text-slate-900 leading-none">56.8h</span>
          </div>
          <span className="text-[12px] font-medium text-slate-500">Total Hours Today</span>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 mb-6 shadow-sm">
        <AlertTriangle className="text-red-500 mt-0.5 shrink-0" size={18} strokeWidth={2.5} />
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-red-600">Time Entry Issues Detected</span>
          <span className="text-[13px] text-red-500 font-medium">James Rowe &mdash; requires immediate attention (missing clock-out or GPS).</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-[500px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search employee..." 
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          {/* Placeholder for filter pills */}
          <div className="w-[100px] h-10 border border-slate-200 rounded-full bg-white shadow-sm"></div>
          <div className="w-[100px] h-10 border border-slate-200 rounded-full bg-white shadow-sm"></div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Branch</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clock In</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clock Out</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Hrs</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Job Hrs</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">GPS</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {timeEntries.map((entry, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors bg-white">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[12px] font-bold shrink-0">
                        {entry.initials}
                      </div>
                      <div className="text-[13px] font-bold text-slate-900">{entry.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] text-slate-500">{entry.role}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] text-slate-500">{entry.branch}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] text-slate-500">{entry.date}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] font-bold text-slate-900">{entry.clockIn}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] font-bold text-slate-900">{entry.clockOut}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] font-bold text-slate-900">{entry.totalHrs}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] text-slate-500">{entry.jobHrs}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        entry.gpsColor === "emerald" ? "bg-emerald-500" :
                        entry.gpsColor === "red" ? "bg-red-500" :
                        "bg-orange-500"
                      }`}></div>
                      <span className={`text-[12px] font-bold ${
                        entry.gpsColor === "emerald" ? "text-emerald-500" :
                        entry.gpsColor === "red" ? "text-red-500" :
                        "text-orange-500"
                      }`}>{entry.gpsStatus}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      entry.statusColor === "emerald" ? "bg-emerald-50 text-emerald-600" :
                      entry.statusColor === "red" ? "bg-red-50 text-red-600" :
                      "bg-orange-50 text-orange-600"
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      {entry.status === "Pending" && (
                        <>
                          <button className="hover:text-emerald-500 transition-colors"><Check size={14} strokeWidth={3} /></button>
                          <button className="hover:text-red-500 transition-colors"><X size={14} strokeWidth={3} /></button>
                        </>
                      )}
                      <button 
                        onClick={() => setEditEntry(entry)}
                        className="hover:text-blue-600 transition-colors ml-1"
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdjustTimeEntryModal 
        isOpen={!!editEntry}
        onClose={() => setEditEntry(null)}
        entry={editEntry}
      />

    </div>
  );
}
