import React, { useState, useEffect } from "react";
import { X, Pencil, QrCode, Check, Plus, Printer, Download } from "lucide-react";
import EditTicketModal from "./EditTicketModal";
import PrintQRModal from "./PrintQRModal";

interface TicketDetailsModalProps {
  ticket: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (ticket: any) => void;
}

const dummyParts = [
  { id: "P-2234", description: "Pipe Section 2\"", qty: 12, width: "2\"", height: "60\"", weight: "22 lbs", status: "Completed", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: "P-2235", description: "Elbow 2\"", qty: 8, width: "2\"", height: "6\"", weight: "4 lbs", status: "Completed", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: "P-2236", description: "Coupling 4\"", qty: 4, width: "4\"", height: "6\"", weight: "8 lbs", status: "QC", statusColor: "bg-white border border-slate-200 text-slate-700" },
];

const dummyQC = [
  { qcId: "QC-0892", partId: "P-2234", thickness: "3.2 mil", gloss: "78", defect: "—", inspector: "Jane Lee", result: "Passed", resultColor: "bg-emerald-100 text-emerald-700", defectColor: "text-slate-400" },
  { qcId: "QC-0893", partId: "P-2235", thickness: "3.0 mil", gloss: "80", defect: "—", inspector: "Jane Lee", result: "Passed", resultColor: "bg-emerald-100 text-emerald-700", defectColor: "text-slate-400" },
  { qcId: "QC-0894", partId: "P-2236", thickness: "2.1 mil", gloss: "55", defect: "Thin coating", inspector: "Tom Hill", result: "Rework", resultColor: "bg-amber-100 text-amber-700", defectColor: "text-red-500 font-medium" },
];

