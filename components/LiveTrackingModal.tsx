import React from "react";
import { X, Save } from "lucide-react";

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: any;
}

export default function LiveTrackingModal({ isOpen, onClose, record }: LiveTrackingModalProps) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-[500px] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between bg-white z-10 sticky top-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-[20px] font-bold text-blue-600">{record.id}</h2>
              <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-[6px] text-[11px] font-bold">
                {record.column}
              </span>
            </div>
            <p className="text-[13px] font-medium text-slate-400">
              Ticket: {record.ticket}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 overflow-y-auto no-scrollbar flex flex-col gap-5">
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
              <p className="text-[11px] font-medium text-slate-400 mb-0.5">Customer</p>
              <p className="text-[13px] font-bold text-slate-900">{record.customer}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
              <p className="text-[11px] font-medium text-slate-400 mb-0.5">Current Step</p>
              <p className="text-[13px] font-bold text-slate-900">{record.status}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
              <p className="text-[11px] font-medium text-slate-400 mb-0.5">Assigned To</p>
              <p className="text-[13px] font-bold text-slate-900">{record.worker}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
              <p className="text-[11px] font-medium text-slate-400 mb-0.5">Branch</p>
              <p className="text-[13px] font-bold text-slate-900">{record.branch || "Dallas"}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
              <p className="text-[11px] font-medium text-slate-400 mb-0.5">Time</p>
              <p className="text-[13px] font-bold text-slate-900">{record.time}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100/50">
              <p className="text-[11px] font-medium text-slate-400 mb-0.5">Priority</p>
              <p className="text-[13px] font-bold text-slate-900">{record.priority || "Normal"}</p>
            </div>
          </div>

          <div>
            <h3 className="text-[13px] font-bold text-slate-700 mb-3">Update Status</h3>
            <div className="flex flex-wrap gap-2.5">
              <button className="px-4 py-2 rounded-full border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                Move to Waiting
              </button>
              <button className="px-4 py-2 rounded-full border border-blue-500 text-[11px] font-bold text-blue-600 hover:bg-blue-50 transition-colors">
                Mark In Progress
              </button>
              <button className="px-4 py-2 rounded-full border border-emerald-500 text-[11px] font-bold text-emerald-600 hover:bg-emerald-50 transition-colors">
                Mark Complete
              </button>
              <button className="px-4 py-2 rounded-full border border-red-500 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors">
                Flag as Delayed
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-[13px] font-bold text-slate-700 mb-2">Add Note</h3>
            <textarea 
              placeholder="Add a process note..." 
              rows={3}
              className="w-full border border-slate-200 rounded-xl p-3.5 text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
            ></textarea>
          </div>

          <div className="flex gap-3 mt-1">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
              <Save size={16} className="mr-2" />
              Save Update
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
