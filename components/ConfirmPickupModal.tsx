import React from "react";
import { X, Truck, Check } from "lucide-react";

interface PickupRecord {
  pickupId: string;
  ticket: string;
  customer: string;
  parts: string;
  ready: string;
  driver: string;
  status: string;
  date: string;
}

interface ConfirmPickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PickupRecord | null;
}

export default function ConfirmPickupModal({ isOpen, onClose, record }: ConfirmPickupModalProps) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[480px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-7 py-5 flex items-center justify-between border-b border-slate-100 bg-white z-10 sticky top-0">
          <h2 className="text-[18px] font-bold text-slate-900">Confirm Pickup</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
              <div className="text-[11px] text-slate-500 mb-0.5 font-medium">Ticket</div>
              <div className="text-[13px] font-bold text-slate-900">{record.ticket}</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
              <div className="text-[11px] text-slate-500 mb-0.5 font-medium">Customer</div>
              <div className="text-[13px] font-bold text-slate-900">{record.customer}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
              <div className="text-[11px] text-slate-500 mb-0.5 font-medium">Parts</div>
              <div className="text-[13px] font-bold text-slate-900">{record.parts}</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
              <div className="text-[11px] text-slate-500 mb-0.5 font-medium">Driver</div>
              <div className="text-[13px] font-bold text-slate-900">{record.driver}</div>
            </div>
          </div>

          <div className="mt-2">
            <label className="block text-[12px] font-medium text-slate-700 mb-2">Shipment Photo</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center justify-center py-8 gap-3">
              <Truck size={24} className="text-slate-300" />
              <span className="text-[12px] text-slate-400 font-medium">Upload pickup photo confirmation</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-7 py-6 flex gap-3 mt-1 bg-white">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center"
          >
            Cancel
          </button>
          <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl text-[13px] transition-colors shadow-sm flex items-center justify-center">
            <Check size={16} className="mr-1.5" />
            Confirm Pickup
          </button>
        </div>

      </div>
    </div>
  );
}
