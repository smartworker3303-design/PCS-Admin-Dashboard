import React, { useState } from "react";
import { X, Star, ShoppingCart, Edit2, CheckCircle2, AlertCircle } from "lucide-react";

interface ViewVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: any;
}

export default function ViewVendorModal({ isOpen, onClose, vendor }: ViewVendorModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen || !vendor) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[600px] flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 bg-white z-10 sticky top-0 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-[48px] h-[48px] bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-[18px] shadow-sm shrink-0">
              {vendor.initial}
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[20px] font-bold text-slate-900 leading-none">{vendor.name}</h2>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  vendor.status === "Active" ? "bg-[#d1fae5] text-emerald-600" : "bg-slate-100 text-slate-600"
                }`}>
                  {vendor.status}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={13} 
                      className={`${i < vendor.rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-slate-300"}`} 
                    />
                  ))}
                </div>
              </div>
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
          <div className="bg-slate-50 p-1.5 rounded-xl flex items-center mb-6 mt-2">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "overview" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("purchase_orders")}
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "purchase_orders" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Purchase Orders
            </button>
            <button 
              onClick={() => setActiveTab("performance")}
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${activeTab === "performance" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Performance
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="animate-in fade-in duration-300">
              <div className="grid grid-cols-2 gap-3 mb-3">
                
                {/* Row 1 */}
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Contact Person</span>
                  <span className="block text-[13px] font-bold text-slate-900">Robert Chen</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Category</span>
                  <span className="block text-[13px] font-bold text-slate-900">{vendor.type}</span>
                </div>

                {/* Row 2 */}
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Phone</span>
                  <span className="block text-[13px] font-bold text-slate-900">{vendor.phone}</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Email</span>
                  <span className="block text-[13px] font-bold text-slate-900">{vendor.email}</span>
                </div>

                {/* Row 3 */}
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Payment Terms</span>
                  <span className="block text-[13px] font-bold text-slate-900">Net 30</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Tax ID</span>
                  <span className="block text-[13px] font-bold text-slate-900">TX-1122334</span>
                </div>

                {/* Row 4 */}
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Total Orders</span>
                  <span className="block text-[13px] font-bold text-slate-900">{vendor.ordersText.split(" ")[0]}</span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl p-4">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Total Spend</span>
                  <span className="block text-[13px] font-bold text-slate-900">{vendor.ordersText.split("- ")[1]}</span>
                </div>

                {/* Row 5 Full Width */}
                <div className="bg-[#f8fafc] rounded-2xl p-4 col-span-2">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Address</span>
                  <span className="block text-[13px] font-bold text-slate-900">500 Industrial Dr, Houston TX 77001</span>
                </div>

              </div>

              {/* Notes */}
              <div className="bg-[#eff6ff] rounded-2xl p-4 mt-1">
                <span className="block text-[12px] font-bold text-blue-600 mb-1">Notes</span>
                <span className="block text-[13px] font-medium text-blue-600/80">Primary powder supplier. High reliability, fast delivery.</span>
              </div>
            </div>
          )}

          {activeTab === "purchase_orders" && (
            <div className="animate-in fade-in duration-300 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[16px] font-bold text-slate-900">Purchase Orders (3)</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-[12px] font-bold transition-colors shadow-sm">
                  + New PO
                </button>
              </div>

              <div className="overflow-x-auto mb-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="py-3 pr-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">PO Number</th>
                      <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                      <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Items</th>
                      <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                      <th className="py-3 pl-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-3.5 pr-4 text-[13px] font-bold text-blue-600">PO-2026-041</td>
                      <td className="py-3.5 px-4 text-[13px] font-medium text-slate-600">Apr 21, 2026</td>
                      <td className="py-3.5 px-4 text-[13px] font-medium text-slate-600">4</td>
                      <td className="py-3.5 px-4 text-[13px] font-bold text-slate-900">$2,400</td>
                      <td className="py-3.5 pl-4">
                        <span className="bg-[#dbeafe] text-blue-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Open</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 text-[13px] font-bold text-blue-600">PO-2026-038</td>
                      <td className="py-3.5 px-4 text-[13px] font-medium text-slate-600">Apr 17, 2026</td>
                      <td className="py-3.5 px-4 text-[13px] font-medium text-slate-600">6</td>
                      <td className="py-3.5 px-4 text-[13px] font-bold text-slate-900">$3,200</td>
                      <td className="py-3.5 pl-4">
                        <span className="bg-[#dbeafe] text-blue-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Open</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 pr-4 text-[13px] font-bold text-blue-600">PO-2026-035</td>
                      <td className="py-3.5 px-4 text-[13px] font-medium text-slate-600">Apr 10, 2026</td>
                      <td className="py-3.5 px-4 text-[13px] font-medium text-slate-600">3</td>
                      <td className="py-3.5 px-4 text-[13px] font-bold text-slate-900">$1,800</td>
                      <td className="py-3.5 pl-4">
                        <span className="bg-[#d1fae5] text-emerald-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Received</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-100 pt-5 mt-2 flex justify-between items-center">
                <span className="text-[13px] font-medium text-slate-500">Total Spend</span>
                <span className="text-[15px] font-bold text-slate-900">$87,400</span>
              </div>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="animate-in fade-in duration-300 flex flex-col">
              <h3 className="text-[16px] font-bold text-slate-900 mb-4">Vendor Performance</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">On-Time Delivery</span>
                  <span className="block text-[18px] font-bold text-emerald-600 mb-2">94%</span>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Order Accuracy</span>
                  <span className="block text-[18px] font-bold text-blue-600 mb-2">98%</span>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Quality Rating</span>
                  <span className="block text-[18px] font-bold text-amber-500 mb-2">4.8/5</span>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Response Time</span>
                  <span className="block text-[18px] font-bold text-purple-600 mb-2">2.4 hrs</span>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              <h3 className="text-[14px] font-bold text-slate-900 mb-3">Recent Activity</h3>
              <div className="flex flex-col gap-2.5">
                <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl p-3.5 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-emerald-800">Delivered PO-2026-040 on time</span>
                    <span className="text-[12px] font-medium text-emerald-600/70">Apr 22, 2026</span>
                  </div>
                </div>
                <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-3.5 flex items-start gap-3">
                  <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-amber-800">PO-2026-036 — quantity discrepancy resolved</span>
                    <span className="text-[12px] font-medium text-amber-600/70">Apr 15, 2026</span>
                  </div>
                </div>
                <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl p-3.5 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-emerald-800">PO-2026-035 received with COA certificate</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer (Only on Overview) */}
        {activeTab === "overview" && (
          <div className="px-8 py-5 flex gap-4 bg-white border-t border-slate-50 sticky bottom-0">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center">
              <ShoppingCart size={16} className="mr-2" />
              Create PO
            </button>
            <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center">
              <Edit2 size={16} className="mr-2 text-slate-400" />
              Edit Vendor
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
