import React, { useState } from "react";
import { X, Check, ChevronRight, ArrowRight, Plus } from "lucide-react";

interface NewReceivingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewReceivingModal({ isOpen, onClose }: NewReceivingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[800px] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-3 flex items-start justify-between bg-white z-10 sticky top-0">
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 mb-3.5">New Receiving Form</h2>
            
            {/* Stepper */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-[12px] font-medium text-slate-500">Customer</span>
              </div>
              <ChevronRight size={14} className="text-slate-300 mx-1" />
              
              <div className="flex items-center gap-1.5">
                {currentStep >= 2 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400">2</span>
                  </div>
                )}
                <span className="text-[12px] font-medium text-slate-500">Paint & PO</span>
              </div>
              <ChevronRight size={14} className="text-slate-300 mx-1" />
              
              <div className="flex items-center gap-1.5">
                {currentStep >= 3 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400">3</span>
                  </div>
                )}
                <span className={`text-[12px] font-medium ${currentStep >= 3 ? 'text-slate-700' : 'text-slate-500'}`}>Parts</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50 mt-[-4px]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pt-5 pb-8 overflow-y-auto no-scrollbar flex flex-col relative">
          
          {currentStep === 1 && (
            <div className="animate-in fade-in duration-200">
              <h3 className="text-[15px] font-bold text-slate-800 mb-5">Customer Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Customer Name</label>
                  <input 
                    type="text" 
                    placeholder="Select customer..."
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Company</label>
                  <input 
                    type="text" 
                    placeholder="Company name"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Phone</label>
                  <input 
                    type="text" 
                    placeholder="+1 (xxx) xxx-xxxx"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Email</label>
                  <input 
                    type="text" 
                    placeholder="contact@company.com"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <h3 className="text-[15px] font-bold text-slate-800 mb-5">Representative</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Rep Name</label>
                  <input 
                    type="text" 
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Rep Phone</label>
                  <input 
                    type="text" 
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-end mt-2">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  Next
                  <ArrowRight size={16} className="ml-1.5" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-in fade-in duration-200">
              <h3 className="text-[15px] font-bold text-slate-800 mb-5">PO & Cost Code</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">PO Number</label>
                  <input 
                    type="text" 
                    placeholder="PO-2026-XXX"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Cost Code</label>
                  <input 
                    type="text" 
                    placeholder="CC-HOU-XXX"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Due Date</label>
                  <input 
                    type="text" 
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Priority</label>
                  <input 
                    type="text" 
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <h3 className="text-[15px] font-bold text-slate-800 mb-4">Paint Type</h3>
              
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["Epoxy", "Polyester", "Hybrid", "Urethane", "Polyurethane"].map((paint) => (
                  <button 
                    key={paint}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors"
                  >
                    {paint}
                  </button>
                ))}
              </div>

              {/* Bottom Action */}
              <div className="flex justify-between mt-2">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  <ArrowRight size={16} className="mr-1.5 rotate-180" />
                  Back
                </button>
                <button 
                  onClick={() => setCurrentStep(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  Next
                  <ArrowRight size={16} className="ml-1.5" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-in fade-in duration-200">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[15px] font-bold text-slate-800">Parts List</h3>
                <button className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-colors flex items-center">
                  <Plus size={16} className="mr-1.5" />
                  Add Part
                </button>
              </div>
              
              <div className="bg-slate-50/50 border border-slate-200 rounded-xl overflow-x-auto mb-8">
                <table className="w-full text-sm text-left whitespace-nowrap min-w-[600px]">
                  <thead className="text-[11px] text-slate-500 font-semibold bg-slate-100/50 border-b border-slate-200 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Part ID</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Qty</th>
                      <th className="py-3 px-4">Dimensions</th>
                      <th className="py-3 px-4">Weight</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50 transition-colors bg-white">
                      <td className="py-3.5 px-4 font-semibold text-blue-600">P-001</td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">Structural Beam 4"</td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">6</td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">4" x 96"</td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">48 lbs</td>
                      <td className="py-3.5 px-4 text-right">
                        <button className="text-slate-400 hover:text-red-500 transition-colors p-1 hover:bg-slate-100 rounded">
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                    {/* Add Part Row */}
                    <tr className="bg-slate-50/30">
                      <td className="py-3 px-4 text-slate-400 italic text-[12px]">Auto</td>
                      <td className="py-3 px-4">
                        <input type="text" placeholder="Description..." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500" />
                      </td>
                      <td className="py-3 px-4">
                        <input type="number" placeholder="Qty" className="w-16 px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500" />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <input type="text" placeholder="W" className="w-14 px-2 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500 text-center" />
                          <span className="text-slate-400 text-xs">x</span>
                          <input type="text" placeholder="H" className="w-14 px-2 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500 text-center" />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <input type="text" placeholder="Weight" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500" />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-[12px] shadow-sm transition-colors">
                          Save
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-between mt-2">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  <ArrowRight size={16} className="mr-1.5 rotate-180" />
                  Back
                </button>
                <button 
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  <Check size={16} className="mr-1.5" />
                  Submit Receiving Form
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
