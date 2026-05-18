import React, { useState } from "react";
import { X, GripVertical, Save } from "lucide-react";

interface EditTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
}

export default function EditTemplateModal({ isOpen, onClose, template }: EditTemplateModalProps) {
  if (!isOpen || !template) return null;

  const [steps, setSteps] = useState([
    { id: 1, name: "Receiving", fields: ["Photo", "Notes"] },
    { id: 2, name: "Blasting", fields: ["Photo", "Numeric"] },
    { id: 3, name: "Coating", fields: ["Photo", "Numeric", "Signature"] },
  ]);

  const availableFields = ["Photo", "Numeric", "Signature", "Checkbox", "Notes"];

  const toggleField = (stepId: number, field: string) => {
    setSteps(steps.map(step => {
      if (step.id === stepId) {
        const isSelected = step.fields.includes(field);
        return {
          ...step,
          fields: isSelected ? step.fields.filter(f => f !== field) : [...step.fields, field]
        };
      }
      return step;
    }));
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-[700px] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between bg-white z-10 sticky top-0">
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 mb-1">Edit Template</h2>
            <p className="text-[13px] font-medium text-slate-500">
              {template.title}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-2 overflow-y-auto no-scrollbar flex flex-col gap-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1.5">Template Name</label>
              <input 
                type="text" 
                defaultValue={template.title}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-800 mb-1.5">Paint Type</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-slate-900">Process Steps</h3>
              <button className="text-blue-600 text-[13px] font-bold hover:text-blue-700 transition-colors flex items-center">
                <span className="mr-1 text-lg leading-none">+</span> Add Step
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {steps.map((step, index) => (
                <div key={step.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <GripVertical size={16} className="text-slate-300 cursor-grab" />
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                      {index + 1}
                    </div>
                    <input 
                      type="text" 
                      defaultValue={step.name}
                      className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 transition-colors bg-white font-medium text-slate-700"
                    />
                    <button className="text-slate-400 hover:text-red-500 transition-colors p-1">
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex items-center pl-10">
                    <span className="text-[11px] font-medium text-slate-400 mr-3">Required Fields:</span>
                    <div className="flex flex-wrap gap-2">
                      {availableFields.map(field => {
                        const isSelected = step.fields.includes(field);
                        return (
                          <button
                            key={field}
                            onClick={() => toggleField(step.id, field)}
                            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                              isSelected 
                                ? 'bg-blue-600 text-white border border-blue-600' 
                                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {field}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-5 flex gap-3 mt-2">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
            <Save size={16} className="mr-2" />
            Save Template
          </button>
        </div>

      </div>
    </div>
  );
}
