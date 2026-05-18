import React from "react";
import { X } from "lucide-react";

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBranchModal({ isOpen, onClose }: AddBranchModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] transition-opacity"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[460px] bg-white rounded-2xl shadow-2xl z-[210] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-[18px] font-bold text-slate-900">Add New Branch</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Branch Name</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Address</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">City</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">State</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Phone</label>
            <input 
              type="tel" 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Branch Manager</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-[13px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
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
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-[13px] transition-colors shadow-sm">
              Add Branch
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}
