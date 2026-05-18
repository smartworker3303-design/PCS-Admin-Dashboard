import React, { useState } from "react";
import { X, Edit2, Printer, FileText, CheckCircle2, Download } from "lucide-react";

interface InvoiceRecord {
  id: string;
  ticket: string;
  customer: string;
  po: string;
  coating: string;
  amount: string;
  tax: string;
  total: string;
  status: string;
  due: string;
}

interface ViewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceRecord | null;
}

export default function ViewInvoiceModal({ isOpen, onClose, invoice }: ViewInvoiceModalProps) {
  const [activeTab, setActiveTab] = useState("summary");

  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[650px] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 bg-white z-10 sticky top-0 flex justify-between items-start">
          <div>
            <h2 className="text-[22px] font-bold text-slate-900 mb-2">{invoice.id}</h2>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                invoice.status === "Paid" ? "bg-emerald-100/80 text-emerald-600" :
                invoice.status === "Pending" ? "bg-amber-100/80 text-amber-600" :
                "bg-red-100/80 text-red-600"
              }`}>
                {invoice.status}
              </span>
              <span className="text-[13px] font-medium text-slate-500">{invoice.customer}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pb-4 overflow-y-auto no-scrollbar flex flex-col gap-6">
          
          {/* Tabs */}
          <div className="bg-slate-50/80 p-1.5 rounded-2xl flex border border-slate-100 w-full">
            <button 
              onClick={() => setActiveTab("summary")}
              className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all ${
                activeTab === "summary" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
              }`}
            >
              Summary
            </button>
            <button 
              onClick={() => setActiveTab("line-items")}
              className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all ${
                activeTab === "line-items" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
              }`}
            >
              Line Items
            </button>
            <button 
              onClick={() => setActiveTab("adjustments")}
              className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all ${
                activeTab === "adjustments" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
              }`}
            >
              Adjustments
            </button>
            <button 
              onClick={() => setActiveTab("payment")}
              className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all ${
                activeTab === "payment" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
              }`}
            >
              Payment
            </button>
          </div>

          {activeTab === "summary" && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-300">
              
              {/* Blue Banner */}
              <div className="bg-blue-600 rounded-2xl p-6 flex justify-between items-center text-white shadow-md">
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-blue-200 mb-1">Invoice</span>
                  <span className="text-[20px] font-bold mb-1">{invoice.id}</span>
                  <span className="text-[13px] text-blue-100">{invoice.customer}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[12px] font-medium text-blue-200 mb-1">Total Due</span>
                  <span className="text-[24px] font-bold mb-1">{invoice.total}</span>
                  <span className="text-[13px] text-blue-100">Due: {invoice.due}</span>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100/50">
                  <div className="text-[11px] text-slate-400 mb-1 font-medium">PO Number</div>
                  <div className="text-[14px] font-bold text-slate-900">{invoice.po}</div>
                </div>
                <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100/50">
                  <div className="text-[11px] text-slate-400 mb-1 font-medium">Ticket</div>
                  <div className="text-[14px] font-bold text-slate-900">{invoice.ticket}</div>
                </div>
                
                <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100/50">
                  <div className="text-[11px] text-slate-400 mb-1 font-medium">Pipe Size</div>
                  <div className="text-[14px] font-bold text-slate-900">4"</div>
                </div>
                <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100/50">
                  <div className="text-[11px] text-slate-400 mb-1 font-medium">Coating Type</div>
                  <div className="text-[14px] font-bold text-slate-900">{invoice.coating}</div>
                </div>
                
                <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100/50">
                  <div className="text-[11px] text-slate-400 mb-1 font-medium">Footage</div>
                  <div className="text-[14px] font-bold text-slate-900">480 ft</div>
                </div>
                <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100/50">
                  <div className="text-[11px] text-slate-400 mb-1 font-medium">Flanges</div>
                  <div className="text-[14px] font-bold text-slate-900">4</div>
                </div>
                
                <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100/50">
                  <div className="text-[11px] text-slate-400 mb-1 font-medium">Fittings</div>
                  <div className="text-[14px] font-bold text-slate-900">8</div>
                </div>
                <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100/50">
                  <div className="text-[11px] text-slate-400 mb-1 font-medium">Rush Order</div>
                  <div className="text-[14px] font-bold text-slate-900">No</div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "line-items" && (
            <div className="flex flex-col animate-in fade-in duration-300">
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-slate-900">Auto-Calculated Line Items</h3>
                <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 border border-blue-100">
                  <span className="text-blue-500">⚡</span> Auto Calculated
                </span>
              </div>

              <div className="w-full text-left mb-6">
                <div className="grid grid-cols-12 border-b border-slate-100 pb-2 mb-3">
                  <div className="col-span-6 text-[11px] font-medium text-slate-400">Description</div>
                  <div className="col-span-2 text-[11px] font-medium text-slate-400">Qty</div>
                  <div className="col-span-2 text-[11px] font-medium text-slate-400">Rate</div>
                  <div className="col-span-2 text-[11px] font-medium text-slate-400 text-right">Amount</div>
                </div>

                <div className="grid grid-cols-12 items-center mb-4">
                  <div className="col-span-6 text-[13px] text-slate-700">Footage — Epoxy Coating (4")</div>
                  <div className="col-span-2 text-[13px] text-slate-500">480 ft</div>
                  <div className="col-span-2 text-[13px] text-slate-500">$1.50/ft</div>
                  <div className="col-span-2 text-[13px] font-bold text-slate-900 text-right">$720.00</div>
                </div>

                <div className="grid grid-cols-12 items-center mb-4">
                  <div className="col-span-6 text-[13px] text-slate-700">Flanges</div>
                  <div className="col-span-2 text-[13px] text-slate-500">4</div>
                  <div className="col-span-2 text-[13px] text-slate-500">$45.00 ea</div>
                  <div className="col-span-2 text-[13px] font-bold text-slate-900 text-right">$180.00</div>
                </div>

                <div className="grid grid-cols-12 items-center mb-1">
                  <div className="col-span-6 text-[13px] text-slate-700">Fittings</div>
                  <div className="col-span-2 text-[13px] text-slate-500">8</div>
                  <div className="col-span-2 text-[13px] text-slate-500">$35.00 ea</div>
                  <div className="col-span-2 text-[13px] font-bold text-slate-900 text-right">$280.00</div>
                </div>
              </div>

              <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100/50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[13px] text-slate-500">Subtotal</span>
                  <span className="text-[13px] font-bold text-slate-900">$1180.00</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[13px] text-slate-500">Tax (8.25%)</span>
                  <span className="text-[13px] font-bold text-slate-900">$97.35</span>
                </div>
                <div className="border-t border-slate-200/60 my-3"></div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[14px] font-bold text-slate-900">Total</span>
                  <span className="text-[15px] font-bold text-blue-600">$1277.35</span>
                </div>
              </div>

            </div>
          )}

          {activeTab === "adjustments" && (
            <div className="flex flex-col animate-in fade-in duration-300">
              <h3 className="text-[16px] font-bold text-slate-900 mb-4">Manual Adjustments</h3>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Extra Charge Description</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Additional surface prep"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Extra Charge Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[13px]">$</span>
                      <input 
                        type="text" 
                        placeholder="0.00"
                        className="w-full border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Discount Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[13px]">$</span>
                      <input 
                        type="text" 
                        placeholder="0"
                        className="w-full border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex justify-between items-center mt-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-bold text-blue-600">PO Billable Markup</span>
                    <span className="text-[11px] text-slate-500">PO Cost: $0.00 - Markup: 15%</span>
                    <span className="text-[11px] text-slate-400">This PO markup flows automatically from the linked Purchase Order.</span>
                  </div>
                  <span className="text-[13px] font-bold text-blue-600">Billable: $0.00</span>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Reason for Adjustment (Audit Log)</label>
                  <textarea 
                    placeholder="Required for audit trail..."
                    rows={3}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-300 resize-none"
                  ></textarea>
                </div>
              </div>

            </div>
          )}

          {activeTab === "payment" && (
            <div className="flex flex-col animate-in fade-in duration-300">
              <h3 className="text-[16px] font-bold text-slate-900 mb-4">Payment</h3>
              
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex flex-col gap-1 mb-8">
                <span className="text-[13px] font-bold text-emerald-700">Status: {invoice.status}</span>
                <span className="text-[12px] text-slate-500">Total Due: {invoice.total} &bull; Due: {invoice.due}</span>
              </div>

              <div className="flex flex-col items-center justify-center py-6 mb-8">
                <div className="mb-4">
                  <CheckCircle2 size={48} className="text-emerald-500" strokeWidth={1.5} />
                </div>
                <h4 className="text-[16px] font-bold text-emerald-600 mb-1">Payment Received</h4>
                <p className="text-[13px] text-slate-500">This invoice has been paid in full.</p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-600 font-bold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
                  QB Export
                </button>
                <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
                  <Download size={15} className="mr-2 text-slate-400" />
                  Download PDF
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        {activeTab === "summary" && (
          <div className="px-8 py-6 flex gap-3 bg-white mt-2">
            <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
              <Edit2 size={15} className="mr-2 text-slate-400" />
              Manual Adjust
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
              <Printer size={15} className="mr-2" />
              Print Invoice
            </button>
          </div>
        )}

        {activeTab === "adjustments" && (
          <div className="px-8 py-6 flex gap-3 bg-white mt-2 border-t border-slate-100/50">
            <button 
              onClick={() => setActiveTab("summary")}
              className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center"
            >
              Cancel
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
              <FileText size={15} className="mr-2" />
              Recalculate Invoice
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
