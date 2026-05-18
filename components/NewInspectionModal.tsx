import React, { useState } from "react";
import { X } from "lucide-react";

interface NewInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewInspectionModal({ isOpen, onClose }: NewInspectionModalProps) {
  const [result, setResult] = useState<string>("Passed");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[550px] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-7 py-5 flex items-center justify-between bg-white z-10 sticky top-0">
          <h2 className="text-[18px] font-bold text-slate-900">New QC Inspection</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 pb-2 overflow-y-auto no-scrollbar flex flex-col gap-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Part ID</label>
              <input 
                type="text" 
                placeholder="P-XXXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Ticket ID</label>
              <input 
                type="text" 
                placeholder="TK-XXXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Inspector</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Thickness (mil)</label>
              <input 
                type="text" 
                placeholder="e.g. 3.2"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Gloss Level</label>
              <input 
                type="text" 
                placeholder="e.g. 78"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Oven Temp (°F)</label>
              <input 
                type="text" 
                placeholder="e.g. 380"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-2">Inspection Result</label>
            <div className="flex gap-3">
              <button 
                onClick={() => setResult("Passed")}
                className={`flex-1 py-2.5 rounded-xl border text-[12px] font-bold transition-colors ${
                  result === "Passed" 
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600" 
                    : "border-emerald-200 text-emerald-500 hover:bg-emerald-50/50"
                }`}
              >
                Passed
              </button>
              <button 
                onClick={() => setResult("Failed")}
                className={`flex-1 py-2.5 rounded-xl border text-[12px] font-bold transition-colors ${
                  result === "Failed" 
                    ? "border-red-500 bg-red-50 text-red-600" 
                    : "border-red-200 text-red-500 hover:bg-red-50/50"
                }`}
              >
                Failed
              </button>
              <button 
                onClick={() => setResult("Rework")}
                className={`flex-1 py-2.5 rounded-xl border text-[12px] font-bold transition-colors ${
                  result === "Rework" 
                    ? "border-amber-500 bg-amber-50 text-amber-600" 
                    : "border-amber-200 text-amber-500 hover:bg-amber-50/50"
                }`}
              >
                Rework
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Inspector Notes</label>
            <textarea 
              placeholder="Add inspection notes..."
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300 resize-none"
            ></textarea>
          </div>

        </div>

        {/* Footer */}
        <div className="px-7 py-6 flex gap-3 mt-1">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
            Save Inspection
          </button>
        </div>

      </div>
    </div>
  );
}
