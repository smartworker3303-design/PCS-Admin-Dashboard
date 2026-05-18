import React from "react";
import { X, FileText } from "lucide-react";

interface CreatePOModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePOModal({ isOpen, onClose }: CreatePOModalProps) {
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
          <h2 className="text-[20px] font-bold text-slate-900">Create Purchase Order</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 overflow-y-auto no-scrollbar flex flex-col gap-6">
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Vendor</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Branch</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Client</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Cost Code</label>
              <input 
                type="text" 
                placeholder="CC-HOU-XXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Related Job</label>
              <input 
                type="text" 
                placeholder="TK-XXXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Delivery Date</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-[#f4f8ff] border border-[#e0ebfd] rounded-xl p-4 shadow-sm">
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-blue-600 mb-0.5">Billable to Customer</span>
              <span className="text-[12px] font-medium text-blue-500">If ON, this PO cost + markup will flow into the linked invoice</span>
            </div>
            <div className="w-10 h-5 bg-slate-200 rounded-full flex items-center px-1 cursor-pointer">
              <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[15px] font-bold text-slate-900">Items</h3>
              <button className="text-[13px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
                + Add Item
              </button>
            </div>
            
            <div className="grid grid-cols-[1fr_60px_80px_60px_20px] gap-3 mb-2 px-1">
              <span className="text-[11px] font-medium text-slate-500">Description</span>
              <span className="text-[11px] font-medium text-slate-500">Qty</span>
              <span className="text-[11px] font-medium text-slate-500">Unit Price</span>
              <span className="text-[11px] font-medium text-slate-500">Total</span>
              <span></span>
            </div>
            
            <div className="grid grid-cols-[1fr_60px_80px_60px_20px] gap-3 items-center mb-4">
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
              />
              <input 
                type="text" 
                defaultValue="1"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors text-center"
              />
              <input 
                type="text" 
                placeholder="0.00"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors text-center"
              />
              <span className="text-[13px] font-bold text-slate-900">$0.00</span>
              <button className="text-slate-300 hover:text-red-500 transition-colors flex justify-end">
                <X size={14} />
              </button>
            </div>
            
            <div className="flex justify-end pr-8 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-bold text-slate-900">Total:</span>
                <span className="text-[14px] font-bold text-slate-900">$0.00</span>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <label className="block text-[12px] font-medium text-slate-700 mb-2">Upload Vendor Invoice</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
              <FileText size={24} className="text-slate-400 mb-2" strokeWidth={1.5} />
              <p className="text-[13px] text-slate-500">
                Drop vendor invoice here or <span className="text-blue-600 font-medium">browse files</span>
              </p>
            </div>
          </div>

          <div className="pb-2">
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Notes</label>
            <textarea 
              placeholder="Additional instructions or notes..."
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 resize-none"
            ></textarea>
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
            Create PO
          </button>
        </div>

      </div>
    </div>
  );
}
