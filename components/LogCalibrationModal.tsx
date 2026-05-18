import React, { useState } from "react";
import { X, Upload, ClipboardCheck } from "lucide-react";

interface LogCalibrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: any;
}

export default function LogCalibrationModal({ isOpen, onClose, tool }: LogCalibrationModalProps) {
  const [result, setResult] = useState("pass");

  if (!isOpen || !tool) return null;

  const isOverdue = tool.status === "Overdue";
  const bannerBg = isOverdue ? "bg-red-50 border-red-100" : (tool.status === "Due Soon" ? "bg-amber-50 border-amber-100" : "bg-[#f0fdf4] border-[#dcfce7]");
  const bannerText = isOverdue ? "text-red-700" : (tool.status === "Due Soon" ? "text-amber-700" : "text-[#047857]");

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[500px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start bg-white z-10 sticky top-0 border-b border-slate-50">
          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold text-slate-900 leading-tight mb-0.5">Log Calibration</h2>
            <p className="text-[12px] text-slate-500 font-medium">{tool.id} &middot; {tool.code.split("·")[1]?.trim() || tool.code}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5 overflow-y-auto max-h-[80vh] no-scrollbar">
          
          {/* Status Banner */}
          <div className={`${bannerBg} border rounded-xl p-3.5 flex items-center shadow-sm`}>
            <span className={`text-[12px] font-bold ${bannerText}`}>
              Current: {tool.status} - Last: {tool.lastCalibrated} - Due: {tool.nextDue}
            </span>
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-1">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Calibration Date</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
            
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Calibrated By</label>
              <input 
                type="text" 
                placeholder="Calibration company"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Certificate Number</label>
              <input 
                type="text" 
                placeholder="CAL-2026-XXXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Next Due Date</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
          </div>

          <div className="px-1 mt-1">
            <label className="block text-[12px] font-semibold text-slate-700 mb-2">Calibration Result</label>
            <div className="flex gap-3">
              <button 
                onClick={() => setResult("pass")}
                className={`flex-1 py-3 rounded-xl text-[13px] font-bold border transition-colors shadow-sm ${
                  result === "pass" 
                    ? "border-emerald-400 text-emerald-600 bg-emerald-50/30" 
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                Pass
              </button>
              <button 
                onClick={() => setResult("fail")}
                className={`flex-1 py-3 rounded-xl text-[13px] font-bold border transition-colors shadow-sm ${
                  result === "fail" 
                    ? "border-red-400 text-red-600 bg-red-50/30" 
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                Fail — Replace
              </button>
            </div>
          </div>

          <div className="px-1 mt-1">
            <label className="block text-[12px] font-semibold text-slate-700 mb-2">Upload Certificate (PDF/Image)</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-white hover:bg-slate-50 transition-colors cursor-pointer">
              <Upload size={20} className="text-slate-400 mb-2" strokeWidth={2} />
              <p className="text-[12px] font-medium text-slate-500">
                Drop file or <span className="text-blue-600 font-bold">browse</span>
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-100 flex gap-4 bg-white sticky bottom-0 z-10">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center">
            <ClipboardCheck size={16} className="mr-2" strokeWidth={2.5} />
            Log Calibration
          </button>
        </div>

      </div>
    </div>
  );
}
