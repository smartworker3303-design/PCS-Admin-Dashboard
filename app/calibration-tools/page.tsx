"use client";

import React, { useState } from "react";
import { AlertTriangle, RefreshCw, Wrench, Upload, FileText, CheckCircle2, ShieldAlert } from "lucide-react";
import LogCalibrationModal from "@/components/LogCalibrationModal";
import UploadCertificateModal from "@/components/UploadCertificateModal";
import AddCalibrationToolModal from "@/components/AddCalibrationToolModal";
import CalibrationToolDetailsModal from "@/components/CalibrationToolDetailsModal";

interface ToolItem {
  id: string;
  code: string;
  serialNumber: string;
  status: "Valid" | "Due Soon" | "Overdue" | "Expired Cert";
  location: string;
  lastCalibrated: string;
  nextDue: string;
  certExpiry: string;
  certPdfName?: string;
  randomCheck: boolean;
}

export default function CalibrationToolsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [logTool, setLogTool] = useState<any>(null);
  const [uploadTool, setUploadTool] = useState<any>(null);
  const [isAddToolOpen, setIsAddToolOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<any>(null);

  // Stateful calibration tools
  const [tools, setTools] = useState<ToolItem[]>([
    {
      id: "DFT Gauge #1",
      code: "DFT Gauge",
      serialNumber: "SN-DFT-98234",
      status: "Valid",
      location: "Houston",
      lastCalibrated: "Mar 15, 2026",
      nextDue: "Sep 15, 2026",
      certExpiry: "Dec 15, 2026",
      certPdfName: "DFT_Cert_Houston_2026.pdf",
      randomCheck: false,
    },
    {
      id: "DFT Gauge #2",
      code: "DFT Gauge",
      serialNumber: "SN-DFT-23948",
      status: "Overdue",
      location: "Dallas",
      lastCalibrated: "Jan 10, 2026",
      nextDue: "Apr 10, 2026",
      certExpiry: "Oct 10, 2026",
      certPdfName: "DFT_Cert_Dallas_2025_Expired.pdf",
      randomCheck: true,
    },
    {
      id: "Gloss Meter #1",
      code: "Gloss Meter",
      serialNumber: "SN-GM-11204",
      status: "Valid",
      location: "Houston",
      lastCalibrated: "Apr 01, 2026",
      nextDue: "Oct 01, 2026",
      certExpiry: "Apr 01, 2027",
      certPdfName: "Gloss_Cert_GM1_2026.pdf",
      randomCheck: false,
    },
    {
      id: "Adhesion Tester",
      code: "Adhesion Tester",
      serialNumber: "SN-AT-55429",
      status: "Due Soon",
      location: "Austin",
      lastCalibrated: "Feb 20, 2026",
      nextDue: "Jul 20, 2026",
      certExpiry: "Aug 20, 2026",
      certPdfName: "Adhesion_Tool_Cert_2026.pdf",
      randomCheck: false,
    },
    {
      id: "Holiday Detector",
      code: "Holiday Detector",
      serialNumber: "SN-HD-33012",
      status: "Expired Cert",
      location: "Houston",
      lastCalibrated: "Apr 10, 2025",
      nextDue: "Jul 10, 2026",
      certExpiry: "Apr 10, 2026",
      certPdfName: "",
      randomCheck: true,
    },
    {
      id: "Thermometer #1",
      code: "Thermometer",
      serialNumber: "SN-TH-88234",
      status: "Valid",
      location: "San Antonio",
      lastCalibrated: "Mar 01, 2026",
      nextDue: "Sep 01, 2026",
      certExpiry: "Mar 01, 2027",
      certPdfName: "Temp_Probe_1_Cert.pdf",
      randomCheck: false,
    },
  ]);

  const handleDownloadCert = (pdfName: string) => {
    alert(`Downloading Calibration Certificate File: "${pdfName}" from secure repository.`);
  };

  const getToolsCount = (statusType: string) => {
    if (statusType === "all") return tools.length;
    return tools.filter(t => t.status.toLowerCase().replace(" ", "_") === statusType).length;
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Wrench className="text-blue-600" />
            Equipment Calibration Registry
          </h1>
          <p className="text-[14px] text-slate-500 mt-0.5">Track gauge calibration schedules, serial identifiers, expired cert audits, and random spot checks</p>
        </div>
        <button 
          onClick={() => setIsAddToolOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center"
        >
          <span className="mr-1.5 text-lg leading-none">+</span> Add Instrument
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Wrench size={16} className="text-blue-500" strokeWidth={2.5} />
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-1">Total Instruments</span>
          </div>
          <span className="text-[28px] font-bold text-slate-900">{tools.length}</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle size={16} className="text-red-500" strokeWidth={2.5} />
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-1">Overdue / Expired</span>
          </div>
          <span className="text-[28px] font-bold text-red-500">
            {tools.filter(t => t.status === "Overdue" || t.status === "Expired Cert").length}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <RefreshCw size={16} className="text-purple-500" strokeWidth={2.5} />
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-1">Random Checks Due</span>
          </div>
          <span className="text-[28px] font-bold text-purple-600">
            {tools.filter(t => t.randomCheck).length}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-emerald-500" strokeWidth={2.5} />
            </div>
            <span className="text-[12px] font-medium text-slate-500 mt-1">Compliant (Valid)</span>
          </div>
          <span className="text-[28px] font-bold text-emerald-500">
            {tools.filter(t => t.status === "Valid").length}
          </span>
        </div>
      </div>

      {/* Expiry Warnings Banners */}
      <div className="flex flex-col gap-3 mb-6">
        {tools.filter(t => t.status === "Overdue" || t.status === "Expired Cert").map((tool) => (
          <div key={tool.id} className="bg-red-50 border border-red-100 rounded-2xl p-4 flex justify-between items-center shadow-xs">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-500 mt-0.5 shrink-0" size={18} strokeWidth={2.5} />
              <div>
                <h3 className="text-[14px] font-bold text-red-750">
                  {tool.status === "Expired Cert" ? "Certificate Expired Alert" : "Calibration Overdue Alert"}
                </h3>
                <p className="text-[13px] font-medium text-red-600/90 mt-0.5">
                  {tool.id} ({tool.serialNumber}) is currently flag status <strong>{tool.status}</strong>. Calibration audit must be performed immediately.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setLogTool(tool)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-full text-[12px] transition-colors shadow-sm cursor-pointer"
            >
              Re-Calibrate Now
            </button>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-xl inline-flex mb-6 overflow-x-auto no-scrollbar">
        {["all", "valid", "due_soon", "overdue", "expired_cert"].map((tab) => (
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
        {tools.filter(tool => {
          if (activeTab === "all") return true;
          if (activeTab === "valid") return tool.status === "Valid";
          if (activeTab === "due_soon") return tool.status === "Due Soon";
          if (activeTab === "overdue") return tool.status === "Overdue";
          if (activeTab === "expired_cert") return tool.status === "Expired Cert";
          return true;
        }).map((tool, index) => {
          let cardBorder = "border-slate-200";
          let iconBg = "bg-blue-50 text-blue-500";
          let statusPill = "bg-emerald-50 text-emerald-600";
          let dueColor = "text-slate-900";
          let outlineBtn = "border-slate-200 text-slate-700 hover:bg-slate-50";

          if (tool.status === "Overdue" || tool.status === "Expired Cert") {
            cardBorder = "border-red-200 hover:border-red-300";
            iconBg = "bg-red-50 text-red-500";
            statusPill = "bg-red-50 text-red-650";
            dueColor = "text-red-500 font-bold animate-pulse";
            outlineBtn = "border-red-200 text-red-600 hover:bg-red-50";
          } else if (tool.status === "Due Soon") {
            cardBorder = "border-amber-200 hover:border-amber-300";
            iconBg = "bg-amber-50 text-amber-500";
            statusPill = "bg-amber-50 text-amber-600";
            dueColor = "text-amber-500 font-bold";
          }

          return (
            <div 
              key={index} 
              onClick={() => setSelectedTool(tool)}
              className={`bg-white rounded-2xl border ${cardBorder} p-6 shadow-sm flex flex-col cursor-pointer hover:shadow-md transition-all`}
            >
              
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                    <Wrench size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-0.5">{tool.id}</h3>
                    <p className="text-[11px] font-mono font-bold text-slate-400">{tool.serialNumber}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusPill}`}>
                  {tool.status}
                </span>
              </div>

              <div className="flex flex-col gap-2.5 mb-5 flex-1">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-400 font-medium">Model / Class</span>
                  <span className="font-bold text-slate-800">{tool.code}</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-400 font-medium">Active Branch</span>
                  <span className="font-bold text-slate-800">{tool.location}</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-400 font-medium">Last Calibrated</span>
                  <span className="font-bold text-slate-800">{tool.lastCalibrated}</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-400 font-medium">Schedule Next Due</span>
                  <span className={`font-bold ${dueColor}`}>{tool.nextDue}</span>
                </div>
                
                {/* PDF Certificate Field */}
                <div className="flex justify-between items-center border-t border-slate-100 pt-2.5 text-[12px]">
                  <span className="text-slate-400 font-medium">Yearly PDF Cert</span>
                  {tool.certPdfName ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadCert(tool.certPdfName!);
                      }}
                      className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <FileText size={13} />
                      View Certificate
                    </button>
                  ) : (
                    <span className="text-red-500 font-bold text-[11px] flex items-center gap-1">
                      <ShieldAlert size={12} /> Missing Cert PDF
                    </span>
                  )}
                </div>
              </div>

              {tool.randomCheck && (
                <div className="bg-purple-50 rounded-lg p-2.5 flex items-center gap-2 mb-5">
                  <RefreshCw size={14} className="text-purple-500 shrink-0 animate-spin" strokeWidth={2.5} />
                  <span className="text-[11px] font-bold text-purple-600">Spot inspection check flagged</span>
                </div>
              )}

              <div className={`flex gap-3 ${!tool.randomCheck ? "mt-auto" : ""}`}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setLogTool(tool);
                  }}
                  className={`flex-1 border font-bold py-2.5 rounded-xl text-[12px] transition-colors shadow-sm ${outlineBtn} cursor-pointer`}
                >
                  Log Calibrate
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadTool(tool);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-[12px] transition-colors shadow-sm flex items-center justify-center cursor-pointer"
                >
                  <Upload size={14} className="mr-1.5" strokeWidth={2.5} />
                  Upload PDF
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
