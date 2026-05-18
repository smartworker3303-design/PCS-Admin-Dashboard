"use client";

import React, { useState } from "react";
import { Plus, Mail, Smartphone, Eye, Send } from "lucide-react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("Templates");

  const templates = [
    { name: "Job Completion", channel: "Email", channelIcon: Mail, channelColor: "blue", subject: "Your job {{ticket_id}} is ready", status: "Active" },
    { name: "Pickup Ready", channel: "SMS", channelIcon: Smartphone, channelColor: "emerald", subject: "Parts ready for pickup at {{branch}}", status: "Active" },
    { name: "QC Failure Alert", channel: "Email", channelIcon: Mail, channelColor: "blue", subject: "QC Issue on {{ticket_id}} - Action Required", status: "Active" },
    { name: "Invoice Reminder", channel: "Email", channelIcon: Mail, channelColor: "blue", subject: "Invoice {{invoice_id}} due in 3 days", status: "Inactive" },
    { name: "Delay Notification", channel: "SMS", channelIcon: Smartphone, channelColor: "emerald", subject: "Job {{ticket_id}} delayed - new ETA {{eta}}", status: "Active" },
  ];

  const logsData = [
    { template: "Job Completion", recipient: "john@abcsteel.com", channel: "Email", channelIcon: Mail, channelColor: "blue", sentAt: "Apr 21, 2026 14:23", status: "Delivered" },
    { template: "Pickup Ready", recipient: "+1 (713) 555-0142", channel: "SMS", channelIcon: Smartphone, channelColor: "emerald", sentAt: "Apr 21, 2026 11:45", status: "Delivered" },
    { template: "QC Failure Alert", recipient: "mark@gulfcoast.com", channel: "Email", channelIcon: Mail, channelColor: "blue", sentAt: "Apr 20, 2026 16:10", status: "Failed" },
    { template: "Invoice Reminder", recipient: "amy@lonestar.com", channel: "Email", channelIcon: Mail, channelColor: "blue", sentAt: "Apr 20, 2026 09:00", status: "Delivered" },
    { template: "Delay Notification", recipient: "+1 (214) 555-0238", channel: "SMS", channelIcon: Smartphone, channelColor: "emerald", sentAt: "Apr 19, 2026 13:22", status: "Delivered" },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 leading-tight">Notification Center</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">Manage message templates and notification logs</p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2">
          <Plus size={16} strokeWidth={2.5} /> Create Template
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-2 items-start justify-center h-[96px]">
          <span className="text-[28px] font-bold text-blue-600 leading-none">4</span>
          <span className="text-[13px] font-medium text-slate-500">Active Templates</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-2 items-start justify-center h-[96px]">
          <span className="text-[28px] font-bold text-emerald-500 leading-none">24</span>
          <span className="text-[13px] font-medium text-slate-500">Sent Today</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-2 items-start justify-center h-[96px]">
          <span className="text-[28px] font-bold text-red-500 leading-none">1</span>
          <span className="text-[13px] font-medium text-slate-500">Failed</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-2 items-start justify-center h-[96px]">
          <span className="text-[28px] font-bold text-indigo-500 leading-none">5</span>
          <span className="text-[13px] font-medium text-slate-500">Total Logs</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-xl inline-flex mb-6 border border-slate-100 shadow-sm">
        {["Templates", "Logs", "Create Template"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-[13px] font-bold transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Data Table */}
      {activeTab === "Templates" && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-100 bg-white">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Template Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Channel</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {templates.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors bg-white">
                    <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-slate-900">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <row.channelIcon 
                          size={14} 
                          className={row.channelColor === "blue" ? "text-blue-500" : "text-emerald-500"} 
                          strokeWidth={2.5}
                        />
                        <span className={`text-[13px] font-bold ${row.channelColor === "blue" ? "text-blue-500" : "text-emerald-500"}`}>
                          {row.channel}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[13px] text-slate-500 font-medium">
                      {row.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        row.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors">
                        <Eye size={14} strokeWidth={2.5} />
                        <span className="text-[12px] font-bold">Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Logs" && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-100 bg-white">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Template</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recipient</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Channel</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sent At</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logsData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors bg-white">
                    <td className="px-6 py-4 whitespace-nowrap text-[13px] font-bold text-slate-900">
                      {row.template}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[13px] text-slate-500 font-medium">
                      {row.recipient}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <row.channelIcon 
                          size={14} 
                          className={row.channelColor === "blue" ? "text-blue-500" : "text-emerald-500"} 
                          strokeWidth={2.5}
                        />
                        <span className={`text-[13px] font-bold ${row.channelColor === "blue" ? "text-blue-500" : "text-emerald-500"}`}>
                          {row.channel}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[13px] text-slate-500 font-medium">
                      {row.sentAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        row.status === "Delivered" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Create Template" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Left Column - Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <h2 className="text-[16px] font-bold text-slate-900 mb-1">Create Notification Template</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-700">Template Name</label>
              <input 
                type="text" 
                placeholder="e.g. Job Completion Notice"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-700">Channel</label>
              <div className="flex gap-3">
                <button className="bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2">
                  <Mail size={16} /> Email
                </button>
                <button className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2">
                  <Smartphone size={16} className="text-slate-400" /> SMS
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-700">Subject Line</label>
              <input 
                type="text" 
                placeholder="Subject with {{variables}}"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-700">Message Body</label>
              <textarea 
                placeholder="Write your message here. Use {{variables}} for dynamic content."
                className="w-full border border-slate-200 rounded-lg p-3 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm min-h-[160px] resize-none"
              />
            </div>
            
            <div className="flex gap-3 mt-2">
              <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl text-[13px] transition-colors shadow-sm">
                Cancel
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-[13px] transition-colors shadow-sm">
                Save Template
              </button>
            </div>
            
          </div>
          
          {/* Right Column - Variables & Test */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-[16px] font-bold text-slate-900 mb-4">Available Variables</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {["{{ticket_id}}", "{{customer_name}}", "{{branch}}", "{{eta}}", "{{invoice_id}}", "{{part_count}}", "{{status}}"].map((variable) => (
                  <span key={variable} className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-[12px] font-bold font-mono">
                    {variable}
                  </span>
                ))}
              </div>
              
              <h3 className="text-[12px] font-bold text-slate-700 mb-3">Send Test Preview</h3>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="test@example.com"
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
                />
                <button className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-lg text-[13px] transition-colors shadow-sm flex items-center justify-center gap-2">
                  <Send size={14} className="text-slate-500" /> Send Test
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
