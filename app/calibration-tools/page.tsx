"use client";

import React, { useState } from "react";
import { AlertTriangle, RefreshCw, Wrench, Upload } from "lucide-react";
import LogCalibrationModal from "@/components/LogCalibrationModal";
import UploadCertificateModal from "@/components/UploadCertificateModal";
import AddCalibrationToolModal from "@/components/AddCalibrationToolModal";
import CalibrationToolDetailsModal from "@/components/CalibrationToolDetailsModal";

export default function CalibrationToolsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [logTool, setLogTool] = useState<any>(null);
  const [uploadTool, setUploadTool] = useState<any>(null);
  const [isAddToolOpen, setIsAddToolOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<any>(null);

  const toolsData = [
    {
      id: "DFT Gauge #1",
      code: "DFT Gauge · DFT-001-2022",
      status: "Valid",
      location: "Houston",
      lastCalibrated: "Mar 15, 2026",
      nextDue: "Jun 15, 2026",
      certExpiry: "Dec 15, 2026",
      randomCheck: false,
    },
    {
      id: "DFT Gauge #2",
      code: "DFT Gauge · DFT-002-2022",
      status: "Overdue",
      location: "Dallas",
      lastCalibrated: "Jan 10, 2026",
      nextDue: "Apr 10, 2026",
      certExpiry: "Oct 10, 2026",
      randomCheck: true,
    },
    {
      id: "Gloss Meter #1",
      code: "Gloss Meter · GM-001-2023",
      status: "Valid",
      location: "Houston",
      lastCalibrated: "Apr 01, 2026",
      nextDue: "Jul 01, 2026",
      certExpiry: "Apr 01, 2027",
      randomCheck: false,
    },
    {
      id: "Adhesion Tester",
      code: "Adhesion Tester · AT-001-2021",
      status: "Due Soon",
      location: "Austin",
      lastCalibrated: "Feb 20, 2026",
      nextDue: "May 20, 2026",
      certExpiry: "Aug 20, 2026",
      randomCheck: false,
    },
    {
      id: "Holiday Detector",
      code: "Holiday Detector · HD-001-2023",
      status: "Valid",
      location: "Houston",
      lastCalibrated: "Apr 10, 2026",
      nextDue: "Jul 10, 2026",
      certExpiry: "Apr 10, 2027",
      randomCheck: true,
    },
    {
      id: "Thermometer #1",
      code: "Thermometer · TH-001-2022",
      status: "Valid",
      location: "San Antonio",
      lastCalibrated: "Mar 01, 2026",
      nextDue: "Jun 01, 2026",
      certExpiry: "Mar 01, 2027",
      randomCheck: false,
    },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900 leading-tight">Calibration Tools</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">Track instrument calibration, certificates, and compliance</p>
        </div>
        <button 
          onClick={() => setIsAddToolOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center"
        >
          <span className="mr-1.5 text-lg leading-none">+</span> Add Equipment
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Wrench size={16} className="text-blue-500" strokeWidth={2.5} />
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-1">Total Tools</span>
          </div>
          <span className="text-[28px] font-bold text-slate-900">6</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle size={16} className="text-red-500" strokeWidth={2.5} />
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-1">Overdue</span>
          </div>
          <span className="text-[28px] font-bold text-slate-900">1</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <RefreshCw size={16} className="text-purple-500" strokeWidth={2.5} />
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-1">Random Checks Due</span>
          </div>
          <span className="text-[28px] font-bold text-slate-900">2</span>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Wrench size={16} className="text-emerald-500" strokeWidth={2.5} />
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-1">Valid</span>
          </div>
          <span className="text-[28px] font-bold text-slate-900">4</span>
        </div>
      </div>

      {/* Top Alerts */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-500 mt-0.5 shrink-0" size={18} strokeWidth={2.5} />
            <div>
              <h3 className="text-[14px] font-bold text-red-600">Overdue Calibration</h3>
              <p className="text-[13px] font-medium text-red-500/90 mt-0.5">DFT Gauge #2 — Immediate action required.</p>
            </div>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2 rounded-full text-[12px] transition-colors shadow-sm">
            Schedule Now
          </button>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-start gap-3">
            <RefreshCw className="text-purple-500 mt-0.5 shrink-0" size={18} strokeWidth={2.5} />
            <div>
              <h3 className="text-[14px] font-bold text-purple-600">Random Calibration Check Required</h3>
              <p className="text-[13px] font-medium text-purple-500/90 mt-0.5">DFT Gauge #2, Holiday Detector flagged for spot check.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-xl inline-flex mb-6 overflow-x-auto no-scrollbar">
        {["all", "valid", "due_soon", "overdue"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all capitalize whitespace-nowrap ${
              activeTab === tab ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsData.filter(tool => {
          if (activeTab === "all") return true;
          if (activeTab === "valid") return tool.status === "Valid";
          if (activeTab === "due_soon") return tool.status === "Due Soon";
          if (activeTab === "overdue") return tool.status === "Overdue";
          return true;
        }).map((tool, index) => {
          let cardBorder = "border-slate-200";
          let iconBg = "bg-blue-50 text-blue-500";
          let statusPill = "bg-emerald-50 text-emerald-600";
          let dueColor = "text-slate-900";
          let outlineBtn = "border-slate-200 text-slate-700 hover:bg-slate-50";

          if (tool.status === "Overdue") {
            cardBorder = "border-red-200";
            iconBg = "bg-red-50 text-red-500";
            statusPill = "bg-red-50 text-red-600";
            dueColor = "text-red-500 font-bold";
            outlineBtn = "border-red-200 text-red-600 hover:bg-red-50";
          } else if (tool.status === "Due Soon") {
            cardBorder = "border-amber-200";
            iconBg = "bg-amber-50 text-amber-500";
            statusPill = "bg-amber-50 text-amber-600";
            dueColor = "text-amber-500 font-bold";
          }

          return (
            <div 
              key={index} 
              onClick={() => setSelectedTool(tool)}
              className={`bg-white rounded-2xl border ${cardBorder} p-6 shadow-sm flex flex-col cursor-pointer hover:shadow-md transition-shadow`}
            >
              
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                    <Wrench size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-0.5">{tool.id}</h3>
                    <p className="text-[11px] font-medium text-slate-400">{tool.code}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusPill}`}>
                  {tool.status}
                </span>
              </div>

              <div className="flex flex-col gap-2.5 mb-5 flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-medium text-slate-400">Location</span>
                  <span className="text-[12px] font-bold text-slate-900">{tool.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-medium text-slate-400">Last Calibrated</span>
                  <span className="text-[12px] font-bold text-slate-900">{tool.lastCalibrated}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-medium text-slate-400">Next Due</span>
                  <span className={`text-[12px] font-bold ${dueColor}`}>{tool.nextDue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-medium text-slate-400">Cert Expiry</span>
                  <span className="text-[12px] font-bold text-slate-900">{tool.certExpiry}</span>
                </div>
              </div>

              {tool.randomCheck && (
                <div className="bg-purple-50 rounded-lg p-2.5 flex items-center gap-2 mb-5">
                  <RefreshCw size={14} className="text-purple-500 shrink-0" strokeWidth={2.5} />
                  <span className="text-[11px] font-bold text-purple-600">Random check required</span>
                </div>
              )}

              <div className={`flex gap-3 ${!tool.randomCheck ? "mt-auto" : ""}`}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setLogTool(tool);
                  }}
                  className={`flex-1 border font-bold py-2.5 rounded-xl text-[12px] transition-colors shadow-sm ${outlineBtn}`}
                >
                  Log Calibration
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadTool(tool);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-[12px] transition-colors shadow-sm flex items-center justify-center"
                >
                  <Upload size={14} className="mr-1.5" strokeWidth={2.5} />
                  Upload Cert
                </button>
              </div>

            </div>
          )
        })}
      </div>

      <LogCalibrationModal 
        isOpen={!!logTool} 
        onClose={() => setLogTool(null)} 
        tool={logTool} 
      />

      <UploadCertificateModal 
        isOpen={!!uploadTool} 
        onClose={() => setUploadTool(null)} 
        tool={uploadTool} 
      />

      <AddCalibrationToolModal 
        isOpen={isAddToolOpen} 
        onClose={() => setIsAddToolOpen(false)} 
      />

      <CalibrationToolDetailsModal 
        isOpen={!!selectedTool} 
        onClose={() => setSelectedTool(null)} 
        tool={selectedTool}
        onLogCalibration={() => {
          setSelectedTool(null);
          setLogTool(selectedTool);
        }}
        onUploadCert={() => {
          setSelectedTool(null);
          setUploadTool(selectedTool);
        }}
      />

    </div>
  );
}
