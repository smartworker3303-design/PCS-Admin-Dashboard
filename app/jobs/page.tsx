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
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveTicket = (updatedTicket: any) => {
    setTicketsData(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
  };

  const getCompletionPercentage = (status: string) => {
    switch (status) {
      case "Completed": return 100;
      case "QC Check": return 90;
      case "In Progress": return 60;
      case "Active": return 35;
      case "Delayed": return 35;
      default: return 10;
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Jobs / Tickets Registry</h1>
          <p className="text-sm text-slate-500">{ticketsData.length} active tickets found</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
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
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors font-medium"
            placeholder="Search ticket ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex w-full sm:w-auto items-center gap-3 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          <button className="flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0 whitespace-nowrap">
            <Filter size={16} className="mr-2" />
            Advanced Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-100">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold flex items-center">
                  TICKET ID <ChevronDown size={14} className="ml-1 opacity-50" />
                </th>
                <th scope="col" className="px-6 py-4 font-bold">CUSTOMER</th>
                <th scope="col" className="px-6 py-4 font-bold">PARTS</th>
                <th scope="col" className="px-6 py-4 font-bold">STATUS</th>
                <th scope="col" className="px-6 py-4 font-bold text-center">PROJECT COMP. %</th>
                <th scope="col" className="px-6 py-4 font-bold">BRANCH</th>
                <th scope="col" className="px-6 py-4 font-bold">SUPERVISOR</th>
                <th scope="col" className="px-6 py-4 font-bold">DATE</th>
                <th scope="col" className="px-6 py-4 font-bold">AMOUNT</th>
                <th scope="col" className="px-6 py-4 font-bold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {ticketsData
                .filter(t => t.id.toLowerCase().includes(searchQuery.toLowerCase()) || t.customer.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((ticket, index) => {
                  const pct = getCompletionPercentage(ticket.status);
                  return (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-blue-600">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">
                        {ticket.customer}
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">
                        {ticket.parts}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${ticket.statusColor}`}>
                          {ticket.status}
                        </span>
                      </td>
                      
                      {/* Project Completion Progress Meter (Q15 feature implementation) */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                            <div 
                              className={`h-full rounded-full ${pct === 100 ? "bg-emerald-500" : "bg-blue-600"}`} 
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                          <span className="text-[11px] font-bold text-slate-600">
                            {pct}%
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-500 font-medium">
                        {ticket.branch}
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-semibold">
                        {ticket.supervisor}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {ticket.date}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {ticket.amount}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-3 text-slate-400">
                          <button className="hover:text-blue-600 p-1 hover:bg-slate-100 rounded transition-colors"><Eye size={16} /></button>
                          <button 
                            onClick={() => setEditingTicket(ticket)}
                            className="hover:text-blue-600 p-1 hover:bg-slate-100 rounded transition-colors"
                          >
                            <Pencil size={16} />
                          </button>
                          <button className="hover:text-blue-600 p-1 hover:bg-slate-100 rounded transition-colors"><GitBranch size={16} /></button>
                          <button className="hover:text-blue-600 p-1 hover:bg-slate-100 rounded transition-colors"><Maximize2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <div className="text-sm text-slate-505">
            Showing 1-{ticketsData.length} of {ticketsData.length} tickets
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-medium flex items-center justify-center text-sm">
              1
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
