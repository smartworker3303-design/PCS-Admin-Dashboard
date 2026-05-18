import React from "react";
import { X, Printer } from "lucide-react";
import QRCode from "react-qr-code";

interface PrintQRModalProps {
  ticket: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function PrintQRModal({ ticket, isOpen, onClose }: PrintQRModalProps) {
  if (!isOpen || !ticket) return null;

  // The unique payload for the QR code based dynamically on ticket data
  const qrData = JSON.stringify({
    id: ticket.id,
    customer: ticket.customer,
    branch: ticket.branch,
    type: ticket.paintType || "Epoxy",
    status: ticket.status
  });

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[380px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 pt-5 pb-3 flex items-start justify-between">
          <h2 className="text-[17px] font-bold text-slate-900">Print QR Badge</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 flex flex-col items-center">
          
          {/* Badge Container */}
          <div className="w-full border-[1.5px] border-blue-200 rounded-2xl p-6 flex flex-col items-center shadow-sm mb-5 bg-white">
            <div className="bg-white p-2 rounded-xl mb-3">
              <QRCode 
                value={qrData}
                size={140}
              />
            </div>
            
            <p className="text-[18px] font-bold text-blue-600 mb-0.5">{ticket.id}</p>
            <p className="text-[13px] font-bold text-slate-800 mb-0.5">{ticket.customer}</p>
            <p className="text-[11px] text-slate-500 font-medium mb-0.5">{ticket.branch} • {ticket.paintType || "Epoxy"}</p>
            <p className="text-[11px] text-slate-400 font-medium mb-3">{ticket.date}</p>
            
            <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${ticket.statusColor || 'bg-slate-100 text-slate-700'}`}>
              {ticket.status}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 text-center mb-6 px-2 leading-relaxed">
            QR code encodes ticket ID and job details for scanning at each process stage.
          </p>

          <div className="flex gap-3 w-full">
            <button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center shadow-sm"
            >
              <Printer size={16} className="mr-2" />
              Print Badge
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center shadow-sm"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
