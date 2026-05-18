"use client";

import React, { useState } from "react";
import { Eye, Download, Share2, FileText, Link as LinkIcon } from "lucide-react";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("recent_reports");

  const reportsData = [
    { id: "RPT-0284", ticket: "TK-2847", customer: "ABC Steel Corp", sections: ["Process", "QC", "Invoice"], date: "Apr 21, 2026", size: "2.4 MB", shared: true },
    { id: "RPT-0283", ticket: "TK-2844", customer: "Lone Star Mfg", sections: ["Process", "Photos"], date: "Apr 20, 2026", size: "5.1 MB", shared: false },
    { id: "RPT-0282", ticket: "TK-2840", customer: "Coastal Pipeline", sections: ["QC", "Measurements", "Invoice"], date: "Apr 19, 2026", size: "3.8 MB", shared: true },
    { id: "RPT-0281", ticket: "TK-2839", customer: "Prime Steel Inc.", sections: ["Process", "QC"], date: "Apr 18, 2026", size: "1.9 MB", shared: false },
  ];

  const sharedLinksData = [
    { ticket: "TK-2847", recipient: "john@abcsteel.com", created: "Apr 21, 2026", expiry: "May 21, 2026", status: "Active" },
    { ticket: "TK-2840", recipient: "david@coastal.com", created: "Apr 19, 2026", expiry: "May 19, 2026", status: "Active" },
    { ticket: "TK-2835", recipient: "info@metalfab.com", created: "Apr 10, 2026", expiry: "Apr 15, 2026", status: "Expired" },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900 leading-tight">Reports & Analytics</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">Generate, preview, and share job reports</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center">
          <span className="mr-1.5 text-lg leading-none">+</span> Generate Report
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-[28px] font-bold text-blue-600 leading-none mb-2">284</div>
          <div className="text-[13px] font-medium text-slate-500">Reports Generated</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-[28px] font-bold text-emerald-500 leading-none mb-2">2</div>
          <div className="text-[13px] font-medium text-slate-500">Active Shared Links</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-[28px] font-bold text-slate-500 leading-none mb-2">1</div>
          <div className="text-[13px] font-medium text-slate-500">Expired Links</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-[28px] font-bold text-amber-500 leading-none mb-2">4</div>
          <div className="text-[13px] font-medium text-slate-500">This Month</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-xl inline-flex mb-6">
        <button 
          onClick={() => setActiveTab("recent_reports")}
          className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all ${
            activeTab === "recent_reports" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Recent Reports
        </button>
        <button 
          onClick={() => setActiveTab("report_builder")}
          className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all ${
            activeTab === "report_builder" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Report Builder
        </button>
        <button 
          onClick={() => setActiveTab("shared_links")}
          className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all ${
            activeTab === "shared_links" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Shared Links
        </button>
      </div>

      {/* Content */}
      {activeTab === "recent_reports" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Report ID</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ticket</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sections</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Generated</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Size</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shared</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {reportsData.map((report, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-[13px] font-bold text-blue-600">{report.id}</td>
                    <td className="py-4 px-6 text-[13px] text-slate-500">{report.ticket}</td>
                    <td className="py-4 px-6 text-[13px] text-slate-700">{report.customer}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1.5">
                        {report.sections.map((sec, i) => (
                          <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px] font-semibold">
                            {sec}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[13px] text-slate-500">{report.date}</td>
                    <td className="py-4 px-6 text-[13px] text-slate-500">{report.size}</td>
                    <td className="py-4 px-6">
                      {report.shared ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#d1fae5] text-emerald-600">
                          Shared
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[11px] font-medium text-slate-400">
                          Private
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-3 text-slate-400">
                        <button className="hover:text-blue-600 transition-colors" title="View">
                          <Eye size={16} />
                        </button>
                        <button className="hover:text-blue-600 transition-colors" title="Download">
                          <Download size={16} />
                        </button>
                        <button className="hover:text-blue-600 transition-colors" title="Share">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "report_builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
          
          {/* Configure Report */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
            <h2 className="text-[16px] font-bold text-slate-900 mb-5">Configure Report</h2>
            
            <div className="flex flex-col gap-5 flex-1">
              {/* Select Ticket */}
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-2">Select Ticket</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                />
              </div>

              {/* Include Sections */}
              <div className="flex-1">
                <label className="block text-[13px] font-semibold text-slate-700 mb-3">Include Sections</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Process Data", "Photos", "QC Results", "Measurements", "Invoice", "Customer Info", "Timeline"
                  ].map((section) => {
                    const isActive = ["Process Data", "QC Results", "Measurements", "Invoice", "Customer Info"].includes(section);
                    return (
                      <button 
                        key={section}
                        className={`flex items-center px-4 py-3 rounded-xl border text-[13px] font-bold transition-colors shadow-sm ${
                          isActive 
                            ? "bg-blue-600 border-blue-600 text-white" 
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className={`mr-2.5 w-4 h-4 rounded-sm border flex items-center justify-center ${isActive ? "border-white bg-blue-600" : "border-slate-300"}`}>
                          {isActive && <svg viewBox="0 0 14 14" fill="none" className="w-2.5 h-2.5"><path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        {section}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Generate Report Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-[14px] transition-colors shadow-sm mt-4">
                Generate Report
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full min-h-[400px]">
            <h2 className="text-[16px] font-bold text-slate-900 mb-5">Preview</h2>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                <FileText size={28} className="text-slate-200" />
              </div>
              <p className="text-[13px] font-medium text-slate-400 max-w-[240px]">Configure and generate a report to preview it here</p>
            </div>
          </div>

        </div>
      )}

      {activeTab === "shared_links" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ticket</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recipient</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Created</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Expiry</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sharedLinksData.map((link, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-[13px] font-bold text-blue-600">{link.ticket}</td>
                    <td className="py-4 px-6 text-[13px] text-slate-500">{link.recipient}</td>
                    <td className="py-4 px-6 text-[13px] text-slate-500">{link.created}</td>
                    <td className="py-4 px-6 text-[13px] text-slate-500">{link.expiry}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        link.status === "Active" 
                          ? "bg-[#d1fae5] text-emerald-600" 
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {link.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex justify-end items-center gap-3">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors" title="Copy Link">
                        <LinkIcon size={16} />
                      </button>
                      {link.status === "Expired" && (
                        <button className="px-3 py-1.5 border border-blue-200 text-blue-600 rounded-full text-[11px] font-bold hover:bg-blue-50 transition-colors shadow-sm">
                          Reissue
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
