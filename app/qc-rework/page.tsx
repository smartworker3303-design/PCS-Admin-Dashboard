"use client";

import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, ShieldAlert, Wrench, AlertTriangle } from "lucide-react";
import AddQCModal from "@/components/AddQCModal";
import NewInspectionModal from "@/components/NewInspectionModal";

export default function QCReworkPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAddEquipmentOpen, setIsAddEquipmentOpen] = useState(false);
  const [isNewInspectionOpen, setIsNewInspectionOpen] = useState(false);

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 mb-1">Quality Control Panel</h1>
          <p className="text-[14px] text-slate-500">Inspections, calibration, and non-conforming parts management</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setIsNewInspectionOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors shadow-sm flex items-center"
          >
            <span className="mr-1.5 text-lg leading-none">+</span> New Inspection
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-8">
        <div className="bg-slate-50/80 p-1.5 rounded-2xl inline-flex gap-1 border border-slate-100">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`px-6 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === "dashboard" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            QC Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("inspections")}
            className={`px-6 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === "inspections" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            Inspections
          </button>
          <button 
            onClick={() => setActiveTab("non-conforming")}
            className={`px-6 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === "non-conforming" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            Non-Conforming
          </button>
          <button 
            onClick={() => setActiveTab("calibration")}
            className={`px-6 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === "calibration" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            Calibration
          </button>
        </div>
      </div>

      {activeTab === "dashboard" && (
        <div className="animate-in fade-in duration-300">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-blue-500" />
                </div>
                <span className="text-2xl font-bold text-slate-900">64</span>
              </div>
              <p className="text-[13px] font-medium text-slate-500">Inspected Today</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                </div>
                <span className="text-2xl font-bold text-slate-900">248</span>
              </div>
              <p className="text-[13px] font-medium text-slate-500">Passed</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <ShieldAlert size={20} className="text-red-500" />
                </div>
                <span className="text-2xl font-bold text-slate-900">42</span>
              </div>
              <p className="text-[13px] font-medium text-slate-500">Failed / Rework</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <Wrench size={20} className="text-amber-500" />
                </div>
                <span className="text-2xl font-bold text-slate-900">2</span>
              </div>
              <p className="text-[13px] font-medium text-slate-500">Calibration Due</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Pass / Fail Distribution */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-[16px] font-bold text-slate-900 mb-8">Pass / Fail Distribution</h2>
              
              <div className="flex items-center justify-center gap-12 mt-2">
                {/* Custom Donut Chart (CSS) */}
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="20" />
                    {/* Rework: 18 (approx 6%) */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.06)} className="transition-all duration-1000 ease-out" />
                    {/* Failed: 24 (approx 8%) */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.14)} className="transition-all duration-1000 ease-out" />
                    {/* Passed: 248 (approx 86%) */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.86)} className="transition-all duration-1000 ease-out" />
                    
                    {/* Gap lines (white strokes for separation) */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ffffff" strokeWidth="22" strokeDasharray="2 249.2" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ffffff" strokeWidth="22" strokeDasharray="2 249.2" strokeDashoffset={-251.2 * 0.86} />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ffffff" strokeWidth="22" strokeDasharray="2 249.2" strokeDashoffset={-251.2 * 0.94} />
                  </svg>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[13px] text-slate-500 w-12">Passed</span>
                    <span className="text-[14px] font-bold text-slate-900">248</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <span className="text-[13px] text-slate-500 w-12">Failed</span>
                    <span className="text-[14px] font-bold text-slate-900">24</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <span className="text-[13px] text-slate-500 w-12">Rework</span>
                    <span className="text-[14px] font-bold text-slate-900">18</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Failed Parts */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-[16px] font-bold text-slate-900 mb-6">Recent Failed Parts</h2>
              
              <div className="flex flex-col gap-3">
                {/* Item 1 */}
                <div className="bg-red-50/40 border border-red-100 rounded-2xl p-4 flex justify-between items-center transition-colors hover:bg-red-50/60 cursor-pointer">
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-900 mb-1">P-2230</h4>
                    <p className="text-[12px] text-slate-400">Ticket: TK-2846 - Thin coating</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="bg-red-100/80 text-red-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Failed</span>
                    <span className="text-[11px] font-medium text-slate-400">Tom Hill</span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 flex justify-between items-center transition-colors hover:bg-amber-50/60 cursor-pointer">
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-900 mb-1">P-2229</h4>
                    <p className="text-[12px] text-slate-400">Ticket: TK-2845 - Adhesion issue</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="bg-amber-100/80 text-amber-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Rework</span>
                    <span className="text-[11px] font-medium text-slate-400">Jane Lee</span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="bg-red-50/40 border border-red-100 rounded-2xl p-4 flex justify-between items-center transition-colors hover:bg-red-50/60 cursor-pointer">
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-900 mb-1">P-2228</h4>
                    <p className="text-[12px] text-slate-400">Ticket: TK-2842 - Bare spots</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="bg-red-100/80 text-red-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Failed</span>
                    <span className="text-[11px] font-medium text-slate-400">Tom Hill</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Inspections Tab */}
      {activeTab === "inspections" && (
        <div className="animate-in fade-in duration-300 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">QC ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">PART ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TICKET</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">INSPECTOR</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">THICKNESS</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">GLOSS</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TEMP</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">DEFECT</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">RESULT</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { qcId: "QC-0892", partId: "P-2234", ticket: "TK-2847", inspector: "Jane Lee", thickness: "3.2 mil", gloss: "78", temp: "380°F", defect: "—", result: "Passed", date: "Apr 21, 2026" },
                { qcId: "QC-0891", partId: "P-2230", ticket: "TK-2846", inspector: "Tom Hill", thickness: "1.8 mil", gloss: "42", temp: "375°F", defect: "Thin coating", result: "Failed", date: "Apr 21, 2026" },
                { qcId: "QC-0890", partId: "P-2229", ticket: "TK-2845", inspector: "Jane Lee", thickness: "2.5 mil", gloss: "60", temp: "382°F", defect: "Adhesion issue", result: "Rework", date: "Apr 20, 2026" },
                { qcId: "QC-0889", partId: "P-2228", ticket: "TK-2844", inspector: "Tom Hill", thickness: "3.1 mil", gloss: "76", temp: "380°F", defect: "—", result: "Passed", date: "Apr 20, 2026" },
                { qcId: "QC-0888", partId: "P-2227", ticket: "TK-2843", inspector: "Jane Lee", thickness: "3.4 mil", gloss: "80", temp: "378°F", defect: "—", result: "Passed", date: "Apr 19, 2026" },
                { qcId: "QC-0887", partId: "P-2226", ticket: "TK-2842", inspector: "Tom Hill", thickness: "1.5 mil", gloss: "30", temp: "365°F", defect: "Bare spots", result: "Failed", date: "Apr 19, 2026" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-[13px] font-bold text-blue-600">{row.qcId}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-slate-700">{row.partId}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{row.ticket}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-700">{row.inspector}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{row.thickness}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{row.gloss}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{row.temp}</td>
                  <td className={`px-6 py-4 text-[13px] ${row.defect !== "—" ? "text-red-500" : "text-slate-400"}`}>{row.defect}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      row.result === "Passed" ? "bg-emerald-100/80 text-emerald-600" :
                      row.result === "Failed" ? "bg-red-100/80 text-red-600" :
                      "bg-amber-100/80 text-amber-600"
                    }`}>
                      {row.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Non-Conforming Tab */}
      {activeTab === "non-conforming" && (
        <div className="animate-in fade-in duration-300 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-[16px] font-bold text-slate-900">Non-Conforming Parts</h2>
          </div>
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">PART ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TICKET</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">FAILURE REASON</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">ASSIGNED SUPERVISOR</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">RETURN TO STEP</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">ACTION</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { partId: "P-2230", ticket: "TK-2846", reason: "Thin coating", supervisor: "Tom Hill", status: "Failed" },
                { partId: "P-2229", ticket: "TK-2845", reason: "Adhesion issue", supervisor: "Jane Lee", status: "Rework" },
                { partId: "P-2226", ticket: "TK-2842", reason: "Bare spots", supervisor: "Tom Hill", status: "Failed" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-[13px] font-bold text-blue-600">{row.partId}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{row.ticket}</td>
                  <td className="px-6 py-4 text-[13px] text-red-500 font-medium">{row.reason}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-700">{row.supervisor}</td>
                  <td className="px-6 py-4">
                    <input 
                      type="text" 
                      className="w-16 h-8 border border-slate-200 rounded-lg px-2 text-[12px] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-colors shadow-sm">
                      Send to Rework
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      row.status === "Failed" ? "bg-red-100/80 text-red-600" :
                      "bg-amber-100/80 text-amber-600"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Calibration Tab */}
      {activeTab === "calibration" && (
        <div className="animate-in fade-in duration-300">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-bold text-slate-900">Calibration Management</h2>
            <button 
              onClick={() => setIsAddEquipmentOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-[13px] font-semibold transition-colors shadow-sm flex items-center"
            >
              <span className="mr-1.5 text-lg leading-none">+</span> Add Equipment
            </button>
          </div>

          {/* Warning Banner */}
          <div className="bg-red-50 rounded-xl p-4 mb-6 flex items-start gap-3 border border-red-100/50">
            <AlertTriangle size={18} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-[13px] font-bold text-red-600 mb-0.5">Calibration Overdue</h4>
              <p className="text-[13px] text-red-600/80">DFT Gauge #2 — immediate calibration required.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">EQUIPMENT</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">SERIAL #</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">LOCATION</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">LAST CALIBRATION</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">NEXT DUE</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">CERT. EXPIRY</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { equip: "DFT Gauge #1", serial: "DFT-001-2022", location: "Houston", last: "Mar 15, 2026", next: "Jun 15, 2026", cert: "Dec 15, 2026", status: "Valid" },
                  { equip: "DFT Gauge #2", serial: "DFT-002-2022", location: "Dallas", last: "Jan 10, 2026", next: "Apr 10, 2026", cert: "Oct 10, 2026", status: "Overdue" },
                  { equip: "Gloss Meter #1", serial: "GM-001-2023", location: "Houston", last: "Apr 01, 2026", next: "Jul 01, 2026", cert: "Apr 01, 2027", status: "Valid" },
                  { equip: "Adhesion Tester", serial: "AT-001-2021", location: "Austin", last: "Feb 20, 2026", next: "May 20, 2026", cert: "Aug 20, 2026", status: "Due Soon" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-[13px] font-bold text-slate-800">{row.equip}</td>
                    <td className="px-6 py-4 text-[13px] text-slate-400">{row.serial}</td>
                    <td className="px-6 py-4 text-[13px] text-slate-500">{row.location}</td>
                    <td className="px-6 py-4 text-[13px] text-slate-500">{row.last}</td>
                    <td className="px-6 py-4 text-[13px] text-slate-500">{row.next}</td>
                    <td className="px-6 py-4 text-[13px] text-slate-500">{row.cert}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        row.status === "Valid" ? "bg-emerald-100/80 text-emerald-600" :
                        row.status === "Overdue" ? "bg-red-100/80 text-red-600" :
                        "bg-amber-100/80 text-amber-600"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
                        row.status === "Overdue" ? "border-red-200 text-red-500 hover:bg-red-50" :
                        row.status === "Due Soon" ? "border-amber-200 text-amber-500 hover:bg-amber-50" :
                        "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}>
                        Log Calibration
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AddQCModal 
        isOpen={isAddEquipmentOpen} 
        onClose={() => setIsAddEquipmentOpen(false)} 
      />

      <NewInspectionModal 
        isOpen={isNewInspectionOpen} 
        onClose={() => setIsNewInspectionOpen(false)} 
      />

    </div>
  );
}
