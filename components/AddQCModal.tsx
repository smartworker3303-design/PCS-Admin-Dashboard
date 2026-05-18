import React from "react";
import { X, Plus } from "lucide-react";

interface AddQCModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddQCModal({ isOpen, onClose }: AddQCModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[480px] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-7 py-5 flex items-center justify-between bg-white z-10 sticky top-0">
          <h2 className="text-[18px] font-bold text-slate-900">Add QC Equipment</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 pb-2 overflow-y-auto no-scrollbar flex flex-col gap-4">
          
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Equipment Name</label>
            <input 
              type="text" 
              placeholder="e.g. DFT Gauge #3"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Serial Number</label>
            <input 
              type="text" 
              placeholder="e.g. DFT-003-2026"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Equipment Type</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Branch / Location</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Initial Calibration Date</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Notes</label>
            <textarea 
              placeholder="Optional notes..."
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300 resize-none"
            ></textarea>
          </div>

        </div>

        {/* Footer */}
        <div className="px-7 py-6 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
            <Plus size={16} className="mr-1.5" />
            Add Equipment
          </button>
        </div>

      </div>
    </div>
  );
}
