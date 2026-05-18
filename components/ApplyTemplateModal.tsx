import React, { useState } from "react";
import { X, Check, ArrowRight, ArrowLeft, CheckCircle2, Play } from "lucide-react";

interface ApplyTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
}

export default function ApplyTemplateModal({ isOpen, onClose, template }: ApplyTemplateModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-[550px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between bg-white z-10">
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 mb-1">Apply Template</h2>
            <p className="text-[13px] font-medium text-slate-500">
              {template.title}
            </p>
          </div>
          <button 
            onClick={() => {
              onClose();
              setTimeout(() => setCurrentStep(1), 200); // reset after closing
            }}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check size={12} className="text-white" strokeWidth={3} />
            </div>
            <span className={`text-[12px] font-bold ${currentStep === 1 ? 'text-slate-800' : 'text-slate-400'}`}>Select Ticket</span>
          </div>
          <div className="h-px bg-slate-200 flex-1 mx-4"></div>
          <div className="flex items-center gap-2">
            {currentStep >= 2 ? (
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-bold">2</div>
            )}
            <span className={`text-[12px] font-bold ${currentStep === 2 ? 'text-slate-800' : 'text-slate-400'}`}>Configure</span>
          </div>
          <div className="h-px bg-slate-200 flex-1 mx-4"></div>
          <div className="flex items-center gap-2">
            {currentStep >= 3 ? (
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-bold">3</div>
            )}
            <span className={`text-[12px] font-bold ${currentStep === 3 ? 'text-slate-800' : 'text-slate-400'}`}>Confirm</span>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4 flex flex-col gap-4 min-h-[220px]">
          {currentStep === 1 && (
            <div className="animate-in fade-in duration-300">
              <label className="block text-[13px] font-bold text-slate-800 mb-2">Select Ticket to Apply Template To</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors mb-4"
              />

              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-[12px] font-bold text-blue-600 mb-1.5">Template: {template.title}</p>
                <p className="text-[12px] text-blue-600/80 leading-relaxed">
                  {template.stepsCount} steps · {template.subtitle} · {template.description}
                </p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-in fade-in duration-300 flex flex-col gap-4">
              <h3 className="text-[14px] font-bold text-slate-800 mb-1">Configure Template Options</h3>
              
              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Assigned Supervisor</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Target Branch</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-2">Priority</label>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 rounded-xl border border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    Normal
                  </button>
                  <button className="flex-1 py-2 rounded-xl border border-amber-400 text-[12px] font-bold text-amber-500 hover:bg-amber-50 transition-colors">
                    High
                  </button>
                  <button className="flex-1 py-2 rounded-xl border border-red-400 text-[12px] font-bold text-red-500 hover:bg-red-50 transition-colors">
                    Rush
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-in fade-in duration-300 flex flex-col gap-5 mt-1">
              <div className="bg-emerald-50 rounded-xl p-5 flex flex-col items-center text-center">
                <CheckCircle2 size={32} className="text-emerald-500 mb-3" />
                <h3 className="text-[15px] font-bold text-emerald-700 mb-1.5">Ready to Apply Template</h3>
                <p className="text-[12px] text-emerald-600/80 leading-relaxed px-4">
                  Template "{template.title}" will be applied to the selected ticket with {template.stepsCount} process steps.
                </p>
              </div>

              <div className="flex flex-col gap-4 px-2 mt-2">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-500 font-medium">Template</span>
                  <span className="text-slate-900 font-bold">{template.title}</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-500 font-medium">Steps</span>
                  <span className="text-slate-900 font-bold">{template.stepsCount}</span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-slate-500 font-medium">Paint Type</span>
                  <span className="text-slate-900 font-bold">{template.subtitle}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 flex gap-3">
          {currentStep > 1 && (
            <button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center whitespace-nowrap"
            >
              <ArrowLeft size={16} className="mr-1.5" /> Back
            </button>
          )}
          
          {currentStep < 3 ? (
            <button 
              onClick={() => setCurrentStep(prev => Math.min(prev + 1, 3))}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center"
            >
              Next <ArrowRight size={16} className="ml-1.5" />
            </button>
          ) : (
            <button 
              onClick={() => {
                onClose();
                setTimeout(() => setCurrentStep(1), 200); // reset after closing
              }}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center"
            >
              <Play size={16} className="mr-2" fill="currentColor" /> Apply Template
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
