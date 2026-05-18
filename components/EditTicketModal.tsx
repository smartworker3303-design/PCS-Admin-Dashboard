import React from "react";
import { X } from "lucide-react";

interface EditTicketModalProps {
  ticket: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditTicketModal({ ticket, isOpen, onClose }: EditTicketModalProps) {
  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[480px] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between bg-white z-10 sticky top-0">
          <div>
            <h2 className="text-[18px] font-bold text-slate-900 mb-2">Edit Ticket — {ticket.id}</h2>
            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${ticket.statusColor || 'bg-slate-100 text-slate-700'}`}>
              {ticket.status}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 overflow-y-auto no-scrollbar space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Customer</label>
            <input 
              type="text" 
              defaultValue={ticket.customer}
              className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Branch</label>
            <input 
              type="text" 
              defaultValue={ticket.branch}
              className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Supervisor</label>
            <input 
              type="text" 
              defaultValue={ticket.supervisor}
              className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Parts Count</label>
            <input 
              type="text" 
              defaultValue={ticket.parts ? ticket.parts.replace(' parts', '') : ''}
              className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Amount</label>
            <input 
              type="text" 
              defaultValue={ticket.amount}
              className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Paint Type</label>
            <input 
              type="text" 
              defaultValue=""
              className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Status</label>
            <input 
              type="text" 
              defaultValue=""
              className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-1.5">Notes</label>
            <textarea 
              rows={3}
              placeholder="Add internal notes..."
              className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
