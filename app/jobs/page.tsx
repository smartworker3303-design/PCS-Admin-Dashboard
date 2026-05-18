"use client";

import React, { useState } from "react";
import NewTicketModal from "@/components/NewTicketModal";
import TicketDetailsModal from "@/components/TicketDetailsModal";
import { 
  Search, 
  Download, 
  Plus, 
  Filter, 
  Eye, 
  Pencil, 
  GitBranch, 
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from "lucide-react";

const tickets = [
  { id: "TK-2847", customer: "ABC Steel Corp", parts: "24 parts", status: "Completed", statusColor: "bg-emerald-100 text-emerald-700", branch: "Houston", supervisor: "Mike Torres", date: "Apr 21, 2026", amount: "$1,240" },
  { id: "TK-2846", customer: "Metro Fab LLC", parts: "8 parts", status: "In Progress", statusColor: "bg-blue-100 text-blue-700", branch: "Dallas", supervisor: "Sara Kim", date: "Apr 21, 2026", amount: "$620" },
  { id: "TK-2845", customer: "Gulf Coast Ind.", parts: "15 parts", status: "Delayed", statusColor: "bg-red-100 text-red-700", branch: "Houston", supervisor: "James Rowe", date: "Apr 20, 2026", amount: "$980" },
  { id: "TK-2844", customer: "Lone Star Mfg", parts: "42 parts", status: "Active", statusColor: "bg-indigo-100 text-indigo-700", branch: "Austin", supervisor: "Elena Cruz", date: "Apr 20, 2026", amount: "$2,860" },
  { id: "TK-2843", customer: "Tex-Mex Metals", parts: "6 parts", status: "QC Check", statusColor: "bg-amber-100 text-amber-700", branch: "San Antonio", supervisor: "Paul Adams", date: "Apr 20, 2026", amount: "$480" },
  { id: "TK-2842", customer: "Iron Works TX", parts: "33 parts", status: "Active", statusColor: "bg-indigo-100 text-indigo-700", branch: "Houston", supervisor: "Mike Torres", date: "Apr 19, 2026", amount: "$1,950" },
  { id: "TK-2841", customer: "Southern Steels", parts: "18 parts", status: "Delayed", statusColor: "bg-red-100 text-red-700", branch: "Dallas", supervisor: "Sara Kim", date: "Apr 19, 2026", amount: "$1,120" },
  { id: "TK-2840", customer: "Coastal Pipeline", parts: "56 parts", status: "Completed", statusColor: "bg-emerald-100 text-emerald-700", branch: "Houston", supervisor: "Mike Torres", date: "Apr 18, 2026", amount: "$3,480" },
];

export default function JobsTickets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<any>(null);
  const [ticketsData, setTicketsData] = useState(tickets);

  const handleSaveTicket = (updatedTicket: any) => {
    setTicketsData(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Jobs / Tickets</h1>
          <p className="text-sm text-slate-500">12 tickets found</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
          >
            <Plus size={16} className="mr-2" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            placeholder="Search ticket ID or customer..."
          />
        </div>
        
        <div className="flex w-full sm:w-auto items-center gap-3 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          <div className="h-9 w-24 sm:w-28 border border-slate-200 rounded-lg bg-slate-50 shrink-0"></div>
          <div className="h-9 w-24 sm:w-28 border border-slate-200 rounded-lg bg-slate-50 shrink-0"></div>
          <div className="h-9 w-24 sm:w-28 border border-slate-200 rounded-lg bg-slate-50 shrink-0"></div>
          
          <button className="flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0 whitespace-nowrap">
            <Filter size={16} className="mr-2" />
            Advanced
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-100">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium flex items-center">
                  TICKET ID <ChevronDown size={14} className="ml-1 opacity-50" />
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  CUSTOMER <ChevronDown size={14} className="ml-1 opacity-50 inline" />
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  PARTS <ChevronDown size={14} className="ml-1 opacity-50 inline" />
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  STATUS <ChevronDown size={14} className="ml-1 opacity-50 inline" />
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  BRANCH <ChevronDown size={14} className="ml-1 opacity-50 inline" />
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  SUPERVISOR <ChevronDown size={14} className="ml-1 opacity-50 inline" />
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  DATE <ChevronDown size={14} className="ml-1 opacity-50 inline" />
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  AMOUNT <ChevronDown size={14} className="ml-1 opacity-50 inline" />
                </th>
                <th scope="col" className="px-6 py-4 font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ticketsData.map((ticket, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-blue-600">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {ticket.customer}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {ticket.parts}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${ticket.statusColor}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {ticket.branch}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {ticket.supervisor}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {ticket.date}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {ticket.amount}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 text-slate-400">
                      <button className="hover:text-blue-600 transition-colors"><Eye size={16} /></button>
                      <button 
                        onClick={() => setEditingTicket(ticket)}
                        className="hover:text-blue-600 transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button className="hover:text-blue-600 transition-colors"><GitBranch size={16} /></button>
                      <button className="hover:text-blue-600 transition-colors"><Maximize2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <div className="text-sm text-slate-500">
            Showing 1-8 of 12 tickets
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-medium flex items-center justify-center text-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 font-medium flex items-center justify-center text-sm transition-colors">
              2
            </button>
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <NewTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <TicketDetailsModal 
        ticket={editingTicket} 
        isOpen={!!editingTicket} 
        onClose={() => setEditingTicket(null)} 
        onSave={handleSaveTicket} 
      />
    </div>
  );
}
