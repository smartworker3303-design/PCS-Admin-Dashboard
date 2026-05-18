import React from "react";
import { X } from "lucide-react";

interface AddCalibrationToolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCalibrationToolModal({ isOpen, onClose }: AddCalibrationToolModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[480px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-center bg-white z-10 sticky top-0 border-b border-slate-50">
          <h2 className="text-[20px] font-bold text-slate-900">Add Calibration Tool</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-4 overflow-y-auto max-h-[80vh] no-scrollbar">
          
          <div className="flex flex-col gap-4 px-1">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Tool Name</label>
              <input 
                type="text" 
                placeholder="e.g. DFT Gauge #3"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 shadow-sm"
              />
            </div>
            
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Serial Number</label>
              <input 
                type="text" 
                placeholder="e.g. DFT-003-2026"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Tool Type</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Location / Branch</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Initial Calibration Date</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Cert. Expiry</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                />
              </div>
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
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm">
            Add Tool
          </button>
        </div>

      </div>
    </div>
  );
}
