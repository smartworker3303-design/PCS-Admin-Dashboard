import React, { useState } from "react";
import { X, FileText } from "lucide-react";

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateInvoiceModal({ isOpen, onClose }: CreateInvoiceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[700px] flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 bg-white z-10 sticky top-0 flex justify-between items-center border-b border-slate-50">
          <h2 className="text-[20px] font-bold text-slate-900">Create Invoice</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 overflow-y-auto no-scrollbar flex flex-col gap-5">
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Ticket ID</label>
              <input 
                type="text" 
                placeholder="TK-XXXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Customer</label>
              <input 
                type="text" 
                placeholder="Select customer"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">PO Number</label>
              <input 
                type="text" 
                placeholder="PO-2026-XXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Pipe Size</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Coating Type</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Footage (ft)</label>
              <input 
                type="text" 
                placeholder="0"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Flanges (ea)</label>
              <input 
                type="text" 
                placeholder="0"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Fittings (ea)</label>
              <input 
                type="text" 
                placeholder="0"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Discount ($)</label>
              <input 
                type="text" 
                placeholder="0"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex justify-between items-center border border-slate-100 rounded-xl p-4 shadow-sm">
              <span className="text-[13px] font-bold text-slate-700">Rush Order (1.5x surcharge)</span>
              <div className="w-10 h-5 bg-slate-200 rounded-full flex items-center px-1 cursor-pointer">
                <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>

            <div className="flex justify-between items-center bg-[#f4f8ff] border border-[#e0ebfd] rounded-xl p-4 shadow-sm">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-blue-600 mb-0.5">PO Billable Markup</span>
                <span className="text-[12px] font-medium text-blue-500">Applies vendor PO cost with markup to invoice</span>
              </div>
              <div className="w-10 h-5 bg-slate-200 rounded-full flex items-center px-1 cursor-pointer">
                <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>

          <div className="mt-4 pb-2">
            <div className="flex items-center gap-1.5 mb-3">
              <FileText size={14} className="text-slate-400" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Live Invoice Preview</span>
            </div>
            
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[13px] text-slate-500">Subtotal</span>
              <span className="text-[13px] font-bold text-slate-900">$0.00</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[13px] text-slate-500">Tax (8.25%)</span>
              <span className="text-[13px] font-bold text-slate-900">$0.00</span>
            </div>
            
            <div className="border-t border-slate-100 mb-4"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-[15px] font-bold text-slate-900">Total</span>
              <span className="text-[18px] font-bold text-blue-600">$0.00</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 flex gap-4 bg-white sticky bottom-0">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-full text-[13px] transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full text-[13px] transition-colors shadow-sm">
            Create Invoice
          </button>
        </div>

      </div>
    </div>
  );
}
