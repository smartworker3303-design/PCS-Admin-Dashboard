import React, { useState } from "react";
import { X, Wrench, RefreshCw, Upload, FileText, Eye, Download } from "lucide-react";

interface CalibrationToolDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: any;
  onLogCalibration?: () => void;
  onUploadCert?: () => void;
}

export default function CalibrationToolDetailsModal({ isOpen, onClose, tool, onLogCalibration, onUploadCert }: CalibrationToolDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("Details");

  if (!isOpen || !tool) return null;

  const isOverdue = tool.status === "Overdue";
  const statusPill = isOverdue ? "bg-red-50 text-red-600" : (tool.status === "Due Soon" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600");
  const iconBg = isOverdue ? "bg-red-50 text-red-500" : (tool.status === "Due Soon" ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500");

  // A small helper to extract just the tool type name
  const toolTypeName = tool.id.replace(/#\d+/, "").trim();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[550px] overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-6 flex justify-between items-start bg-white z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
              <Wrench size={22} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[20px] font-bold text-slate-900 leading-tight mb-1">{tool.id}</h2>
              <div className="flex items-center gap-2">
                <p className="text-[13px] text-slate-500 font-medium">{tool.code.split("·")[1]?.trim() || tool.code}</p>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${statusPill}`}>
                  {tool.status}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pb-2 shrink-0">
          <div className="bg-slate-50 p-1 rounded-xl flex">
            {["Details", "Certificate", "History"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${
                  activeTab === tab ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4 flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4">
          {activeTab === "Details" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Tool Type</span>
                  <span className="block text-[13px] font-bold text-slate-900">{toolTypeName}</span>
                </div>
                <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Serial Number</span>
                  <span className="block text-[13px] font-bold text-slate-900">{tool.code.split("·")[1]?.trim() || tool.code}</span>
                </div>
                
                <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Location</span>
                  <span className="block text-[13px] font-bold text-slate-900">{tool.location}</span>
                </div>
                <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Last Calibrated</span>
                  <span className="block text-[13px] font-bold text-slate-900">{tool.lastCalibrated}</span>
                </div>

                <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Next Due Date</span>
                  <span className={`block text-[13px] font-bold ${isOverdue ? 'text-red-500' : 'text-slate-900'}`}>{tool.nextDue}</span>
                </div>
                <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Cert. Expiry</span>
                  <span className="block text-[13px] font-bold text-slate-900">{tool.certExpiry}</span>
                </div>
              </div>

              {isOverdue && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5">
                  <h4 className="text-[11px] font-bold text-blue-600 mb-0.5">Notes</h4>
                  <p className="text-[13px] font-medium text-blue-700">Overdue — contact AccuCal</p>
                </div>
              )}

              {tool.randomCheck && (
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-3.5 flex items-center gap-2.5">
                  <RefreshCw size={16} className="text-purple-500 shrink-0" strokeWidth={2.5} />
                  <span className="text-[12px] font-bold text-purple-600">Random calibration spot check required</span>
                </div>
              )}
            </>
          )}

          {activeTab === "Certificate" && (
            <div className="flex flex-col gap-4 pb-2">
              <h3 className="text-[15px] font-bold text-slate-900">Calibration Certificate</h3>
              
              <div className="border border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                <Upload size={24} className="text-slate-400 mb-3" strokeWidth={1.5} />
                <h4 className="text-[14px] font-bold text-slate-900 mb-1">No certificate uploaded</h4>
                <p className="text-[12px] text-slate-500 mb-5">Upload PDF or image of calibration certificate</p>
                <button 
                  onClick={() => {
                    onClose();
                    onUploadCert?.();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-full text-[13px] transition-colors shadow-sm"
                >
                  Upload Certificate
                </button>
              </div>
            </div>
          )}

          {activeTab === "History" && (
            <div className="flex flex-col gap-4 pb-2">
              <h3 className="text-[15px] font-bold text-slate-900">Calibration History</h3>
              
              <div className="relative pl-3">
                <div className="absolute left-[11px] top-4 bottom-0 w-px bg-slate-100"></div>
                
                <div className="flex gap-4 relative">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 border-4 border-white flex items-center justify-center shrink-0 z-10 -ml-[11px] mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  </div>
                  
                  <div className="flex-1 bg-[#f0fdf4] border border-emerald-100 rounded-xl p-3.5 flex justify-between items-start shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-emerald-800 mb-0.5">Calibration Logged</span>
                      <span className="text-[12px] text-emerald-600">By: AccuCal Services &middot; Cert: CAL-2026-0110</span>
                      <span className="text-[11px] text-emerald-500 mb-3">{tool.lastCalibrated}</span>
                      
                      <div className="flex items-center text-emerald-700 hover:text-emerald-800 cursor-pointer w-fit">
                        <FileText size={14} className="mr-1.5" strokeWidth={2.5} />
                        <span className="text-[12px] font-bold">CAL-{tool.code.split("·")[1]?.trim() || tool.code}.pdf</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="text-emerald-500 hover:text-emerald-700 transition-colors">
                        <Eye size={14} strokeWidth={2.5} />
                      </button>
                      <button className="text-emerald-500 hover:text-emerald-700 transition-colors">
                        <Download size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
