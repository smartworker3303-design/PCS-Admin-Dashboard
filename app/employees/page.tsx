"use client";

import React, { useState } from "react";
import { Search, Eye, Users, Clock, Award, Plus } from "lucide-react";
import AddEmployeeModal from "@/components/AddEmployeeModal";
import EmployeeDetailsPanel from "@/components/EmployeeDetailsPanel";

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Employee List");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewEmployee, setViewEmployee] = useState<any>(null);

  const employees = [
    { id: "E1", initials: "MT", name: "Mike Torres", role: "Supervisor", branch: "Houston", status: "Clocked In", device: "DEV-001", parts: "284", shift: "07:00 - 15:00" },
    { id: "E2", initials: "SK", name: "Sara Kim", role: "Supervisor", branch: "Dallas", status: "Clocked In", device: "DEV-002", parts: "231", shift: "07:00 - 15:00" },
    { id: "E3", initials: "JR", name: "James Rowe", role: "QC Inspector", branch: "Houston", status: "Clocked Out", device: "DEV-003", parts: "198", shift: "08:00 - 16:00" },
    { id: "E4", initials: "EC", name: "Elena Cruz", role: "Worker", branch: "Austin", status: "Clocked In", device: "DEV-004", parts: "156", shift: "07:00 - 15:00" },
    { id: "E5", initials: "PA", name: "Paul Adams", role: "Supervisor", branch: "San Antonio", status: "Clocked In", device: "DEV-005", parts: "209", shift: "08:00 - 16:00" },
    { id: "E6", initials: "RM", name: "Rachel Martinez", role: "Worker", branch: "Houston", status: "Clocked In", device: "DEV-006", parts: "143", shift: "15:00 - 23:00" },
    { id: "E7", initials: "TW", name: "Tom Williams", role: "Worker", branch: "Houston", status: "Clocked Out", device: "DEV-007", parts: "167", shift: "07:00 - 15:00" },
    { id: "E8", initials: "JL", name: "Jenny Lee", role: "QC Inspector", branch: "Dallas", status: "Clocked In", device: "DEV-008", parts: "221", shift: "08:00 - 16:00" },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 leading-tight">Employee Management</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">8 employees &middot; 6 currently clocked in</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-slate-50 p-1 rounded-full flex items-center shadow-sm">
            <button 
              onClick={() => setActiveTab("Employee List")}
              className={`px-4 py-1.5 text-[12px] font-bold rounded-full transition-colors ${
                activeTab === "Employee List" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Employee List
            </button>
            <button 
              onClick={() => setActiveTab("Analytics")}
              className={`px-4 py-1.5 text-[12px] font-bold rounded-full transition-colors ${
                activeTab === "Analytics" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Analytics
            </button>
          </div>
          
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center"
          >
            <Plus size={16} className="mr-1.5" strokeWidth={3} /> Add Employee
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-start">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
            <Users size={16} strokeWidth={2.5} />
          </div>
          <span className="text-[24px] font-bold text-slate-900 leading-none mb-1">8</span>
          <span className="text-[12px] font-medium text-slate-400">Total Employees</span>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-start">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
            <Clock size={16} strokeWidth={2.5} />
          </div>
          <span className="text-[24px] font-bold text-slate-900 leading-none mb-1">6</span>
          <span className="text-[12px] font-medium text-slate-400">Clocked In</span>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-start">
          <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
            <Clock size={16} strokeWidth={2.5} />
          </div>
          <span className="text-[24px] font-bold text-slate-900 leading-none mb-1">2</span>
          <span className="text-[12px] font-medium text-slate-400">Missing Clock-out</span>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-start">
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
            <Award size={16} strokeWidth={2.5} />
          </div>
          <span className="text-[20px] font-bold text-slate-900 leading-none mb-1">M. Torres</span>
          <span className="text-[12px] font-medium text-slate-400">Top Performer</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-[500px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search employees..." 
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          {/* Placeholder for filter pills to match screenshot visually */}
          <div className="w-[80px] h-11 border border-slate-200 rounded-full bg-white shadow-sm"></div>
          <div className="w-[80px] h-11 border border-slate-200 rounded-full bg-white shadow-sm"></div>
          <div className="w-[80px] h-11 border border-slate-200 rounded-full bg-white shadow-sm"></div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assigned Device</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Parts Completed</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shift</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((emp, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[12px] font-bold shrink-0">
                        {emp.initials}
                      </div>
                      <div className="text-[13px] font-bold text-slate-900">{emp.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      emp.role === "Supervisor" ? "bg-blue-50 text-blue-600" :
                      emp.role === "QC Inspector" ? "bg-purple-50 text-purple-600" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{emp.branch}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${emp.status === "Clocked In" ? "bg-emerald-500" : "bg-slate-300"}`}></div>
                      <span className="text-[12px] font-medium text-slate-500">{emp.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-slate-500 font-mono">{emp.device}</td>
                  <td className="px-6 py-4 text-[13px] font-bold text-slate-900">{emp.parts}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{emp.shift}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => setViewEmployee(emp)}
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddEmployeeModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <EmployeeDetailsPanel 
        isOpen={!!viewEmployee} 
        onClose={() => setViewEmployee(null)} 
        employee={viewEmployee} 
      />

    </div>
  );
}
