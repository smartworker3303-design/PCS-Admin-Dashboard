import React, { useState } from "react";
import { X, Printer, Download } from "lucide-react";

interface ViewPOModalProps {
  isOpen: boolean;
  onClose: () => void;
  po: any;
}

export default function ViewPOModal({ isOpen, onClose, po }: ViewPOModalProps) {
  const [activeTab, setActiveTab] = useState("details");

  if (!isOpen || !po) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[600px] flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 bg-white z-10 sticky top-0 flex justify-between items-start">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-[20px] font-bold text-slate-900">{po.id}</h2>
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                po.status === "Open" ? "bg-[#dbeafe] text-blue-600" :
                po.status === "Received" ? "bg-[#d1fae5] text-emerald-600" :
                po.status === "Pending" ? "bg-[#fef3c7] text-amber-600" :
                "bg-[#fee2e2] text-red-600"
              }`}>
                {po.status}
              </span>
              <span className="text-[13px] text-slate-500 font-medium">{po.vendor}</span>
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
          <div className="bg-slate-50 p-1.5 rounded-xl flex items-center mb-6">
            <button 
              onClick={() => setActiveTab("details")}
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "details" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Details
            </button>
            <button 
              onClick={() => setActiveTab("line_items")}
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "line_items" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Line Items
            </button>
            <button 
              onClick={() => setActiveTab("delivery")}
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "delivery" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Delivery
            </button>
          </div>

          {activeTab === "details" && (
            <div className="animate-in fade-in duration-300">
              <div className="grid grid-cols-2 gap-3 mb-4">
                
                {/* Row 1 */}
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">PO Number</span>
                  <span className="block text-[13px] font-bold text-slate-900">{po.id}</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Branch</span>
                  <span className="block text-[13px] font-bold text-slate-900">Houston</span>
                </div>

                {/* Row 2 */}
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Vendor</span>
                  <span className="block text-[13px] font-bold text-slate-900">{po.vendor}</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Vendor Contact</span>
                  <span className="block text-[13px] font-bold text-slate-900">Robert Chen</span>
                </div>

                {/* Row 3 */}
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Vendor Email</span>
                  <span className="block text-[13px] font-bold text-slate-900">rchen@chemcorp.com</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Cost Code</span>
                  <span className="block text-[13px] font-bold text-slate-900">CC-HOU-041</span>
                </div>

                {/* Row 4 */}
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Date Created</span>
                  <span className="block text-[13px] font-bold text-slate-900">{po.date}</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Delivery Date</span>
                  <span className="block text-[13px] font-bold text-slate-900">Apr 25, 2026</span>
                </div>

                {/* Row 5 */}
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Related Client</span>
                  <span className="block text-[13px] font-bold text-slate-900">{po.client !== "—" ? po.client : "ABC Steel Corp"}</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Related Job</span>
                  <span className="block text-[13px] font-bold text-slate-900">{po.job !== "—" ? po.job : "TK-2847"}</span>
                </div>

                {/* Row 6 */}
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Total Amount</span>
                  <span className="block text-[13px] font-bold text-slate-900">{po.amount}</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Status</span>
                  <span className="block text-[13px] font-bold text-slate-900">{po.status}</span>
                </div>

              </div>

              {/* Notes */}
              <div className="bg-[#fffbeb] rounded-2xl p-4">
                <span className="block text-[12px] font-bold text-amber-700 mb-1">Notes</span>
                <span className="block text-[13px] font-medium text-amber-700/80">Rush order — needed by Apr 25</span>
              </div>
            </div>
          )}

          {activeTab === "line_items" && (
            <div className="animate-in fade-in duration-300 flex flex-col">
              <h3 className="text-[16px] font-bold text-slate-900 mb-4">Line Items (4 items)</h3>
              
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="py-3 pr-4 text-[12px] font-medium text-slate-500">Description</th>
                      <th className="py-3 px-4 text-[12px] font-medium text-slate-500">Qty</th>
                      <th className="py-3 px-4 text-[12px] font-medium text-slate-500">Unit</th>
                      <th className="py-3 px-4 text-[12px] font-medium text-slate-500">Unit Price</th>
                      <th className="py-3 pl-4 text-[12px] font-medium text-slate-500 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-3.5 pr-4 text-[13px] text-slate-700">Epoxy Blue RAL 5010</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">100</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">lbs</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">$12.50</td>
                      <td className="py-3.5 pl-4 text-[13px] font-bold text-slate-900 text-right">$1250.00</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 text-[13px] text-slate-700">Epoxy Primer Gray</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">50</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">lbs</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">$11.00</td>
                      <td className="py-3.5 pl-4 text-[13px] font-bold text-slate-900 text-right">$550.00</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 text-[13px] text-slate-700">Hardener Additive</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">10</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">gal</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">$24.00</td>
                      <td className="py-3.5 pl-4 text-[13px] font-bold text-slate-900 text-right">$240.00</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 text-[13px] text-slate-700">Shipping & Handling</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">1</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">lot</td>
                      <td className="py-3.5 px-4 text-[13px] text-slate-700">$150.00</td>
                      <td className="py-3.5 pl-4 text-[13px] font-bold text-slate-900 text-right">$150.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#f8fafc] rounded-xl p-4 flex justify-between items-center mb-2">
                <span className="text-[14px] font-bold text-slate-900">Total</span>
                <span className="text-[16px] font-bold text-blue-600">$2190.00</span>
              </div>
            </div>
          )}

          {activeTab === "delivery" && (
            <div className="animate-in fade-in duration-300 flex flex-col">
              <h3 className="text-[16px] font-bold text-slate-900 mb-4">Delivery Information</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Delivery To</span>
                  <span className="block text-[13px] font-bold text-slate-900">Houston Branch</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Expected Date</span>
                  <span className="block text-[13px] font-bold text-slate-900">Apr 25, 2026</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Vendor</span>
                  <span className="block text-[13px] font-bold text-slate-900">{po.vendor}</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Contact</span>
                  <span className="block text-[13px] font-bold text-slate-900">Robert Chen</span>
                </div>
              </div>

              {/* Timeline Container */}
              <div className="flex flex-col">
                
                {/* Step 1 */}
                <div className="relative flex gap-5 pb-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full z-10 shrink-0 box-content outline outline-4 outline-white"></div>
                    <div className="w-[2px] h-full bg-slate-100 absolute top-5 bottom-0 left-[7px]"></div>
                  </div>
                  <div className="bg-[#f0fdf4] rounded-2xl p-4 flex-1 shadow-sm border border-emerald-50/50">
                    <span className="block text-[13px] font-bold text-emerald-700 mb-0.5">PO Created</span>
                    <span className="block text-[12px] font-medium text-emerald-600/70">{po.date}</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex gap-5 pb-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-3.5 h-3.5 bg-white border-2 border-slate-200 rounded-full z-10 shrink-0 box-content outline outline-4 outline-white"></div>
                    <div className="w-[2px] h-full bg-slate-100 absolute top-5 bottom-0 left-[7px]"></div>
                  </div>
                  <div className="bg-[#f8fafc] rounded-2xl p-4 flex-1 border border-slate-50">
                    <span className="block text-[13px] font-bold text-slate-600 mb-0.5">Vendor Notified</span>
                    <span className="block text-[12px] font-medium text-slate-400">—</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex gap-5 pb-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-3.5 h-3.5 bg-white border-2 border-slate-200 rounded-full z-10 shrink-0 box-content outline outline-4 outline-white"></div>
                    <div className="w-[2px] h-full bg-slate-100 absolute top-5 bottom-0 left-[7px]"></div>
                  </div>
                  <div className="bg-[#f8fafc] rounded-2xl p-4 flex-1 border border-slate-50">
                    <span className="block text-[13px] font-bold text-slate-600 mb-0.5">In Transit</span>
                    <span className="block text-[12px] font-medium text-slate-400">—</span>
                  </div>
                </div>

                {/* Step 4 (Last) */}
                <div className="relative flex gap-5">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-3.5 h-3.5 bg-white border-2 border-slate-200 rounded-full z-10 shrink-0 box-content outline outline-4 outline-white"></div>
                  </div>
                  <div className="bg-[#f8fafc] rounded-2xl p-4 flex-1 border border-slate-50">
                    <span className="block text-[13px] font-bold text-slate-600 mb-0.5">Delivered</span>
                    <span className="block text-[12px] font-medium text-slate-400">—</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        {activeTab === "details" && (
          <div className="px-8 py-5 flex gap-4 bg-white border-t border-slate-50 sticky bottom-0">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm">
              Mark as Received
            </button>
            <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center">
              <Printer size={16} className="mr-2 text-slate-400" />
              Print PO
            </button>
          </div>
        )}

        {activeTab === "line_items" && (
          <div className="px-8 py-5 bg-white border-t border-slate-50 sticky bottom-0">
            <button className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center">
              <Download size={16} className="mr-2 text-slate-400" />
              Export to PDF
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
