import React from "react";
import { X, Save } from "lucide-react";

interface TimeEntry {
  name: string;
  date: string;
  clockIn: string;
  clockOut: string;
}

interface AdjustTimeEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: TimeEntry | null;
}

export default function AdjustTimeEntryModal({ isOpen, onClose, entry }: AdjustTimeEntryModalProps) {
  if (!isOpen || !entry) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] transition-opacity"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[460px] bg-white rounded-2xl shadow-2xl z-[210] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-bold text-slate-900 leading-none">Adjust Time Entry</h2>
            <span className="text-[13px] text-slate-500 font-medium">{entry.name} - {entry.date}</span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 flex flex-col gap-4">
          
          {/* Warning Banner */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-[12px] font-medium text-orange-600 leading-relaxed shadow-sm">
            Time adjustments are logged to the audit trail and require a reason.
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-700">Original Clock In: <span className="font-medium">{entry.clockIn}</span></label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-slate-700">Original Clock Out: <span className="font-medium">{entry.clockOut}</span></label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold text-slate-700">Reason for Adjustment <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold text-slate-700">Supervisor Note</label>
            <textarea 
              placeholder="Additional context for this adjustment..."
              className="w-full bg-white border border-slate-200 rounded-lg p-3 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm resize-none h-[80px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-3">
            <button 
              onClick={onClose}
              className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl text-[13px] transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button className="flex-1 bg-[#84aef5] hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center gap-2">
              <Save size={16} strokeWidth={2.5} /> Save Adjustment
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}