export default function TicketDetailsModal({ ticket, isOpen, onClose, onSave }: TicketDetailsModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  useEffect(() => {
    if (ticket) {
      setFormData({
        ...ticket,
        paintType: ticket.paintType || "Epoxy",
      });
      setActiveTab("Overview");
    }
  }, [ticket]);

  if (!isOpen || !ticket) return null;

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const tabs = ["Overview", "Parts", "Timeline", "QC", "Invoice"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal - Adjusted to ideal size max-w-3xl */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-5 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Ticket {formData.id}</h2>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${formData.statusColor || 'bg-slate-100 text-slate-700'}`}>
              {formData.status}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs - Grid forces exactly equal sizes for all tabs */}
        <div className="px-8 pb-6">
          <div className="bg-slate-50 rounded-full p-1 grid grid-cols-5 text-sm font-medium text-slate-500 w-full shadow-sm border border-slate-100">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 rounded-full text-center transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'hover:text-slate-800 hover:bg-slate-200/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Body Container */}
        <div className="px-8 pb-6 overflow-y-auto no-scrollbar flex-1 flex flex-col">
          
          {/* TAB CONTENT: OVERVIEW */}
          {activeTab === "Overview" && (
            <div className="flex-1 flex flex-col">
              {/* Data Grid - refined padding and rounding to match Figma */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-50 focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">Customer</label>
                  <input 
                    value={formData.customer || ''} 
                    onChange={(e) => handleChange('customer', e.target.value)}
                    className="w-full bg-transparent text-[14px] font-bold text-slate-900 outline-none" 
                  />
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-50 focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">Branch</label>
                  <input 
                    value={formData.branch || ''} 
                    onChange={(e) => handleChange('branch', e.target.value)}
                    className="w-full bg-transparent text-[14px] font-bold text-slate-900 outline-none" 
                  />
                </div>
                
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-50 focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">Supervisor</label>
                  <input 
                    value={formData.supervisor || ''} 
                    onChange={(e) => handleChange('supervisor', e.target.value)}
                    className="w-full bg-transparent text-[14px] font-bold text-slate-900 outline-none" 
                  />
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-50 focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">Paint Type</label>
                  <input 
                    value={formData.paintType || ''} 
                    onChange={(e) => handleChange('paintType', e.target.value)}
                    className="w-full bg-transparent text-[14px] font-bold text-slate-900 outline-none" 
                  />
                </div>
                
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-50 focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">Parts Count</label>
                  <input 
                    value={formData.parts || ''} 
                    onChange={(e) => handleChange('parts', e.target.value)}
                    className="w-full bg-transparent text-[14px] font-bold text-slate-900 outline-none" 
                  />
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-50 focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">Date Created</label>
                  <input 
                    value={formData.date || ''} 
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full bg-transparent text-[14px] font-bold text-slate-900 outline-none" 
                  />
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-50 focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">Amount</label>
                  <input 
                    value={formData.amount || ''} 
                    onChange={(e) => handleChange('amount', e.target.value)}
                    className="w-full bg-transparent text-[14px] font-bold text-slate-900 outline-none" 
                  />
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-50 focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1 uppercase tracking-wider">Status</label>
                  <input 
                    value={formData.status || ''} 
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full bg-transparent text-[14px] font-bold text-slate-900 outline-none" 
                  />
                </div>
              </div>

              {/* Process Progress - Removed gray background to match Figma */}
              <div className="mb-6 mt-2">
                <h3 className="text-sm font-bold text-slate-900 mb-6">Process Progress</h3>
                
                <div className="relative flex justify-between w-full px-2 sm:px-6 mb-2">
                  {/* Connecting Lines */}
                  <div className="absolute top-4 left-8 right-8 h-[3px] bg-slate-100 -z-10 rounded-full"></div>
                  <div className="absolute top-4 left-8 h-[3px] bg-blue-600 -z-10 rounded-full" style={{ width: '60%' }}></div>
                  
                  {/* Steps */}
                  {['Receiving', 'Grinding', 'Coating', 'Oven', 'QC', 'Pickup'].map((step, idx) => {
                    const isCompleted = idx < 4; // First 4 are completed in screenshot
                    return (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 text-xs font-bold shadow-sm ring-4 ring-white ${
                          isCompleted ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {isCompleted ? <Check size={16} strokeWidth={3} /> : (idx + 1)}
                        </div>
                        <span className={`text-[11px] font-semibold ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Overview Buttons */}
              <div className="flex gap-4 mt-auto pt-4">
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center shadow-sm"
                >
                  <Pencil size={18} className="mr-2" />
                  Edit Ticket
                </button>
                <button 
                  onClick={() => setIsQRModalOpen(true)}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center shadow-sm"
                >
                  <QrCode size={18} className="mr-2" />
                  Print QR
                </button>
              </div>
            </div>
          )}

          {/* TAB CONTENT: PARTS */}
          {activeTab === "Parts" && (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Parts List (3 items)</h3>
                <button className="flex items-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                  <Plus size={16} className="mr-1.5" />
                  Add Part
                </button>
              </div>

              <div className="rounded-xl border border-slate-100 overflow-hidden mb-6 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-[11px] text-slate-400 font-semibold bg-slate-50/50 border-b border-slate-100 uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3">Part ID</th>
                        <th className="px-5 py-3">Description</th>
                        <th className="px-5 py-3">Qty</th>
                        <th className="px-5 py-3">Width</th>
                        <th className="px-5 py-3">Height</th>
                        <th className="px-5 py-3">Weight</th>
                        <th className="px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {dummyParts.map((part, index) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-3.5 font-semibold text-blue-600">{part.id}</td>
                          <td className="px-5 py-3.5 font-medium text-slate-800">{part.description}</td>
                          <td className="px-5 py-3.5 text-slate-600 font-medium">{part.qty}</td>
                          <td className="px-5 py-3.5 text-slate-600 font-medium">{part.width}</td>
                          <td className="px-5 py-3.5 text-slate-600 font-medium">{part.height}</td>
                          <td className="px-5 py-3.5 text-slate-600 font-medium">{part.weight}</td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${part.statusColor}`}>
                              {part.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Parts Bottom Button */}
              <div className="mt-auto pt-2">
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center shadow-sm"
                >
                  <QrCode size={18} className="mr-2" />
                  Print All Part QR
                </button>
              </div>
            </div>
          )}

          {/* TAB CONTENT: TIMELINE */}
          {activeTab === "Timeline" && (
            <div className="flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Job Timeline</h3>
              
              <div className="relative pl-1">
                {/* Vertical Line */}
                <div className="absolute top-4 bottom-8 left-[15px] w-[2px] bg-slate-100"></div>
                
                <div className="space-y-3.5 relative">
                  {[
                    { title: "Ticket Created", meta: "Apr 18, 2026 09:00 - Mike Torres" },
                    { title: "Parts Received", meta: "Apr 18, 2026 10:30 - John Smith" },
                    { title: "Blasting Completed", meta: "Apr 19, 2026 08:00 - T. Williams" },
                    { title: "Coating Completed", meta: "Apr 20, 2026 11:00 - E. Cruz" },
                    { title: "QC Passed", meta: "Apr 21, 2026 09:30 - Jane Lee" },
                    { title: "Pickup Complete", meta: "Apr 21, 2026 14:00 - Mike Torres" },
                  ].map((event, idx) => (
                    <div key={idx} className="flex gap-5">
                      {/* Icon */}
                      <div className="relative z-10 w-[22px] h-[22px] shrink-0 rounded-full bg-emerald-500 text-white flex items-center justify-center mt-3.5 ring-[6px] ring-white">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      
                      {/* Card */}
                      <div className="flex-1 bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-100/50">
                        <p className="font-bold text-[14px] text-emerald-800 mb-1">{event.title}</p>
                        <p className="text-[12px] font-medium text-slate-500">{event.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: QC */}
          {activeTab === "QC" && (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4 mt-2">
                <h3 className="text-lg font-bold text-slate-900">QC Inspections</h3>
                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                  <Plus size={16} className="mr-1.5" />
                  New Inspection
                </button>
              </div>

              <div className="rounded-xl border border-slate-100 overflow-hidden mb-6 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-[11px] text-slate-400 font-semibold bg-slate-50/50 border-b border-slate-100 uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3">QC ID</th>
                        <th className="px-5 py-3">Part ID</th>
                        <th className="px-5 py-3">Thickness</th>
                        <th className="px-5 py-3">Gloss</th>
                        <th className="px-5 py-3">Defect</th>
                        <th className="px-5 py-3">Inspector</th>
                        <th className="px-5 py-3">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {dummyQC.map((qc, index) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-3.5 font-semibold text-blue-600">{qc.qcId}</td>
                          <td className="px-5 py-3.5 text-slate-600 font-medium">{qc.partId}</td>
                          <td className="px-5 py-3.5 text-slate-600 font-medium">{qc.thickness}</td>
                          <td className="px-5 py-3.5 text-slate-600 font-medium">{qc.gloss}</td>
                          <td className={`px-5 py-3.5 font-medium ${qc.defectColor}`}>{qc.defect}</td>
                          <td className="px-5 py-3.5 text-slate-600 font-medium">{qc.inspector}</td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${qc.resultColor}`}>
                              {qc.result}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: INVOICE */}
          {activeTab === "Invoice" && (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-5 mt-2">
                <h3 className="text-lg font-bold text-slate-900">Invoice Summary</h3>
                <span className="px-3 py-1.5 text-[11px] font-bold rounded-full bg-amber-100 text-amber-700">
                  Pending
                </span>
              </div>

              <div className="rounded-xl border border-slate-100 p-5 mb-5 shadow-sm bg-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-[15px] text-slate-800 mb-0.5">INV-2026-XXXX</p>
                    <p className="text-[12px] text-slate-400 font-medium">Ticket: TK-2847 - ABC Steel Corp</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-slate-400 font-semibold mb-0.5 uppercase tracking-wider">Invoice Date</p>
                    <p className="font-bold text-[14px] text-slate-800">Apr 21, 2026</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-4"></div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-[13px] text-slate-500 font-medium">Subtotal</p>
                    <p className="text-[14px] font-bold text-slate-800">$1240.00</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[13px] text-slate-500 font-medium">Tax (8.25%)</p>
                    <p className="text-[14px] font-bold text-slate-800">$102.30</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[13px] text-slate-500 font-medium">Discount</p>
                    <p className="text-[14px] font-bold text-emerald-600">-$0.00</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-1">
                    <p className="text-[15px] font-bold text-slate-900">Total</p>
                    <p className="text-[15px] font-bold text-slate-900">$1342.30</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                  <p className="text-[11px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Due Date</p>
                  <p className="text-[14px] font-bold text-slate-900">May 01, 2026</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                  <p className="text-[11px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Payment Terms</p>
                  <p className="text-[14px] font-bold text-slate-900">Net 30</p>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex gap-4 mt-auto pt-2">
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center shadow-sm"
                >
                  <Printer size={18} className="mr-2" />
                  Print Invoice
                </button>
                <button 
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center shadow-sm"
                >
                  <Download size={18} className="mr-2" />
                  QB Export
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <EditTicketModal 
        ticket={formData} 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />

      <PrintQRModal 
        ticket={formData} 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
      />
    </div>
  );
}
