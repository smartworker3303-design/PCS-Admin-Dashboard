import React, { useState } from "react";
import { X, Download } from "lucide-react";

interface QuickBooksExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
}

export default function QuickBooksExportModal({ isOpen, onClose, invoice }: QuickBooksExportModalProps) {
  const [exportFormat, setExportFormat] = useState("IIF");

  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[450px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start bg-white z-10 sticky top-0 border-b border-slate-50">
          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold text-slate-900 leading-tight mb-0.5">QuickBooks Export</h2>
            <p className="text-[12px] text-slate-400 font-medium">{invoice.id} - {invoice.customer}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5 overflow-y-auto max-h-[80vh]">
          
          {/* Top Banner */}
          <div className="bg-[#f0fdf4] rounded-2xl p-4 border border-[#dcfce7] flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#10b981] flex items-center justify-center text-white font-bold text-[14px] shrink-0">
              QB
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#047857]">QuickBooks Online Export</div>
              <div className="text-[12px] font-medium text-[#059669]/80 leading-tight mt-0.5">Export invoice data in IIF or CSV format</div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2.5 px-1">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-slate-500 font-medium">Invoice</span>
              <span className="text-[13px] font-bold text-slate-900">{invoice.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-slate-500 font-medium">Customer</span>
              <span className="text-[13px] font-bold text-slate-900">{invoice.customer}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-slate-500 font-medium">Amount</span>
              <span className="text-[13px] font-bold text-blue-600">{invoice.amount || invoice.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-slate-500 font-medium">Status</span>
              <span className="text-[13px] font-bold text-[#10b981]">{invoice.status || "Paid"}</span>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100 my-1"></div>

          {/* Format */}
          <div className="flex flex-col gap-2.5 px-1">
            <label className="text-[12px] font-bold text-slate-700">Export Format</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setExportFormat("IIF")}
                className={`flex-1 py-2 rounded-full text-[12px] font-bold border transition-colors shadow-sm ${
                  exportFormat === "IIF" 
                    ? "border-blue-600 text-white bg-blue-600" 
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                IIF (QuickBooks)
              </button>
              <button 
                onClick={() => setExportFormat("CSV")}
                className={`flex-1 py-2 rounded-full text-[12px] font-bold border transition-colors shadow-sm ${
                  exportFormat === "CSV" 
                    ? "border-blue-600 text-white bg-blue-600" 
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                CSV
              </button>
              <button 
                onClick={() => setExportFormat("JSON")}
                className={`flex-1 py-2 rounded-full text-[12px] font-bold border transition-colors shadow-sm ${
                  exportFormat === "JSON" 
                    ? "border-blue-600 text-white bg-blue-600" 
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                JSON
              </button>
            </div>
          </div>

          {/* Account Mapping */}
          <div className="flex flex-col gap-2.5 px-1">
            <label className="text-[12px] font-bold text-slate-700">QB Account Mapping</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-100 flex gap-4 bg-white sticky bottom-0">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center">
            <Download size={16} className="mr-2" strokeWidth={2.5} />
            Export to QB
          </button>
        </div>

      </div>
    </div>
  );
}
