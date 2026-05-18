import React from "react";
import { X, AlertTriangle, ShoppingCart } from "lucide-react";

interface InventoryCreatePOModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}

export default function InventoryCreatePOModal({ isOpen, onClose, item }: InventoryCreatePOModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[550px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start bg-white z-10 sticky top-0 border-b border-slate-50">
          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold text-slate-900 leading-tight mb-0.5">Create Purchase Order</h2>
            <p className="text-[12px] text-slate-500 font-medium">For: {item.type}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5 overflow-y-auto max-h-[80vh] no-scrollbar">
          
          {/* Alert */}
          <div className="bg-red-50 rounded-xl p-4 border border-red-100 flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center text-[#dc2626] font-bold text-[13px]">
              <AlertTriangle size={14} className="mr-1.5" strokeWidth={2.5} />
              Low Stock Alert
            </div>
            <div className="text-[12px] font-medium text-red-600/90 pl-5">
              {item.type} — {item.remaining} lbs remaining (min: {item.min} lbs)
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-1">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Vendor</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Branch</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Cost Code</label>
              <input 
                type="text" 
                defaultValue="CC-HOU-INV"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Required By</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
          </div>

          <div className="w-full h-px bg-slate-100 my-1"></div>

          {/* Order Items */}
          <div className="flex flex-col px-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[14px] font-bold text-slate-900">Order Items</h3>
              <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center">
                <span className="mr-1 text-[14px] leading-none">+</span> Add Item
              </button>
            </div>

            <div className="grid grid-cols-[1fr_70px_80px_70px_20px] gap-3 mb-2 px-1">
              <span className="text-[11px] font-bold text-slate-500">Description</span>
              <span className="text-[11px] font-bold text-slate-500">Qty (lbs)</span>
              <span className="text-[11px] font-bold text-slate-500">Unit Price</span>
              <span className="text-[11px] font-bold text-slate-500 text-right pr-2">Total</span>
              <span></span>
            </div>

            <div className="grid grid-cols-[1fr_70px_80px_70px_20px] gap-3 items-center mb-4">
              <input 
                type="text" 
                defaultValue={item.type}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
              <input 
                type="text" 
                defaultValue="75"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors text-center shadow-sm"
              />
              <input 
                type="text" 
                defaultValue="12.50"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors text-center shadow-sm"
              />
              <span className="text-[13px] font-bold text-slate-900 text-right pr-2">$937.50</span>
              <button className="text-slate-300 hover:text-red-500 transition-colors flex justify-end">
                <X size={14} />
              </button>
            </div>

            <div className="flex justify-end pr-9">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-slate-900">Total:</span>
                <span className="text-[13px] font-bold text-slate-900">$937.50</span>
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
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center">
            <ShoppingCart size={16} className="mr-2" />
            Create PO
          </button>
        </div>

      </div>
    </div>
  );
}
