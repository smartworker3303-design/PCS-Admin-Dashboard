import React, { useState } from "react";
import { X, QrCode, Edit2, Plus, Phone, Mail } from "lucide-react";

interface CustomerDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
}

export default function CustomerDetailsPanel({ isOpen, onClose, customer }: CustomerDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isAddingNote, setIsAddingNote] = useState(false);

  if (!isOpen || !customer) return null;

  const tabs = ["Overview", "Representatives", "Requirements", "Jobs", "Pricing", "Notes"];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] transition-opacity"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-[600px] bg-white shadow-2xl z-[210] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-6 border-b border-slate-100 flex justify-between items-start shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-[20px] font-bold shrink-0">
              {customer.initials}
            </div>
            <div className="flex flex-col">
              <h2 className="text-[20px] font-bold text-slate-900 leading-tight mb-1">{customer.name}</h2>
              <div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                  customer.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                }`}>
                  {customer.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <QrCode size={14} />
              Print QR Badge
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-4 shrink-0">
          <div className="bg-slate-50 p-1 rounded-full flex overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[max-content] px-4 py-2 text-[12px] font-bold rounded-full transition-all ${
                  activeTab === tab ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Body Content */}
        <div className="px-6 py-2 flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3 pb-8">
          {activeTab === "Overview" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Contact Person</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.contact}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Phone</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.phone}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Email</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.email}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">City</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.location}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Total Jobs</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.jobs}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Total Revenue</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.revenue}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Credit Terms</span>
                  <span className="block text-[13px] font-bold text-slate-900">Net 30</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Tax ID</span>
                  <span className="block text-[13px] font-bold text-slate-900">TX-8834291</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                <span className="block text-[11px] font-medium text-slate-400 mb-1">Address</span>
                <span className="block text-[13px] font-bold text-slate-900">1234 Industrial Blvd, {customer.location} TX 77001</span>
              </div>

              {/* Action Buttons inside content */}
              <div className="flex items-center gap-3 mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-full text-[13px] transition-colors shadow-sm flex items-center">
                  <Edit2 size={14} className="mr-1.5" strokeWidth={2.5} />
                  Edit Customer
                </button>
                <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-6 rounded-full text-[13px] transition-colors shadow-sm flex items-center">
                  <Plus size={16} className="mr-1" strokeWidth={2.5} />
                  New Ticket
                </button>
              </div>
            </>
          )}

          {activeTab === "Representatives" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[15px] font-bold text-slate-900">Representatives</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full text-[11px] transition-colors shadow-sm flex items-center gap-1">
                  <Plus size={12} strokeWidth={3} />
                  Add Rep
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {/* Rep 1 */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[14px] font-bold text-slate-900">{customer.contact}</span>
                    <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      Primary Contact
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center text-[12px] text-slate-500 gap-2">
                      <Phone size={12} className="text-slate-400 shrink-0" strokeWidth={2.5} />
                      {customer.phone}
                    </div>
                    <div className="flex items-center text-[12px] text-slate-500 gap-2">
                      <Mail size={12} className="text-slate-400 shrink-0" strokeWidth={2.5} />
                      {customer.email}
                    </div>
                  </div>
                </div>

                {/* Rep 2 */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[14px] font-bold text-slate-900">Mike R.</span>
                    <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      Accounts Payable
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center text-[12px] text-slate-500 gap-2">
                      <Phone size={12} className="text-slate-400 shrink-0" strokeWidth={2.5} />
                      +1 (713) 555-0200
                    </div>
                    <div className="flex items-center text-[12px] text-slate-500 gap-2">
                      <Mail size={12} className="text-slate-400 shrink-0" strokeWidth={2.5} />
                      mikr@abcsteelcorp.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Requirements" && (
            <div className="flex flex-col gap-4">
              <h3 className="text-[15px] font-bold text-slate-900">Coating Requirements</h3>
              
              <div className="flex flex-col gap-3">
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Coating Specification</span>
                  <span className="block text-[13px] font-bold text-slate-900">ASTM D3359 / SSPC-PA2</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Minimum Thickness</span>
                  <span className="block text-[13px] font-bold text-slate-900">3.0 mil DFT minimum</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Color Standard</span>
                  <span className="block text-[13px] font-bold text-slate-900">RAL 5010 &mdash; Gentian Blue (standard)</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Rush Order Policy</span>
                  <span className="block text-[13px] font-bold text-slate-900">Rush orders: 1.5&times; multiplier, 48h turnaround</span>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mt-1">
                <span className="block text-[11px] font-bold text-orange-600 mb-1">Special Instructions</span>
                <span className="block text-[13px] font-medium text-orange-800">All structural beams require double-coat. Customer rep must inspect before pickup.</span>
              </div>

              <div className="mt-2">
                <span className="block text-[12px] font-medium text-slate-500 mb-3">Required Tests</span>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-600 text-white rounded-full px-3 py-1.5 text-[11px] font-bold">DFT Check</span>
                  <span className="bg-blue-600 text-white rounded-full px-3 py-1.5 text-[11px] font-bold">Adhesion Test</span>
                  <span className="bg-blue-600 text-white rounded-full px-3 py-1.5 text-[11px] font-bold">Gloss Measurement</span>
                  <span className="bg-blue-600 text-white rounded-full px-3 py-1.5 text-[11px] font-bold">Holiday Test</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Jobs" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-[15px] font-bold text-slate-900">Job History (3 jobs)</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full text-[11px] transition-colors shadow-sm flex items-center gap-1">
                  <Plus size={12} strokeWidth={3} />
                  New Ticket
                </button>
              </div>

              <div className="flex flex-col">
                {/* Job 1 */}
                <div className="flex justify-between items-start py-3 border-b border-slate-100">
                  <div>
                    <span className="block text-[13px] font-bold text-blue-600 mb-0.5">TK-2847</span>
                    <span className="block text-[12px] text-slate-400">24 parts &middot; Epoxy</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Apr 21, 2026</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] font-bold text-emerald-500 mb-0.5">Completed</span>
                    <span className="block text-[13px] font-bold text-slate-900">$1,240</span>
                  </div>
                </div>

                {/* Job 2 */}
                <div className="flex justify-between items-start py-3 border-b border-slate-100">
                  <div>
                    <span className="block text-[13px] font-bold text-blue-600 mb-0.5">TK-2842</span>
                    <span className="block text-[12px] text-slate-400">33 parts &middot; Epoxy</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Apr 19, 2026</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] font-bold text-purple-500 mb-0.5">Active</span>
                    <span className="block text-[13px] font-bold text-slate-900">$1,950</span>
                  </div>
                </div>

                {/* Job 3 */}
                <div className="flex justify-between items-start py-3 border-b border-slate-100">
                  <div>
                    <span className="block text-[13px] font-bold text-blue-600 mb-0.5">TK-2838</span>
                    <span className="block text-[12px] text-slate-400">9 parts &middot; Hybrid</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Apr 17, 2026</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] font-bold text-emerald-500 mb-0.5">Completed</span>
                    <span className="block text-[13px] font-bold text-slate-900">$590</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <span className="block text-[12px] font-medium text-slate-500 mb-1">Total Jobs</span>
                  <span className="block text-[12px] font-medium text-slate-500">Total Revenue</span>
                </div>
                <div className="text-right">
                  <span className="block text-[14px] font-bold text-slate-900 mb-0.5">84</span>
                  <span className="block text-[14px] font-bold text-slate-900">$42,800</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Pricing" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[15px] font-bold text-slate-900">Customer Pricing</h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                  <Edit2 size={12} strokeWidth={2.5} />
                  Edit Pricing
                </button>
              </div>

              <div className="mt-2">
                <h4 className="text-[13px] font-bold text-slate-700 mb-3">Pipe Diameter Pricing (per ft)</h4>
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-4 py-3 text-[11px] font-bold text-slate-500 w-1/3">Size</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-slate-500 w-1/3">Price/ft</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-slate-500 w-1/3">Rush Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-3 text-[13px] font-bold text-slate-900">2"</td>
                        <td className="px-4 py-3 text-[13px] font-medium text-slate-700">$3.50</td>
                        <td className="px-4 py-3 text-[13px] font-bold text-orange-500">$5.25</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-[13px] font-bold text-slate-900">4"</td>
                        <td className="px-4 py-3 text-[13px] font-medium text-slate-700">$5.00</td>
                        <td className="px-4 py-3 text-[13px] font-bold text-orange-500">$7.50</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-[13px] font-bold text-slate-900">6"</td>
                        <td className="px-4 py-3 text-[13px] font-medium text-slate-700">$7.50</td>
                        <td className="px-4 py-3 text-[13px] font-bold text-orange-500">$11.25</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-[13px] font-bold text-slate-900">8"</td>
                        <td className="px-4 py-3 text-[13px] font-medium text-slate-700">$10.00</td>
                        <td className="px-4 py-3 text-[13px] font-bold text-orange-500">$15.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Flanges (per unit)</span>
                  <span className="block text-[14px] font-bold text-slate-900">$45.00</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Grinding (per hr)</span>
                  <span className="block text-[14px] font-bold text-slate-900">$28.00</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Rush Multiplier</span>
                  <span className="block text-[14px] font-bold text-slate-900">1.5&times;</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Min. Order</span>
                  <span className="block text-[14px] font-bold text-slate-900">$250.00</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Notes" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[15px] font-bold text-slate-900">Notes & Comments</h3>
                <button 
                  onClick={() => setIsAddingNote(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full text-[11px] transition-colors shadow-sm flex items-center gap-1"
                >
                  <Plus size={12} strokeWidth={3} />
                  Add Note
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {/* Add Note Form */}
                {isAddingNote && (
                  <div className="bg-[#f8fafc] rounded-xl p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <textarea 
                      placeholder="Enter your note..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-3 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none min-h-[80px] shadow-sm"
                    />
                    <div className="flex items-center gap-1">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-full text-[12px] transition-colors shadow-sm">
                        Save Note
                      </button>
                      <button 
                        onClick={() => setIsAddingNote(false)}
                        className="text-slate-500 hover:text-slate-700 font-bold py-1.5 px-3 rounded-full text-[12px] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Note 1 */}
                <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">Priority</span>
                    <span className="text-[11px] text-slate-400 font-medium">Apr 20, 2026</span>
                  </div>
                  <p className="text-[13px] text-slate-700 font-medium leading-relaxed">Customer requested prioritization on all Houston orders going forward.</p>
                  <p className="text-[11px] text-slate-400">&mdash; Mike Torres</p>
                </div>

                {/* Note 2 */}
                <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold">Contract</span>
                    <span className="text-[11px] text-slate-400 font-medium">Apr 15, 2026</span>
                  </div>
                  <p className="text-[13px] text-slate-700 font-medium leading-relaxed">Annual contract renewal signed. Net 30 terms confirmed.</p>
                  <p className="text-[11px] text-slate-400">&mdash; Sara Kim</p>
                </div>

                {/* Note 3 */}
                <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold">General</span>
                    <span className="text-[11px] text-slate-400 font-medium">Apr 10, 2026</span>
                  </div>
                  <p className="text-[13px] text-slate-700 font-medium leading-relaxed">Customer updated contact info &mdash; new email for John Smith confirmed.</p>
                  <p className="text-[11px] text-slate-400">&mdash; Admin</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
