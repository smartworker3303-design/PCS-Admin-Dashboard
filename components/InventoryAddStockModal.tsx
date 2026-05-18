import React from "react";
import { X, PackagePlus } from "lucide-react";

interface InventoryAddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}

export default function InventoryAddStockModal({ isOpen, onClose, item }: InventoryAddStockModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[480px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start bg-white z-10 sticky top-0 border-b border-slate-50">
          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold text-slate-900 leading-tight mb-0.5">Add Stock</h2>
            <p className="text-[12px] text-slate-500 font-medium">{item.type}</p>
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
          
          {/* Banner */}
          <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4 border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-full shadow-sm shrink-0 flex items-center justify-center bg-white`}>
              <div className={`w-5 h-5 rounded-full ${item.color}`}></div>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-slate-900">{item.type}</span>
              <span className="text-[12px] font-medium text-slate-500">
                Current: {item.remaining} lbs &middot; Min: {item.min} lbs
              </span>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100 my-1"></div>

          {/* Form */}
          <div className="flex flex-col gap-4 px-1">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Quantity to Add (lbs)</label>
              <input 
                type="text" 
                defaultValue="67"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>
            
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">PO Reference</label>
              <input 
                type="text" 
                placeholder="PO-2026-XXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Received By</label>
              <input 
                type="text" 
                placeholder="Employee name"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Received Date</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Notes</label>
              <textarea 
                placeholder="Optional notes..."
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 resize-none shadow-sm"
              ></textarea>
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
          <button className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center">
            <PackagePlus size={16} className="mr-2" strokeWidth={2.5} />
            Add to Inventory
          </button>
        </div>

      </div>
    </div>
  );
}
