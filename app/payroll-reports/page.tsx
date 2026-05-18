"use client";

import React from "react";
import { Download, DollarSign, Clock, AlertTriangle } from "lucide-react";

export default function PayrollReportsPage() {

  const payrollData = [
    { initials: "MT", name: "Mike Torres", role: "Supervisor", branch: "Houston", regHrs: "40.0h", otHrs: "3.2h", approvedHrs: "43.2h", rate: "$28.00", adj: "—", adjColor: "emerald", gross: "$1254.40", status: "Approved" },
    { initials: "SK", name: "Sara Kim", role: "Supervisor", branch: "Dallas", regHrs: "40.0h", otHrs: "1.5h", approvedHrs: "41.5h", rate: "$26.00", adj: "-0.5h", adjColor: "red", gross: "$1085.50", status: "Approved" },
    { initials: "JR", name: "James Rowe", role: "QC Inspector", branch: "Houston", regHrs: "38.5h", otHrs: "—", approvedHrs: "38.5h", rate: "$24.00", adj: "—", adjColor: "emerald", gross: "$924.00", status: "Pending" },
    { initials: "EC", name: "Elena Cruz", role: "Worker", branch: "Austin", regHrs: "40.0h", otHrs: "4.8h", approvedHrs: "44.8h", rate: "$20.00", adj: "—", adjColor: "emerald", gross: "$944.00", status: "Approved" },
    { initials: "PA", name: "Paul Adams", role: "Supervisor", branch: "San Antonio", regHrs: "40.0h", otHrs: "2.0h", approvedHrs: "42.0h", rate: "$26.00", adj: "—", adjColor: "emerald", gross: "$1118.00", status: "Pending" },
    { initials: "RM", name: "Rachel Martinez", role: "Worker", branch: "Houston", regHrs: "40.0h", otHrs: "—", approvedHrs: "40.0h", rate: "$19.00", adj: "—", adjColor: "emerald", gross: "$760.00", status: "Approved" },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 leading-tight">Payroll Reports</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">Generate, review, and export weekly payroll</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-[180px] h-[38px] border border-slate-200 rounded-full bg-white shadow-sm"></div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2">
            <Download size={14} strokeWidth={2.5} /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <DollarSign size={16} strokeWidth={2.5} />
          </div>
          <div>
            <span className="block text-[24px] font-bold text-slate-900 leading-none mb-1.5">$7,764.15</span>
            <span className="block text-[12px] font-medium text-slate-400">Total Gross Pay</span>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <Clock size={16} strokeWidth={2.5} />
          </div>
          <div>
            <span className="block text-[24px] font-bold text-slate-900 leading-none mb-1.5">330.0h</span>
            <span className="block text-[12px] font-medium text-slate-400">Total Approved Hours</span>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
            <Clock size={16} strokeWidth={2.5} />
          </div>
          <div>
            <span className="block text-[24px] font-bold text-slate-900 leading-none mb-1.5">12.0h</span>
            <span className="block text-[12px] font-medium text-slate-400">Overtime Hours</span>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
            <AlertTriangle size={16} strokeWidth={2.5} />
          </div>
          <div>
            <span className="block text-[24px] font-bold text-slate-900 leading-none mb-1.5">3</span>
            <span className="block text-[12px] font-medium text-slate-400">Pending Approval</span>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex justify-between items-center mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-amber-500" size={18} strokeWidth={2.5} />
          <span className="text-[14px] font-bold text-amber-700">3 employees pending payroll approval for Apr 14 &mdash; Apr 20, 2026</span>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-5 rounded-full text-[13px] transition-colors shadow-sm">
          Approve All
        </button>
      </div>

      {/* Small Filter Pill */}
      <div className="mb-6">
        <div className="w-[100px] h-[36px] border border-slate-200 rounded-full bg-white shadow-sm"></div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Header Row (White) */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-[14px] font-bold text-slate-900">Week: Apr 14 &mdash; Apr 20, 2026</h2>
          <span className="text-[12px] font-medium text-slate-400">8 employees</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Branch</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reg Hours</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">OT Hours</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Approved Hrs</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rate/Hr</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Adjustments</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross Pay</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payrollData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors bg-white">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[12px] font-bold shrink-0">
                        {row.initials}
                      </div>
                      <div className="text-[13px] font-bold text-slate-900">{row.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] text-slate-500">{row.role}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] text-slate-500">{row.branch}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] text-slate-500">{row.regHrs}</td>
                  <td className={`px-4 py-4 whitespace-nowrap text-[13px] font-bold ${row.otHrs !== "—" ? "text-orange-500" : "text-slate-400"}`}>
                    {row.otHrs}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] font-bold text-slate-900">{row.approvedHrs}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] text-slate-500">{row.rate}</td>
                  <td className={`px-4 py-4 whitespace-nowrap text-[13px] font-bold ${row.adjColor === "red" ? "text-red-500" : "text-emerald-500"}`}>
                    {row.adj}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-[13px] font-bold text-slate-900">{row.gross}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      row.status === "Approved" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {row.status === "Pending" && (
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1.5 px-3.5 rounded-full text-[11px] transition-colors shadow-sm">
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
