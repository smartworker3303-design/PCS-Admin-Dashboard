import React from "react";
import { X, Play, Pencil, ArrowRight } from "lucide-react";

interface PipeProcessDetailsModalProps {
  record: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function PipeProcessDetailsModal({ record, isOpen, onClose }: PipeProcessDetailsModalProps) {
  if (!isOpen || !record) return null;

  const processFlow = [
    "Receiving", "Pre-Blast", "Sandblasting", "Primer",
    "Coating", "Oven", "DFT", "QC", "Delivery"
  ];

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
            <h2 className="text-[22px] font-bold text-slate-900 mb-1">{record.id}</h2>
            <p className="text-[13px] font-medium text-slate-500">
              Ticket: {record.ticket} - {record.customer}
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
        <div className="px-6 pb-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Row 1 */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
              <p className="text-[11px] font-semibold text-slate-400 mb-1">Pipe Size</p>
              <p className="text-[14px] font-bold text-slate-900">{record.pipeSize}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
              <p className="text-[11px] font-semibold text-slate-400 mb-1">Coating Type</p>
              <p className="text-[14px] font-bold text-slate-900">{record.coating}</p>
            </div>
            
            {/* Row 2 */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
              <p className="text-[11px] font-semibold text-slate-400 mb-1">Parts Count</p>
              <p className="text-[14px] font-bold text-slate-900">{record.parts}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
              <p className="text-[11px] font-semibold text-slate-400 mb-1">Branch</p>
              <p className="text-[14px] font-bold text-slate-900">{record.branch}</p>
            </div>

            {/* Row 3 */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
              <p className="text-[11px] font-semibold text-slate-400 mb-1">Status</p>
              <p className="text-[14px] font-bold text-slate-900">{record.status}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
              <p className="text-[11px] font-semibold text-slate-400 mb-1">Created</p>
              <p className="text-[14px] font-bold text-slate-900">{record.created}</p>
            </div>
          </div>

          {/* Process Flow */}
          <div className="bg-[#eff6ff] rounded-xl p-5 border border-blue-100 mt-2">
            <h3 className="text-[13px] font-bold text-blue-700 mb-3">Process Flow</h3>
            <div className="flex flex-wrap items-center gap-y-2.5 gap-x-1.5">
              {processFlow.map((step, index) => (
                <React.Fragment key={step}>
                  <div className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded">
                    {step}
                  </div>
                  {index < processFlow.length - 1 && (
                    <ArrowRight size={12} className="text-slate-400 mx-0.5" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-between items-center gap-4 mt-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
              <Play size={16} className="mr-2" />
              Preview Process Flow
            </button>
            <button className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
              <Pencil size={16} className="mr-2" />
              Edit Setup
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
