import React from "react";
import { X } from "lucide-react";

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddRoleModal({ isOpen, onClose }: AddRoleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[460px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 pb-2">
          <h2 className="text-[18px] font-bold text-slate-900">Create New Role</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 hover:bg-slate-100 p-1.5 rounded-full"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 pt-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-slate-700">Role Name</label>
            <input 
              type="text" 
              placeholder="e.g. Field Supervisor"
              className="w-full h-[42px] px-3.5 border border-slate-200 rounded-xl text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-slate-700">Based On (Copy permissions from)</label>
            <select className="w-full h-[42px] px-3.5 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white">
              <option value=""></option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Supervisor">Supervisor</option>
              <option value="QC Inspector">QC Inspector</option>
              <option value="Accounting">Accounting</option>
              <option value="Inventory Manager">Inventory Manager</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-slate-700">Description</label>
            <textarea 
              placeholder="Describe what this role can do..."
              className="w-full h-[100px] p-3.5 border border-slate-200 rounded-xl text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-2 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-[11px] rounded-full text-[13px] font-bold transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-[11px] rounded-full text-[13px] font-bold transition-colors shadow-sm">
            Create Role
          </button>
        </div>
      </div>
    </div>
  );
}
