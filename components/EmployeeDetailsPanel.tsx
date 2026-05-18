import React from "react";
import { X } from "lucide-react";

interface Employee {
  id: string;
  initials: string;
  name: string;
  role: string;
  branch: string;
  status: string;
  device: string;
  parts: string;
  shift: string;
}

interface EmployeeDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export default function EmployeeDetailsPanel({ isOpen, onClose, employee }: EmployeeDetailsPanelProps) {
  if (!isOpen || !employee) return null;

  // Extract numeric ID for formatting
  const numericId = employee.id.replace(/\D/g, '');
  const formattedId = `EMP-${numericId.padStart(4, '0')}`;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-[420px] bg-white shadow-2xl z-[210] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start border-b border-slate-100">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[16px] shrink-0">
              {employee.initials}
            </div>
            <div className="flex flex-col items-start gap-1">
              <h2 className="text-[18px] font-bold text-slate-900 leading-none">{employee.name}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                employee.role === "Supervisor" ? "bg-blue-50 text-blue-600" :
                employee.role === "QC Inspector" ? "bg-purple-50 text-purple-600" :
                "bg-slate-100 text-slate-600"
              }`}>
                {employee.role}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <span className="block text-[11px] font-medium text-slate-400 mb-1">Branch</span>
              <span className="block text-[13px] font-bold text-slate-900">{employee.branch}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <span className="block text-[11px] font-medium text-slate-400 mb-1">Device</span>
              <span className="block text-[13px] font-bold text-slate-900">{employee.device}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <span className="block text-[11px] font-medium text-slate-400 mb-1">Shift</span>
              <span className="block text-[13px] font-bold text-slate-900">{employee.shift}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <span className="block text-[11px] font-medium text-slate-400 mb-1">Parts Completed</span>
              <span className="block text-[13px] font-bold text-slate-900">{employee.parts}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <span className="block text-[11px] font-medium text-slate-400 mb-1">Status</span>
              <span className="block text-[13px] font-bold text-slate-900">{employee.status}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <span className="block text-[11px] font-medium text-slate-400 mb-1">Role</span>
              <span className="block text-[13px] font-bold text-slate-900">{employee.role}</span>
            </div>
          </div>

          {/* QR Badge Section */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col">
            <span className="block text-[14px] font-bold text-slate-900 mb-6">QR Badge Preview</span>
            <div className="flex flex-col items-center justify-center pb-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 mb-4">
                {/* Dynamically generating a REAL unique QR code based on the employee ID */}
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${formattedId}`} 
                  alt={`QR Code for ${employee.name}`} 
                  className="w-[100px] h-[100px]"
                />
              </div>
              <span className="text-[12px] font-medium text-slate-500">Employee ID: {formattedId}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-[14px] transition-colors shadow-sm">
            Print QR Badge
          </button>
        </div>

      </div>
    </>
  );
}
