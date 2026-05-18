import React from "react";
import { X, Upload, AlertTriangle } from "lucide-react";

interface UploadCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: any;
}

export default function UploadCertificateModal({ isOpen, onClose, tool }: UploadCertificateModalProps) {
  if (!isOpen || !tool) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[480px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start bg-white z-10 sticky top-0 border-b border-slate-50">
          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold text-slate-900 leading-tight mb-0.5">Upload Certificate</h2>
            <p className="text-[12px] text-slate-500 font-medium">{tool.id} &middot; {tool.code.split("·")[1]?.trim() || tool.code}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5 overflow-y-auto max-h-[80vh] no-scrollbar">
          
          {/* Dropzone */}
          <div className="border-2 border-dashed border-[#dbeafe] rounded-[20px] p-8 flex flex-col items-center justify-center bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 shadow-sm">
              <Upload size={20} className="text-blue-500" strokeWidth={2.5} />
            </div>
            <h3 className="text-[15px] font-bold text-slate-900 mb-1">Drop certificate file here</h3>
            <p className="text-[12px] font-medium text-slate-400 mb-5">PDF, JPG, PNG — max 10MB</p>
            <button className="px-5 py-2 rounded-full border border-slate-200 text-slate-700 font-bold text-[12px] hover:bg-slate-50 transition-colors bg-white shadow-sm">
              Browse Files
            </button>
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-1">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Certificate Number</label>
              <input 
                type="text" 
                placeholder="CAL-2026-XXXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 shadow-sm"
              />
            </div>
            
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Issue Date</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Expiry Date</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Issued By</label>
              <input 
                type="text" 
                placeholder="Lab / company name"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 shadow-sm"
              />
            </div>
          </div>

          {/* Alert */}
          <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-100 flex items-center gap-2.5 shadow-sm mt-1">
            <AlertTriangle size={16} className="text-amber-500 shrink-0" strokeWidth={2.5} />
            <span className="text-[12px] font-bold text-amber-600">
              Uploading will replace existing file: CAL-DFT001-2026.pdf
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-100 flex gap-4 bg-white sticky bottom-0 z-10">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center">
            <Upload size={16} className="mr-2" strokeWidth={2.5} />
            Upload Certificate
          </button>
        </div>

      </div>
    </div>
  );
}
