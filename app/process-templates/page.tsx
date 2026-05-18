"use client";

import React, { useState } from "react";
import { AlertTriangle, Infinity, ArrowRight, Clock, CheckCircle2, Layers, Edit2, Play } from "lucide-react";
import LiveTrackingModal from "@/components/LiveTrackingModal";
import ApplyTemplateModal from "@/components/ApplyTemplateModal";
import EditTemplateModal from "@/components/EditTemplateModal";

export default function ProcessTemplatesPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const metrics = [
    { name: "Receiving", count: 32, avg: 1.2, late: 2, textColor: "text-blue-600", bgColor: "bg-blue-600" },
    { name: "Grinding", count: 28, avg: 2.4, late: 4, textColor: "text-purple-500", bgColor: "bg-purple-500" },
    { name: "Blasting", count: 41, avg: 1.8, late: 1, textColor: "text-amber-500", bgColor: "bg-amber-500" },
    { name: "Coating", count: 55, avg: 3.1, late: 6, textColor: "text-[#0ea5e9]", bgColor: "bg-[#0ea5e9]" }, // cyan-ish blue
    { name: "Oven", count: 38, avg: 4.2, late: 3, textColor: "text-orange-500", bgColor: "bg-orange-500" },
    { name: "QC", count: 29, avg: 1.5, late: 1, textColor: "text-emerald-500", bgColor: "bg-emerald-500" },
    { name: "Pickup", count: 18, avg: 0.8, late: 0, textColor: "text-indigo-500", bgColor: "bg-indigo-500" },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Process Workflow</h1>
          <p className="text-sm text-slate-500">Live production tracking and template management</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 shrink-0">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap shadow-sm transition-colors ${
              activeTab === "overview" 
                ? "bg-blue-600 text-white" 
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab("live_tracking")}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap shadow-sm transition-colors ${
              activeTab === "live_tracking" 
                ? "bg-blue-600 text-white" 
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Live Tracking
          </button>
          <button 
            onClick={() => setActiveTab("templates")}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap shadow-sm transition-colors ${
              activeTab === "templates" 
                ? "bg-blue-600 text-white" 
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Templates
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="animate-in fade-in duration-300">
          {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-1">
            <div className="text-[32px] font-extrabold text-slate-900 mb-2 leading-none">{m.count}</div>
            <div className={`text-[13px] font-bold ${m.textColor} mb-1.5 leading-none`}>{m.name}</div>
            <div className="text-[12px] text-slate-400 font-medium mb-1.5 leading-none">avg {m.avg}h</div>
            {m.late > 0 ? (
              <div className="flex items-center text-red-500 text-[11px] font-bold mt-1">
                <AlertTriangle size={12} className="mr-1" />
                {m.late} late
              </div>
            ) : (
              <div className="h-[18px] mt-1"></div>
            )}
          </div>
        ))}
      </div>

      {/* Process Flow Map */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-x-auto no-scrollbar">
        <h2 className="text-[16px] font-bold text-slate-900 mb-8">Process Flow Map</h2>
        <div className="flex items-center min-w-max pb-4 px-2">
          {metrics.map((m, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <div className={`w-[100px] h-[75px] rounded-2xl flex flex-col items-center justify-center text-white ${m.bgColor} shadow-md transition-transform hover:scale-105 cursor-pointer`}>
                  <Infinity size={24} className="mb-1.5 opacity-90" />
                  <span className="text-[12px] font-bold tracking-wide">{m.name}</span>
                </div>
                <span className="text-[12px] font-bold text-slate-500 mt-3">{m.count} parts</span>
              </div>
              {idx < metrics.length - 1 && (
                <div className="h-[75px] flex items-center mb-[28px]">
                  <ArrowRight size={18} className="text-slate-300 mx-3" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Average Time Chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <h2 className="text-[16px] font-bold text-slate-900 mb-8">Average Time per Step (hours)</h2>
        
        <div className="flex h-[280px]">
          {/* Y axis */}
          <div className="flex flex-col justify-between items-end pr-5 text-[12px] text-slate-400 font-medium pb-[34px] w-10">
            <span>8</span>
            <span>6</span>
            <span>4</span>
            <span>2</span>
            <span>0</span>
          </div>
          
          {/* Chart content */}
          <div className="flex-1 relative flex flex-col">
            {/* Chart area */}
            <div className="flex-1 relative border-b border-slate-200 flex items-end justify-around">
               {/* Background grid lines */}
               <div className="absolute inset-0 flex flex-col justify-between">
                  <div className="w-full h-px bg-slate-50"></div>
                  <div className="w-full h-px bg-slate-50"></div>
                  <div className="w-full h-px bg-slate-50"></div>
                  <div className="w-full h-px bg-slate-50"></div>
                  <div className="w-full h-px"></div>
               </div>
               
               {/* Bars */}
               {metrics.map((item, i) => (
                  <div key={i} className="relative z-10 w-full flex justify-center h-full items-end group cursor-pointer">
                    <div 
                      className="w-[75%] max-w-[120px] bg-[#1d70b8] rounded-t-sm transition-all duration-300 group-hover:bg-[#155b99] group-hover:w-[80%]"
                      style={{ height: `${(item.avg / 8) * 100}%` }}
                    ></div>
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 bg-slate-800 text-white text-[12px] font-bold py-1.5 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                      {item.avg} hours
                    </div>
                  </div>
                ))}
            </div>
            
            {/* X axis labels */}
            <div className="h-[34px] flex justify-around items-center text-[12px] font-medium text-slate-400 pt-3">
               {metrics.map((item, i) => (
                  <div key={i} className="flex-1 text-center truncate px-1">{item.name}</div>
               ))}
            </div>
          </div>
        </div>
      </div>
        </div>
      )}

      {activeTab === "templates" && (
        <div className="animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-bold text-slate-900">Process Templates</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-[13px] font-semibold transition-colors shadow-sm flex items-center">
              <span className="mr-1.5 text-lg leading-none">+</span> Create Template
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-[15px] font-bold text-slate-900">Standard Epoxy - Full Process</h3>
                <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold tracking-wide">Active</span>
              </div>
              <p className="text-[12px] font-medium text-slate-400 mb-4">Epoxy</p>
              
              <p className="text-[13px] text-slate-500 leading-relaxed mb-4 flex-1">
                Full 7-step process including pre-treatment, blasting, epoxy coating, and oven cure.
              </p>
              
              <div className="flex items-center text-[12px] font-bold text-slate-400 mb-6">
                <Layers size={14} className="mr-1.5 opacity-70" />
                7 process steps
              </div>
              
              <div className="flex gap-3 mt-auto">
                <button 
                  onClick={() => setEditingTemplate({
                    title: "Standard Epoxy - Full Process",
                    subtitle: "Epoxy",
                    description: "Full 7-step process including pre-treatment, blasting, epoxy coating, and oven cure.",
                    stepsCount: 7
                  })}
                  className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl text-[13px] transition-colors flex items-center justify-center"
                >
                  <Edit2 size={14} className="mr-2 opacity-70" />
                  Edit
                </button>
                <button 
                  onClick={() => setSelectedTemplate({
                    title: "Standard Epoxy - Full Process",
                    subtitle: "Epoxy",
                    description: "Full 7-step process including pre-treatment, blasting, epoxy coating, and oven cure.",
                    stepsCount: 7
                  })}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-[13px] transition-colors flex items-center justify-center shadow-sm"
                >
                  <Play size={14} className="mr-2" />
                  Use Template
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-[15px] font-bold text-slate-900">Quick Coat - Polyester</h3>
                <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold tracking-wide">Active</span>
              </div>
              <p className="text-[12px] font-medium text-slate-400 mb-4">Polyester</p>
              
              <p className="text-[13px] text-slate-500 leading-relaxed mb-4 flex-1">
                Streamlined 5-step process for polyester powder applications.
              </p>
              
              <div className="flex items-center text-[12px] font-bold text-slate-400 mb-6">
                <Layers size={14} className="mr-1.5 opacity-70" />
                5 process steps
              </div>
              
              <div className="flex gap-3 mt-auto">
                <button 
                  onClick={() => setEditingTemplate({
                    title: "Quick Coat - Polyester",
                    subtitle: "Polyester",
                    description: "Streamlined 5-step process for polyester powder applications.",
                    stepsCount: 5
                  })}
                  className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl text-[13px] transition-colors flex items-center justify-center"
                >
                  <Edit2 size={14} className="mr-2 opacity-70" />
                  Edit
                </button>
                <button 
                  onClick={() => setSelectedTemplate({
                    title: "Quick Coat - Polyester",
                    subtitle: "Polyester",
                    description: "Streamlined 5-step process for polyester powder applications.",
                    stepsCount: 5
                  })}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-[13px] transition-colors flex items-center justify-center shadow-sm"
                >
                  <Play size={14} className="mr-2" />
                  Use Template
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-[15px] font-bold text-slate-900">Heavy Duty - Industrial</h3>
                <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold tracking-wide">Draft</span>
              </div>
              <p className="text-[12px] font-medium text-slate-400 mb-4">Hybrid</p>
              
              <p className="text-[13px] text-slate-500 leading-relaxed mb-4 flex-1">
                Extended 9-step industrial coating with double coat and extended cure.
              </p>
              
              <div className="flex items-center text-[12px] font-bold text-slate-400 mb-6">
                <Layers size={14} className="mr-1.5 opacity-70" />
                9 process steps
              </div>
              
              <div className="flex gap-3 mt-auto">
                <button 
                  onClick={() => setEditingTemplate({
                    title: "Heavy Duty - Industrial",
                    subtitle: "Hybrid",
                    description: "Extended 9-step industrial coating with double coat and extended cure.",
                    stepsCount: 9
                  })}
                  className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl text-[13px] transition-colors flex items-center justify-center"
                >
                  <Edit2 size={14} className="mr-2 opacity-70" />
                  Edit
                </button>
                <button 
                  onClick={() => setSelectedTemplate({
                    title: "Heavy Duty - Industrial",
                    subtitle: "Hybrid",
                    description: "Extended 9-step industrial coating with double coat and extended cure.",
                    stepsCount: 9
                  })}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-[13px] transition-colors flex items-center justify-center shadow-sm"
                >
                  <Play size={14} className="mr-2" />
                  Use Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "live_tracking" && (
        <div className="animate-in fade-in duration-300">
          <div className="flex flex-col xl:flex-row gap-5 overflow-x-auto pb-4 items-start">
            
            {/* Waiting Column */}
            <div className="min-w-[280px] w-full xl:w-1/4 flex flex-col bg-white border border-slate-200 rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-slate-400 mr-2.5"></div>
                  <span className="text-[13px] font-bold text-slate-900">Waiting</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-slate-400 text-white flex items-center justify-center text-[10px] font-bold">3</div>
              </div>
              
              {[
                { id: "P-2234", status: "Coating", customer: "ABC Steel Corp", ticket: "TK-2847", worker: "R. Martinez", priority: "High", time: "45m", column: "Waiting" },
                { id: "P-2235", status: "Blasting", customer: "Metro Fab LLC", ticket: "TK-2846", worker: "T. Williams", priority: "Normal", time: "1.2h", column: "Waiting" },
                { id: "P-2236", status: "Oven", customer: "Gulf Coast Ind.", ticket: "TK-2845", worker: "J. Lee", priority: "Normal", time: "2.0h", column: "Waiting" },
              ].map((item, idx) => (
                <div key={idx} onClick={() => setSelectedRecord(item)} className="bg-white border border-slate-100 rounded-xl p-4 mb-3 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] cursor-pointer hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[13px] font-bold text-[#475569]">{item.id}</span>
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[11px] font-bold">{item.status}</span>
                  </div>
                  <div className="text-[12px] font-medium text-slate-700">{item.customer}</div>
                  <div className="text-[11px] text-slate-500 mb-1">Ticket: {item.ticket}</div>
                  <div className="text-[11px] text-slate-400">{item.worker}</div>
                  <div className="flex justify-between items-end mt-4">
                    {item.priority === "High" ? <span className="bg-amber-50 text-amber-600 font-bold px-2 py-0.5 text-[10px] rounded">High</span> : <div></div>}
                    <div className="flex items-center text-slate-400 text-[11px] font-medium"><Clock size={12} className="mr-1" /> {item.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* In Progress Column */}
            <div className="min-w-[280px] w-full xl:w-1/4 flex flex-col bg-white border border-slate-200 rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mr-2.5"></div>
                  <span className="text-[13px] font-bold text-slate-900">In Progress</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">4</div>
              </div>
              
              {[
                { id: "P-2230", status: "Grinding", customer: "Lone Star Mfg", ticket: "TK-2844", worker: "M. Torres", priority: "High", time: "0.5h", column: "In Progress" },
                { id: "P-2231", status: "Coating", customer: "Tex-Mex Metals", ticket: "TK-2843", worker: "S. Kim", priority: "Normal", time: "1.6h", column: "In Progress" },
                { id: "P-2232", status: "Blasting", customer: "Iron Works TX", ticket: "TK-2842", worker: "P. Adams", priority: "Rush", time: "0.3h", column: "In Progress" },
                { id: "P-2233", status: "QC", customer: "Southern Steels", ticket: "TK-2841", worker: "E. Cruz", priority: "Normal", time: "0.7h", column: "In Progress" },
              ].map((item, idx) => (
                <div key={idx} onClick={() => setSelectedRecord(item)} className="bg-white border border-slate-100 rounded-xl p-4 mb-3 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] cursor-pointer hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[13px] font-bold text-[#475569]">{item.id}</span>
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[11px] font-bold">{item.status}</span>
                  </div>
                  <div className="text-[12px] font-medium text-slate-700">{item.customer}</div>
                  <div className="text-[11px] text-slate-500 mb-1">Ticket: {item.ticket}</div>
                  <div className="text-[11px] text-slate-400">{item.worker}</div>
                  <div className="flex justify-between items-end mt-4">
                    {item.priority === "Rush" ? <span className="bg-red-50 text-red-600 font-bold px-2 py-0.5 text-[10px] rounded">Rush</span> : 
                     item.priority === "High" ? <span className="bg-amber-50 text-amber-600 font-bold px-2 py-0.5 text-[10px] rounded">High</span> : <div></div>}
                    <div className="flex items-center text-slate-400 text-[11px] font-medium"><Clock size={12} className="mr-1" /> {item.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Completed Column */}
            <div className="min-w-[280px] w-full xl:w-1/4 flex flex-col bg-white border border-slate-200 rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2.5"></div>
                  <span className="text-[13px] font-bold text-slate-900">Completed</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">3</div>
              </div>
              
              {[
                { id: "P-2227", status: "Pickup", customer: "Coastal Pipeline", ticket: "TK-2840", worker: "R. Martinez", priority: "Normal", time: "Done", column: "Completed" },
                { id: "P-2228", status: "QC", customer: "Prime Steel Inc.", ticket: "TK-2839", worker: "T. Williams", priority: "Normal", time: "Done", column: "Completed" },
                { id: "P-2229", status: "Oven", customer: "H-Town Fab", ticket: "TK-2838", worker: "J. Lee", priority: "Normal", time: "Done", column: "Completed" },
              ].map((item, idx) => (
                <div key={idx} onClick={() => setSelectedRecord(item)} className="bg-white border border-slate-100 rounded-xl p-4 mb-3 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] opacity-70 cursor-pointer hover:border-emerald-300 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[13px] font-bold text-[#475569]">{item.id}</span>
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[11px] font-bold">{item.status}</span>
                  </div>
                  <div className="text-[12px] font-medium text-slate-700">{item.customer}</div>
                  <div className="text-[11px] text-slate-500 mb-1">Ticket: {item.ticket}</div>
                  <div className="text-[11px] text-slate-400">{item.worker}</div>
                  <div className="flex justify-between items-end mt-4">
                    <div></div>
                    <div className="flex items-center text-slate-400 text-[11px] font-medium"><CheckCircle2 size={12} className="mr-1" /> {item.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delayed Column */}
            <div className="min-w-[280px] w-full xl:w-1/4 flex flex-col bg-white border border-slate-200 rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2.5"></div>
                  <span className="text-[13px] font-bold text-slate-900">Delayed</span>
                </div>
                <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">2</div>
              </div>
              
              {[
                { id: "P-2220", status: "Coating", customer: "Southern Steels", ticket: "TK-2841", worker: "M. Torres", priority: "High", time: "+3.2h late", column: "Delayed", isDelayed: true },
                { id: "P-2221", status: "Oven", customer: "Big D Metals", ticket: "TK-2838", worker: "P. Adams", priority: "Normal", time: "+1.5h late", column: "Delayed", isDelayed: true },
              ].map((item, idx) => (
                <div key={idx} onClick={() => setSelectedRecord(item)} className="bg-white border border-slate-100 rounded-xl p-4 mb-3 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] cursor-pointer hover:border-red-300 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[13px] font-bold text-[#475569]">{item.id}</span>
                    <span className="bg-red-50 text-red-500 px-2 py-0.5 rounded text-[11px] font-bold">{item.status}</span>
                  </div>
                  <div className="text-[12px] font-medium text-slate-700">{item.customer}</div>
                  <div className="text-[11px] text-slate-500 mb-1">Ticket: {item.ticket}</div>
                  <div className="text-[11px] text-slate-400">{item.worker}</div>
                  <div className="flex justify-between items-end mt-4">
                    {item.priority === "High" ? <span className="bg-amber-50 text-amber-600 font-bold px-2 py-0.5 text-[10px] rounded">High</span> : <div></div>}
                    <div className="flex items-center text-red-500 text-[11px] font-bold"><Clock size={12} className="mr-1" /> {item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <LiveTrackingModal 
        isOpen={!!selectedRecord} 
        onClose={() => setSelectedRecord(null)} 
        record={selectedRecord} 
      />

      <ApplyTemplateModal 
        isOpen={!!selectedTemplate} 
        onClose={() => setSelectedTemplate(null)} 
        template={selectedTemplate} 
      />

      <EditTemplateModal 
        isOpen={!!editingTemplate} 
        onClose={() => setEditingTemplate(null)} 
        template={editingTemplate} 
      />

    </div>
  );
}
