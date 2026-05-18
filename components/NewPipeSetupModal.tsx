import React, { useState } from "react";
import { X, Check, ChevronRight, ArrowRight, CheckCircle2, Save } from "lucide-react";

interface NewPipeSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewPipeSetupModal({ isOpen, onClose }: NewPipeSetupModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-[800px] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-3 flex items-start justify-between bg-white z-10 sticky top-0">
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 mb-3.5">New Pipe Process Setup</h2>
            
            {/* Stepper */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5">
                {currentStep > 1 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                )}
                <span className={`text-[12px] font-medium ${currentStep === 1 ? 'text-slate-900' : 'text-slate-500'}`}>Pipe Details</span>
              </div>
              <ChevronRight size={14} className="text-slate-300 mx-1" />
              
              <div className="flex items-center gap-1.5">
                {currentStep > 2 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : currentStep === 2 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400">2</span>
                  </div>
                )}
                <span className={`text-[12px] font-medium ${currentStep === 2 ? 'text-slate-900' : 'text-slate-500'}`}>Coating Spec</span>
              </div>
              <ChevronRight size={14} className="text-slate-300 mx-1" />
              
              <div className="flex items-center gap-1.5">
                {currentStep > 3 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : currentStep === 3 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400">3</span>
                  </div>
                )}
                <span className={`text-[12px] font-medium ${currentStep >= 3 ? 'text-slate-900' : 'text-slate-500'}`}>Process Assignment</span>
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
        <div className="px-8 pt-6 pb-8 overflow-y-auto no-scrollbar flex flex-col relative">
          
          {currentStep === 1 && (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[30px] h-[30px] rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[14px] shadow-sm">
                  1
                </div>
                <h3 className="text-[17px] font-bold text-slate-900">Pipe Details</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">System Part ID</label>
                  <input type="text" placeholder="e.g. P-2241" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Client Pipe ID</label>
                  <input type="text" placeholder="e.g. CP-001" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
                
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Pipe Description</label>
                  <input type="text" placeholder='e.g. 6" Carbon Steel Pipe' className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Pipe Size / Diameter</label>
                  <input type="text" placeholder='e.g. 6"' className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Pipe Length (ft)</label>
                  <input type="text" placeholder="e.g. 40" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Welder Info</label>
                  <input type="text" placeholder="e.g. W. Johnson — Cert #2234" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Pipe Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-blue-600 text-white font-medium py-2 rounded-[10px] text-[13px] shadow-sm">Tubing</button>
                    <button className="bg-white border border-slate-200 text-slate-600 font-medium py-2 rounded-[10px] text-[13px] hover:bg-slate-50 transition-colors">Fittings</button>
                    <button className="bg-white border border-slate-200 text-slate-600 font-medium py-2 rounded-[10px] text-[13px] hover:bg-slate-50 transition-colors">Flanges</button>
                    <button className="bg-white border border-slate-200 text-slate-600 font-medium py-2 rounded-[10px] text-[13px] hover:bg-slate-50 transition-colors">Fabrication</button>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Material Type</label>
                  <input type="text" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Associated Fittings</label>
                  <input type="text" placeholder="e.g. 4 elbows, 2 tees" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Associated Flanges</label>
                  <input type="text" placeholder='e.g. 2 x 6" flanges' className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Special Instructions</label>
                <textarea 
                  placeholder="Any special handling or coating requirements..." 
                  rows={3}
                  className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-end pt-2">
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
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[30px] h-[30px] rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[14px] shadow-sm">
                  2
                </div>
                <h3 className="text-[17px] font-bold text-slate-900">Coating Specification</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">External Coating Type</label>
                  <input type="text" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Internal Coating Type</label>
                  <input type="text" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Primer Required</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-blue-600 text-white font-medium py-2.5 rounded-[10px] text-[13px] shadow-sm">Yes</button>
                    <button className="bg-white border border-slate-200 text-slate-600 font-medium py-2.5 rounded-[10px] text-[13px] hover:bg-slate-50 transition-colors">No</button>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Required Mil Thickness</label>
                  <div className="relative">
                    <input type="text" defaultValue="3.0" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 pr-10" />
                    <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[13px] text-slate-400">
                      mil
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-5">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Customer Specification</label>
                  <input type="text" defaultValue="ASTM D3359" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Coating Standard</label>
                  <input type="text" defaultValue="SSPC-PA2" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Coating Applicability</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="bg-blue-600 text-white font-medium py-2.5 rounded-xl text-[13px] shadow-sm">External</button>
                  <button className="bg-white border border-slate-200 text-slate-600 font-medium py-2.5 rounded-xl text-[13px] hover:bg-slate-50 transition-colors">Internal</button>
                  <button className="bg-blue-600 text-white font-medium py-2.5 rounded-xl text-[13px] shadow-sm">Flange</button>
                </div>
              </div>

              {/* Coating Summary Box */}
              <div className="bg-[#eff6ff] border border-blue-100 rounded-[14px] p-5 mb-6">
                <h4 className="text-[12px] font-bold text-blue-700 mb-3">Coating Summary</h4>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                  <p className="text-[12px] text-slate-500">External: <span className="font-bold text-slate-900">Epoxy</span></p>
                  <p className="text-[12px] text-slate-500">Internal: <span className="font-bold text-slate-900">None</span></p>
                  <p className="text-[12px] text-slate-500">Primer: <span className="font-bold text-slate-900">Yes</span></p>
                  <p className="text-[12px] text-slate-500">Min Thickness: <span className="font-bold text-slate-900">3.0 mil</span></p>
                  <p className="text-[12px] text-slate-500">Standard: <span className="font-bold text-slate-900">SSPC-PA2</span></p>
                  <p className="text-[12px] text-slate-500">Spec: <span className="font-bold text-slate-900">ASTM D3359</span></p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-between pt-2">
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
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[30px] h-[30px] rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[14px] shadow-sm">
                  3
                </div>
                <h3 className="text-[17px] font-bold text-slate-900">Process Assignment</h3>
              </div>
              
              <div className="mb-6">
                <label className="block text-[13px] font-medium text-slate-700 mb-2">Apply Setup To</label>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white font-medium py-2.5 rounded-xl text-[13px] shadow-sm">All Parts</button>
                  <button className="flex-1 bg-white border border-slate-200 text-slate-600 font-medium py-2.5 rounded-xl text-[13px] hover:bg-slate-50 transition-colors">Selected Parts</button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[13px] font-medium text-slate-700 mb-2">Process Template</label>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center justify-between px-5 py-3 border border-blue-500 bg-blue-50/50 rounded-xl transition-colors">
                    <span className="text-[13px] font-bold text-blue-700">Standard Epoxy - Full Process</span>
                    <CheckCircle2 size={16} className="text-blue-600" />
                  </button>
                  <button className="flex items-center justify-between px-5 py-3 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-colors">
                    <span className="text-[13px] font-medium text-slate-700">Quick Coat - Polyester</span>
                  </button>
                  <button className="flex items-center justify-between px-5 py-3 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-colors">
                    <span className="text-[13px] font-medium text-slate-700">Heavy Duty - Industrial</span>
                  </button>
                  <button className="flex items-center justify-between px-5 py-3 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-colors">
                    <span className="text-[13px] font-medium text-slate-700">Custom Template</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 p-4 border border-slate-200 rounded-xl bg-white">
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900">Auto Assign Pipe IDs</h4>
                  <p className="text-[12px] text-slate-500 mt-0.5">System generates unique IDs for each pipe</p>
                </div>
                <div className="w-10 h-6 bg-blue-600 rounded-full flex items-center px-1 justify-end cursor-pointer shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
                <h4 className="text-[13px] font-bold text-slate-900 mb-3">Process Flow Preview</h4>
                <div className="flex flex-wrap items-center gap-y-2.5 gap-x-1.5">
                  {[
                    "Receiving", "Pipe Process Setup", "Pre-Sandblasting", "Sandblasting", 
                    "Primer", "Coating", "Oven", "DFT Measurement", "QC", 
                    "Supervisor Review", "Delivery"
                  ].map((step, index, arr) => (
                    <React.Fragment key={step}>
                      <div className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded">
                        {step}
                      </div>
                      {index < arr.length - 1 && (
                        <ArrowRight size={12} className="text-slate-300 mx-0.5" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-between pt-2">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  <ArrowRight size={16} className="mr-1.5 rotate-180" />
                  Back
                </button>
                <div className="flex gap-3">
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center">
                    <Save size={16} className="mr-1.5" />
                    Save Draft
                  </button>
                  <button 
                    onClick={() => setCurrentStep(4)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 px-6 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                  >
                    <CheckCircle2 size={16} className="mr-1.5" />
                    Apply to Parts
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-in zoom-in-95 duration-300 flex flex-col items-center justify-center py-16">
              <div className="w-[60px] h-[60px] rounded-full bg-emerald-50 flex items-center justify-center mb-5 border border-emerald-100">
                <CheckCircle2 size={32} className="text-emerald-500" strokeWidth={2.5} />
              </div>
              <h2 className="text-[20px] font-bold text-emerald-500 mb-2">Pipe Process Setup Saved!</h2>
              <p className="text-[14px] text-slate-500 font-medium text-center">Configuration applied to all selected parts.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
