import React from "react";
import { X } from "lucide-react";

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewTicketModal({ isOpen, onClose }: NewTicketModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-[500px] flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">New Ticket</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto no-scrollbar flex-1 space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Customer</label>
            <input 
              type="text" 
              placeholder="Select customer..." 
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">PO Number</label>
            <input 
              type="text" 
              placeholder="e.g. PO-2026-001" 
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Cost Code</label>
            <input 
              type="text" 
              placeholder="e.g. CC-HOU-042" 
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Paint Type</label>
            <input 
              type="text" 
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Branch</label>
            <input 
              type="text" 
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
            <textarea 
              rows={3}
              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-100 flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors">
            Create Ticket
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
