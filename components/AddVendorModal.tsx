import React from "react";
import { X } from "lucide-react";

interface AddVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddVendorModal({ isOpen, onClose }: AddVendorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[500px] flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 bg-white z-10 sticky top-0 flex justify-between items-center border-b border-slate-50">
          <h2 className="text-[20px] font-bold text-slate-900">Add Vendor</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
          
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Company Name</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Contact Person</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Phone</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Email</label>
            <input 
              type="email" 
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Address</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Website</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Category</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Payment Terms</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 flex gap-4 bg-white sticky bottom-0">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm">
            Add Vendor
          </button>
        </div>

      </div>
    </div>
  );
}
