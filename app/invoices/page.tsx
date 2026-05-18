"use client";

import React, { useState } from "react";
import { CheckCircle2, DollarSign, AlertTriangle, FileText, Eye } from "lucide-react";
import ViewInvoiceModal from "@/components/ViewInvoiceModal";
import QuickBooksExportModal from "@/components/QuickBooksExportModal";
import CreateInvoiceModal from "@/components/CreateInvoiceModal";

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [selectedQBInvoice, setSelectedQBInvoice] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 mb-1">Invoice Management</h1>
          <p className="text-[14px] text-slate-500">Create, review, adjust, and export invoices</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors shadow-sm flex items-center"
          >
            <span className="mr-1.5 text-lg leading-none">+</span> Create Invoice
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-500" />
            </div>
            <span className="text-2xl font-bold text-slate-900">$1,720</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500">Paid This Month</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
              <DollarSign size={20} className="text-amber-500" />
            </div>
            <span className="text-2xl font-bold text-slate-900">$2,930</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500">Pending</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <span className="text-2xl font-bold text-slate-900">$2,860</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500">Overdue</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <FileText size={20} className="text-blue-500" />
            </div>
            <span className="text-2xl font-bold text-slate-900">5</span>
          </div>
          <p className="text-[13px] font-medium text-slate-500">Total Invoices</p>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-50/80 rounded-2xl p-4 mb-6 flex items-center justify-between border border-red-100">
        <div className="flex items-center gap-3">
          <AlertTriangle size={18} className="text-red-500" />
          <span className="text-[13px] font-bold text-red-600">
            1 overdue invoice(s) — $2,860 outstanding
          </span>
        </div>
        <button className="bg-[#ff3b3b] hover:bg-[#e03131] text-white px-5 py-2 rounded-full text-[13px] font-bold transition-colors shadow-sm">
          Send Reminders
        </button>
      </div>

      {/* Tabs */}
      <div className="flex mb-6">
        <div className="bg-slate-50/80 p-1.5 rounded-2xl inline-flex gap-1 border border-slate-100">
          <button 
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all ${
              activeTab === "all" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab("paid")}
            className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all ${
              activeTab === "paid" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            Paid
          </button>
          <button 
            onClick={() => setActiveTab("pending")}
            className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all ${
              activeTab === "pending" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setActiveTab("overdue")}
            className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all ${
              activeTab === "overdue" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
            }`}
          >
            Overdue
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">INVOICE #</th>
              <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TICKET</th>
              <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">CUSTOMER</th>
              <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">PO #</th>
              <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">COATING</th>
              <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">AMOUNT</th>
              <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TAX</th>
              <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL</th>
              <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">STATUS</th>
              <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">DUE DATE</th>
              <th className="px-4 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { id: "INV-2026-0284", ticket: "TK-2847", customer: "ABC Steel Corp", po: "PO-2026-041", coating: "Epoxy", amount: "$1240.00", tax: "$95.83", total: "$1335.83", status: "Paid", due: "May 01, 2026" },
              { id: "INV-2026-0283", ticket: "TK-2845", customer: "Gulf Coast Ind.", po: "PO-2026-039", coating: "Hybrid", amount: "$880.00", tax: "$75.83", total: "$1055.83", status: "Pending", due: "Apr 30, 2026" },
              { id: "INV-2026-0282", ticket: "TK-2844", customer: "Lone Star Mfg", po: "PO-2026-038", coating: "Epoxy", amount: "$2860.00", tax: "$220.83", total: "$3080.83", status: "Overdue", due: "Apr 20, 2026" },
              { id: "INV-2026-0281", ticket: "TK-2843", customer: "Tex-Mex Metals", po: "PO-2026-037", coating: "Polyester", amount: "$480.00", tax: "$36.83", total: "$516.83", status: "Paid", due: "Apr 29, 2026" },
              { id: "INV-2026-0280", ticket: "TK-2842", customer: "Iron Works TX", po: "PO-2026-036", coating: "Epoxy", amount: "$1950.00", tax: "$150.83", total: "$2100.83", status: "Pending", due: "Apr 28, 2026" },
            ]
            .filter(row => activeTab === "all" || row.status.toLowerCase() === activeTab)
            .map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-4 text-[13px] font-bold text-blue-600">{row.id}</td>
                <td className="px-4 py-4 text-[13px] text-slate-500">{row.ticket}</td>
                <td className="px-4 py-4 text-[13px] font-bold text-slate-700">{row.customer}</td>
                <td className="px-4 py-4 text-[13px] text-slate-500">{row.po}</td>
                <td className="px-4 py-4 text-[13px] text-slate-500">{row.coating}</td>
                <td className="px-4 py-4 text-[13px] text-slate-500">{row.amount}</td>
                <td className="px-4 py-4 text-[13px] text-slate-500">{row.tax}</td>
                <td className="px-4 py-4 text-[13px] font-bold text-slate-900">{row.total}</td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    row.status === "Paid" ? "bg-emerald-100/80 text-emerald-600" :
                    row.status === "Pending" ? "bg-amber-100/80 text-amber-600" :
                    "bg-red-100/80 text-red-600"
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-[13px] text-slate-500">{row.due}</td>
                <td className="px-4 py-4 flex items-center justify-center gap-3">
                  <button 
                    onClick={() => setSelectedInvoice(row)}
                    className="text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => setSelectedQBInvoice(row)}
                    className="text-[11px] font-bold text-slate-400 hover:text-green-600 transition-colors"
                  >
                    QB
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ViewInvoiceModal 
        isOpen={!!selectedInvoice} 
        onClose={() => setSelectedInvoice(null)} 
        invoice={selectedInvoice} 
      />

      <QuickBooksExportModal 
        isOpen={!!selectedQBInvoice} 
        onClose={() => setSelectedQBInvoice(null)} 
        invoice={selectedQBInvoice} 
      />

      <CreateInvoiceModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
      />

    </div>
  );
}
