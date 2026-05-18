"use client";

import React, { useState } from "react";
import { 
  Activity, 
  User, 
  Monitor, 
  Filter, 
  Search, 
  Download, 
  Clock,
  ChevronDown
} from "lucide-react";

export default function AuditLogsPage() {
  const [activeView, setActiveView] = useState("Activity Table");

  const logs = [
    {
      id: 1,
      user: { name: "Alex Thompson", initials: "AT", color: "bg-blue-600" },
      role: "Super Admin",
      action: "Updated pricing for ABC Steel Corp",
      timelineTitle: "Pricing updated",
      timelineHour: "14",
      timelineColor: "bg-indigo-500",
      module: "Pricing",
      moduleColor: "bg-fuchsia-50 text-fuchsia-600",
      time: "Apr 21, 2026 14:35",
      ip: "192.168.1.1",
      device: "Chrome / Windows"
    },
    {
      id: 2,
      user: { name: "Mike Torres", initials: "MT", color: "bg-blue-600" },
      role: "Supervisor",
      action: "Completed QC inspection for P-2234",
      timelineTitle: "QC inspection completed — PASS",
      timelineHour: "13",
      timelineColor: "bg-emerald-500",
      module: "Quality Control",
      moduleColor: "bg-emerald-50 text-emerald-600",
      time: "Apr 21, 2026 13:52",
      ip: "10.0.0.14",
      device: "Safari / iPhone"
    },
    {
      id: 3,
      user: { name: "Sara Kim", initials: "SK", color: "bg-blue-600" },
      role: "Supervisor",
      action: "Created new ticket TK-2846",
      timelineTitle: "New ticket TK-2846 created",
      timelineHour: "12",
      timelineColor: "bg-blue-600",
      module: "Jobs",
      moduleColor: "bg-blue-50 text-blue-600",
      time: "Apr 21, 2026 12:18",
      ip: "10.0.0.22",
      device: "Chrome / Mac"
    },
    {
      id: 4,
      user: { name: "Alex Thompson", initials: "AT", color: "bg-blue-600" },
      role: "Super Admin",
      action: "Added new employee Elena Martinez",
      timelineTitle: "New employee added",
      timelineHour: "11",
      timelineColor: "bg-orange-500",
      module: "Employees",
      moduleColor: "bg-amber-50 text-amber-600",
      time: "Apr 21, 2026 11:04",
      ip: "192.168.1.1",
      device: "Chrome / Windows"
    },
    {
      id: 5,
      user: { name: "James Rowe", initials: "JR", color: "bg-blue-600" },
      role: "QC Inspector",
      action: "Marked P-2230 as Failed - Thin coating",
      timelineTitle: "QC Failed — P-2230 - Thin coating",
      timelineHour: "10",
      timelineColor: "bg-red-500",
      module: "Quality Control",
      moduleColor: "bg-emerald-50 text-emerald-600",
      time: "Apr 21, 2026 10:33",
      ip: "10.0.0.31",
      device: "Chrome / Android"
    },
    {
      id: 6,
      user: { name: "Elena Cruz", initials: "EC", color: "bg-blue-600" },
      role: "Worker",
      action: "Completed Coating step for P-2224",
      timelineTitle: "Coating step completed — P-2224",
      timelineHour: "09",
      timelineColor: "bg-cyan-500",
      module: "Process Workflow",
      moduleColor: "bg-cyan-50 text-cyan-600",
      time: "Apr 21, 2026 09:48",
      ip: "10.0.0.44",
      device: "Firefox / Windows"
    },
    {
      id: 7,
      user: { name: "Alex Thompson", initials: "AT", color: "bg-blue-600" },
      role: "Super Admin",
      action: "Changed password policy settings",
      timelineTitle: "Password policy settings changed",
      timelineHour: "16",
      timelineColor: "bg-slate-500",
      module: "Settings",
      moduleColor: "bg-slate-100 text-slate-600",
      time: "Apr 20, 2026 16:22",
      ip: "192.168.1.1",
      device: "Chrome / Windows"
    }
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 leading-tight">Audit Logs</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">Complete system activity history and user actions</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 p-1 rounded-full border border-slate-200 flex items-center shadow-sm">
            {["Activity Table", "Timeline"].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all ${
                  activeView === view
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {view}
              </button>
            ))}
          </div>
          
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2">
            <Download size={16} strokeWidth={2.5} /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
            <Activity size={20} strokeWidth={2.5} />
          </div>
          <div className="text-[24px] font-bold text-slate-900 leading-none">12</div>
          <div className="text-[13px] font-medium text-slate-500 mt-1">Events Today</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mb-4">
            <User size={20} strokeWidth={2.5} />
          </div>
          <div className="text-[24px] font-bold text-slate-900 leading-none">6</div>
          <div className="text-[13px] font-medium text-slate-500 mt-1">Unique Users</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4">
            <Monitor size={20} strokeWidth={2.5} />
          </div>
          <div className="text-[24px] font-bold text-slate-900 leading-none">9</div>
          <div className="text-[13px] font-medium text-slate-500 mt-1">Modules Touched</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-4">
            <Filter size={20} strokeWidth={2.5} />
          </div>
          <div className="text-[24px] font-bold text-slate-900 leading-none">12</div>
          <div className="text-[13px] font-medium text-slate-500 mt-1">Filtered Results</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col xl:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search actions, users..." 
            className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200 rounded-full text-[14px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="h-11 px-5 bg-white border border-slate-200 rounded-full text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2 min-w-[120px] justify-between">
            <span>User</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          <button className="h-11 px-5 bg-white border border-slate-200 rounded-full text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2 min-w-[120px] justify-between">
            <span>Module</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          <button className="h-11 px-5 bg-white border border-slate-200 rounded-full text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2 min-w-[120px] justify-between">
            <span>Action Type</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <input type="date" className="h-11 px-4 bg-white border border-slate-200 rounded-full text-[13px] font-medium text-slate-600 focus:outline-none shadow-sm" />
          <span className="text-[13px] font-medium text-slate-400">to</span>
          <input type="date" className="h-11 px-4 bg-white border border-slate-200 rounded-full text-[13px] font-medium text-slate-600 focus:outline-none shadow-sm" />
        </div>
      </div>

      {/* Content View */}
      {activeView === "Activity Table" ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 px-6 text-[12px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">User</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Role</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Action</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Module</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Time</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">IP / Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${log.user.color} flex items-center justify-center text-white text-[12px] font-bold shrink-0`}>
                          {log.user.initials}
                        </div>
                        <span className="text-[14px] font-bold text-slate-900 whitespace-nowrap">{log.user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[13px] text-slate-500 whitespace-nowrap">{log.role}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[14px] text-slate-700 whitespace-nowrap">{log.action}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-bold whitespace-nowrap ${log.moduleColor}`}>
                        {log.module}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-slate-500 whitespace-nowrap">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-[13px]">{log.time}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col whitespace-nowrap">
                        <span className="text-[13px] text-slate-700">{log.ip}</span>
                        <span className="text-[12px] text-slate-400 mt-0.5">{log.device}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-[15px] font-bold text-slate-900">System Activity Timeline — Today</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] font-bold shrink-0 shadow-sm ${log.timelineColor}`}>
                    {log.timelineHour}
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-slate-900">{log.timelineTitle}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                      <User size={14} className="text-slate-400" />
                      <span className="text-[13px]">{log.user.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
                  <Clock size={14} />
                  <span className="text-[13px] font-medium">{log.time.split(' ')[3]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
