import React, { useState } from "react";
import { X, Printer } from "lucide-react";

interface ViewDashboardInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
  onExport?: (invoice: any) => void;
}

export default function ViewDashboardInvoiceModal({ isOpen, onClose, invoice, onExport }: ViewDashboardInvoiceModalProps) {
  const [activeTab, setActiveTab] = useState("summary");

  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[500px] flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 bg-white z-10 sticky top-0 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold text-slate-900 leading-none">{invoice.id}</h2>
            <div className="flex items-center gap-2.5">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                invoice.status === "Paid" ? "bg-[#d1fae5] text-emerald-600" :
                invoice.status === "Pending" ? "bg-[#fef9c3] text-amber-600" :
                "bg-[#fee2e2] text-red-600"
              }`}>
                {invoice.status}
              </span>
              <span className="text-[13px] font-medium text-slate-500">{invoice.customer}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pb-6 overflow-y-auto no-scrollbar flex flex-col">
          
          {/* Tabs */}
          <div className="bg-slate-50 p-1 rounded-xl flex items-center mb-6">
            <button 
              onClick={() => setActiveTab("summary")}
              className={`flex-1 py-2 text-[12px] font-bold rounded-lg transition-all ${activeTab === "summary" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Summary
            </button>
            <button 
              onClick={() => setActiveTab("line_items")}
              className={`flex-1 py-2 text-[12px] font-bold rounded-lg transition-all ${activeTab === "line_items" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Line Items
            </button>
            <button 
              onClick={() => setActiveTab("payment")}
              className={`flex-1 py-2 text-[12px] font-bold rounded-lg transition-all ${activeTab === "payment" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Payment
            </button>
          </div>

          {activeTab === "summary" && (
            <div className="animate-in fade-in duration-300">
              
              {/* Blue Header Block */}
              <div className="bg-blue-600 rounded-xl p-5 text-white flex justify-between items-center mb-4 shadow-sm">
                <div>
                  <div className="text-[11px] font-medium text-blue-200 mb-0.5 uppercase tracking-wider">Invoice</div>
                  <div className="text-[18px] font-bold leading-tight">{invoice.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-medium text-blue-200 mb-0.5 uppercase tracking-wider">Total Due</div>
                  <div className="text-[18px] font-bold leading-tight">{invoice.amount}</div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Customer</span>
                  <span className="block text-[13px] font-bold text-slate-900">{invoice.customer}</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Related Ticket</span>
                  <span className="block text-[13px] font-bold text-slate-900">{invoice.ticket}</span>
                </div>

                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Branch</span>
                  <span className="block text-[13px] font-bold text-slate-900">Houston</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Paint Type</span>
                  <span className="block text-[13px] font-bold text-slate-900">Epoxy</span>
                </div>

                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Parts Count</span>
                  <span className="block text-[13px] font-bold text-slate-900">24 parts</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Invoice Date</span>
                  <span className="block text-[13px] font-bold text-slate-900">{invoice.date}</span>
                </div>

                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Due Date</span>
                  <span className="block text-[13px] font-bold text-slate-900">{invoice.due}</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Payment Terms</span>
                  <span className="block text-[13px] font-bold text-slate-900">Net 30</span>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "summary" && (
             <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-300">
               <p className="text-[14px] text-slate-500">Content for {activeTab.replace("_", " ")} is currently under development.</p>
             </div>
          )}

        </div>

        {/* Footer */}
        {activeTab === "summary" && (
          <div className="px-8 py-6 flex gap-4 bg-white sticky bottom-0">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center">
              <Printer size={16} className="mr-2" />
              Print Invoice
            </button>
            <button 
              onClick={() => onExport?.(invoice)}
              className="flex-1 bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-600 font-bold py-3 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center"
            >
              QB Export
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
