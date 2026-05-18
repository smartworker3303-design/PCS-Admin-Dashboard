import React, { useState } from "react";
import { X, BadgeCheck, Phone, Mail } from "lucide-react";

interface ReceivingDetailsModalProps {
  record: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReceivingDetailsModal({ record, isOpen, onClose }: ReceivingDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("Details");

  if (!isOpen || !record) return null;

  // Simple email generator based on rep name
  const repEmail = record.rep 
    ? `${record.rep.split(' ')[0][0].toLowerCase()}${record.rep.split(' ')[1]?.toLowerCase()}@abcsteel.com`
    : 'jsmith@abcsteel.com';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[600px] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-5 flex items-start justify-between bg-white z-10 sticky top-0">
          <div>
            <h2 className="text-[22px] font-bold text-slate-900 mb-2.5">{record.id}</h2>
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${record.statusColor || 'bg-blue-100 text-blue-700'}`}>
                {record.status}
              </span>
              <span className="text-[13px] font-medium text-slate-500">{record.customer}</span>
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
        <div className="px-6 pb-6 overflow-y-auto no-scrollbar flex-1 flex flex-col">
          
          {/* Tabs */}
          <div className="bg-slate-100 p-1.5 rounded-xl grid grid-cols-3 gap-1 mb-6 shrink-0">
            {["Details", "Parts", "Status History"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-[12px] font-bold rounded-lg transition-colors ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content: Details */}
          {activeTab === "Details" && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Row 1 */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">Receiving ID</p>
                  <p className="text-[14px] font-bold text-slate-900">{record.id}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">PO Number</p>
                  <p className="text-[14px] font-bold text-slate-900">{record.po}</p>
                </div>
                
                {/* Row 2 */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">Branch</p>
                  <p className="text-[14px] font-bold text-slate-900">Houston</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">Paint Type</p>
                  <p className="text-[14px] font-bold text-slate-900">Epoxy</p>
                </div>

                {/* Row 3 */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">Due Date</p>
                  <p className="text-[14px] font-bold text-slate-900">Apr 25, 2026</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">Created Date</p>
                  <p className="text-[14px] font-bold text-slate-900">{record.date}</p>
                </div>

                {/* Row 4 */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">Parts Count</p>
                  <p className="text-[14px] font-bold text-slate-900">{record.parts} parts</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">Status</p>
                  <p className="text-[14px] font-bold text-slate-900">{record.status}</p>
                </div>
              </div>

              {/* Representative Section */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100/50 mt-2">
                <h3 className="text-[13px] font-bold text-slate-900 mb-3.5">Representative</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-600 text-[13px] font-medium">
                    <BadgeCheck size={16} className="text-blue-500 mr-3 shrink-0" />
                    {record.rep}
                  </div>
                  <div className="flex items-center text-slate-600 text-[13px] font-medium">
                    <Phone size={16} className="text-blue-500 mr-3 shrink-0" />
                    +1 (713) 555-0142
                  </div>
                  <div className="flex items-center text-slate-600 text-[13px] font-medium">
                    <Mail size={16} className="text-blue-500 mr-3 shrink-0" />
                    {repEmail}
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div className="bg-[#fffbeb] rounded-xl p-5 border border-[#fef3c7] mt-1">
                <h3 className="text-[12px] font-bold text-orange-600 mb-1.5">Special Notes</h3>
                <p className="text-[13px] font-medium text-orange-500">Rush order - priority processing</p>
              </div>

              {/* Bottom Action */}
              <button className="w-full mt-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-[13px] transition-colors shadow-sm">
                Print Form
              </button>
            </div>
          )}

          {/* Tab Content: Parts */}
          {activeTab === "Parts" && (
            <div className="flex flex-col animate-in fade-in duration-200">
              <div className="flex justify-between items-end mb-4 px-1 mt-1">
                <h3 className="text-[16px] font-bold text-slate-900 leading-none">Parts List (3 items)</h3>
                <p className="text-[12px] font-medium text-slate-400 leading-none">18 total parts</p>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="text-[11px] text-slate-400 font-semibold border-b border-slate-100/80 uppercase tracking-wider bg-slate-50/30">
                    <tr>
                      <th className="py-3 pr-4 pl-1">Part ID</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Qty</th>
                      <th className="py-3 px-4">Width</th>
                      <th className="py-3 px-4">Height</th>
                      <th className="py-3 pl-4">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/80">
                    {[
                      { id: "P-0501", description: 'Structural Beam 4"', qty: 6, width: '4"', height: '96"', weight: '48 lbs' },
                      { id: "P-0502", description: 'Pipe Flange 6"', qty: 8, width: '6"', height: '4"', weight: '12 lbs' },
                      { id: "P-0503", description: 'End Cap 2"', qty: 4, width: '2"', height: '3"', weight: '4 lbs' },
                    ].map((part, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 pr-4 pl-1 font-semibold text-blue-600">{part.id}</td>
                        <td className="py-3.5 px-4 text-slate-700 font-medium">{part.description}</td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">{part.qty}</td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">{part.width}</td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">{part.height}</td>
                        <td className="py-3.5 pl-4 text-slate-600 font-medium">{part.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content: Status History */}
          {activeTab === "Status History" && (
            <div className="flex flex-col animate-in fade-in duration-200">
              <h3 className="text-[16px] font-bold text-slate-900 mb-5 mt-1 px-1">Status History</h3>
              
              <div className="relative pl-1">
                {/* Vertical Line */}
                <div className="absolute top-4 bottom-8 left-[11px] w-[2px] bg-slate-100"></div>
                
                <div className="space-y-3.5 relative">
                  {[
                    { title: "Created", meta: "Apr 21, 2026 08:00 - John Smith", completed: true },
                    { title: "Submitted", meta: "Apr 21, 2026 09:15 - John Smith", completed: true },
                    { title: "Pending Approval", meta: "Apr 21, 2026 10:30 - System", completed: false },
                    { title: "Approved", meta: "— - Manager", completed: false },
                  ].map((event, idx) => (
                    <div key={idx} className="flex gap-5">
                      {/* Icon */}
                      <div className="relative z-10 w-[14px] h-[14px] shrink-0 rounded-full mt-[18px] ring-[6px] ring-white flex items-center justify-center">
                        {event.completed ? (
                          <div className="w-full h-full bg-emerald-500 rounded-full"></div>
                        ) : (
                          <div className="w-[12px] h-[12px] bg-white border-2 border-slate-300 rounded-full"></div>
                        )}
                      </div>
                      
                      {/* Card */}
                      <div className={`flex-1 rounded-xl p-3.5 border ${event.completed ? 'bg-emerald-50/60 border-emerald-100/50' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <p className={`font-bold text-[14px] mb-1 ${event.completed ? 'text-emerald-800' : 'text-slate-600'}`}>{event.title}</p>
                        <p className={`text-[12px] font-medium ${event.completed ? 'text-slate-500' : 'text-slate-400'}`}>{event.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
