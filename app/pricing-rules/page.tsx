"use client";

import React, { useState } from "react";
import { DollarSign, CheckCircle2, FileText, Edit2, Eye } from "lucide-react";
import ViewDashboardInvoiceModal from "@/components/ViewDashboardInvoiceModal";
import QuickBooksExportModal from "@/components/QuickBooksExportModal";

export default function PricingRulesPage() {
  const [activeTab, setActiveTab] = useState("pricing_tables");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [exportInvoice, setExportInvoice] = useState<any>(null);
  
  // Pricing states
  const [selectedCustomer, setSelectedCustomer] = useState("ABC Steel Corp");
  const [pricingCategory, setPricingCategory] = useState("tubing");

  const pipePricing = [
    { size: '2"', price: "$3.50", rush: "$5.25" },
    { size: '3"', price: "$4.25", rush: "$6.38" },
    { size: '4"', price: "$5.00", rush: "$7.50" },
    { size: '6"', price: "$7.50", rush: "$11.25" },
    { size: '8"', price: "$10.00", rush: "$15.00" },
    { size: '10"', price: "$12.00", rush: "$18.00" },
    { size: '12"', price: "$14.00", rush: "$21.00" },
    { size: '14"', price: "$16.50", rush: "$24.75" },
    { size: '16"', price: "$19.00", rush: "$28.50" },
    { size: '18"', price: "$22.00", rush: "$33.00" },
    { size: '20"', price: "$25.00", rush: "$37.50" },
    { size: '22"', price: "$28.00", rush: "$42.00" },
    { size: '24"', price: "$32.00", rush: "$48.00" },
  ];

  const fittingsPricing = [
    { size: '2"', price: "$15.00", rush: "$22.50" },
    { size: '3"', price: "$18.50", rush: "$27.75" },
    { size: '4"', price: "$22.00", rush: "$33.00" },
    { size: '6"', price: "$30.00", rush: "$45.00" },
    { size: '8"', price: "$40.00", rush: "$60.00" },
    { size: '10"', price: "$55.00", rush: "$82.50" },
    { size: '12"', price: "$70.00", rush: "$105.00" },
    { size: '14"+', price: "$95.00", rush: "$142.50" },
  ];

  const flangesPricing = [
    { size: '2"', price: "$25.00", rush: "$37.50" },
    { size: '3"', price: "$32.00", rush: "$48.00" },
    { size: '4"', price: "$45.00", rush: "$67.50" },
    { size: '6"', price: "$60.00", rush: "$90.00" },
    { size: '8"', price: "$80.00", rush: "$120.00" },
    { size: '10"', price: "$110.00", rush: "$165.00" },
    { size: '12"', price: "$140.00", rush: "$210.00" },
    { size: '14"+', price: "$180.00", rush: "$270.00" },
  ];

  const laborPricing = [
    { service: "Grinding & Prep", rate: "$28.00 / hr", unit: "Per Worker Hour" },
    { service: "Sandblasting Labor", rate: "$45.00 / hr", unit: "Per Hour" },
    { service: "Custom Masking", rate: "$35.00 / hr", unit: "Per Hour" },
    { service: "DFT & Quality Inspection", rate: "$50.00 / hr", unit: "Per Hour" },
    { service: "Propane Heating Surcharge", rate: "$75.00 / run", unit: "Per Oven Cycle" },
  ];

  const customersList = [
    "ABC Steel Corp", "Metro Fab LLC", "Gulf Coast Ind.", "Lone Star Mfg", 
    "Tex-Mex Metals", "Iron Works TX", "Southern Steels", "Coastal Pipeline"
  ];

  const invoicesData = [
    { id: "INV-2026-0284", ticket: "TK-2847", customer: "ABC Steel Corp", amount: "$1,240", status: "Paid", date: "Apr 21, 2026", due: "May 01, 2026" },
    { id: "INV-2026-0283", ticket: "TK-2845", customer: "Gulf Coast Ind.", amount: "$980", status: "Pending", date: "Apr 20, 2026", due: "Apr 30, 2026" },
    { id: "INV-2026-0282", ticket: "TK-2844", customer: "Lone Star Mfg", amount: "$2,860", status: "Overdue", date: "Apr 10, 2026", due: "Apr 20, 2026" },
    { id: "INV-2026-0281", ticket: "TK-2843", customer: "Tex-Mex Metals", amount: "$480", status: "Paid", date: "Apr 19, 2026", due: "Apr 29, 2026" },
    { id: "INV-2026-0280", ticket: "TK-2842", customer: "Iron Works TX", amount: "$1,950", status: "Pending", date: "Apr 18, 2026", due: "Apr 28, 2026" },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-slate-900">Pricing & Invoicing</h1>
        <p className="text-[14px] text-slate-500 mt-0.5">Customer-specific pricing and invoice management</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
            <DollarSign size={16} className="text-amber-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">$4,530</div>
            <div className="text-[12px] font-medium text-slate-400">Total Pending</div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-[#d1fae5] flex items-center justify-center">
            <CheckCircle2 size={16} className="text-emerald-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">$38,200</div>
            <div className="text-[12px] font-medium text-slate-400">Paid This Month</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <FileText size={16} className="text-red-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">$2,860</div>
            <div className="text-[12px] font-medium text-slate-400">Overdue</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <FileText size={16} className="text-blue-500" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[22px] font-bold text-slate-900 leading-none mb-1">5</div>
            <div className="text-[12px] font-medium text-slate-400">Total Invoices</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-xl inline-flex mb-8">
        <button 
          onClick={() => setActiveTab("pricing_tables")}
          className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all ${
            activeTab === "pricing_tables" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Pricing Tables
        </button>
        <button 
          onClick={() => setActiveTab("invoice_dashboard")}
          className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all ${
            activeTab === "invoice_dashboard" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Invoice Dashboard
        </button>
      </div>

      {activeTab === "pricing_tables" && (
        <div className="animate-in fade-in duration-300">
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-bold text-slate-700">Customer:</span>
              <select 
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-1.5 text-[13px] text-slate-700 font-bold focus:outline-none focus:border-blue-500 bg-white shadow-sm min-w-[180px]"
              >
                {customersList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Sub Tabs for Pricing Categories */}
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1 border border-slate-200/50">
              {[
                { id: "tubing", label: "Tubing (ft)" },
                { id: "fittings", label: "Fittings (ea)" },
                { id: "flanges", label: "Flanges (ea)" },
                { id: "labor", label: "Labor & Service" }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setPricingCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                    pricingCategory === cat.id 
                      ? "bg-white text-blue-600 shadow-sm border-transparent" 
                      : "text-slate-500 hover:text-slate-750"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <button className="flex items-center px-4 py-2 border border-slate-200 rounded-full text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm self-end sm:self-auto">
              <Edit2 size={14} className="mr-2 text-slate-500" />
              Edit Pricing Sheet
            </button>
          </div>

          {/* Dynamic Pricing Table Card */}
          {pricingCategory === "tubing" && (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-6 animate-in fade-in duration-200">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
                <h2 className="text-[15px] font-bold text-slate-900">Tubing / Pipe Diameter Coating Rates ({selectedCustomer})</h2>
                <span className="text-[12px] text-slate-400 font-semibold">Rush multiplier: 1.5x</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pipe Size (Diameter)</th>
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Price Per Foot (Standard)</th>
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rush Price (x1.5 Surcharge)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {pipePricing.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{item.size}</td>
                        <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{item.price}</td>
                        <td className="py-4 px-6 text-[13px] font-bold text-orange-500">{item.rush}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {pricingCategory === "fittings" && (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-6 animate-in fade-in duration-200">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
                <h2 className="text-[15px] font-bold text-slate-900">Fittings Coating Rates ({selectedCustomer})</h2>
                <span className="text-[12px] text-slate-400 font-semibold">Tee, 90°, 45°, Reducers, Caps</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fitting Size (Diameter)</th>
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Price Per Piece (Standard)</th>
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rush Price (x1.5)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {fittingsPricing.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{item.size}</td>
                        <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{item.price}</td>
                        <td className="py-4 px-6 text-[13px] font-bold text-orange-500">{item.rush}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {pricingCategory === "flanges" && (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-6 animate-in fade-in duration-200">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
                <h2 className="text-[15px] font-bold text-slate-900">Flanges Coating Rates ({selectedCustomer})</h2>
                <span className="text-[12px] text-slate-400 font-semibold">Series #150 / #300 baseline</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Flange Size</th>
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Price Per Piece (Standard)</th>
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rush Price (x1.5)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {flangesPricing.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{item.size}</td>
                        <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{item.price}</td>
                        <td className="py-4 px-6 text-[13px] font-bold text-orange-500">{item.rush}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {pricingCategory === "labor" && (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-6 animate-in fade-in duration-200">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
                <h2 className="text-[15px] font-bold text-slate-900">Labor, Masking & Extra Services</h2>
                <span className="text-[12px] text-slate-400 font-semibold">Side billing & secondary billing items</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Service / Task Name</th>
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rate</th>
                      <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Unit of Measure</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {laborPricing.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{item.service}</td>
                        <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{item.rate}</td>
                        <td className="py-4 px-6 text-[13px] text-slate-500">{item.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <span className="block text-[12px] font-medium text-slate-400 mb-1">Standard Series Markup</span>
              <span className="block text-[18px] font-bold text-slate-900">+25% for Series 600+</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <span className="block text-[12px] font-medium text-slate-400 mb-1">Oven Running Cost</span>
              <span className="block text-[18px] font-bold text-slate-900">$75.00 / oven run</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <span className="block text-[12px] font-medium text-slate-400 mb-1">Minimum Order Threshold</span>
              <span className="block text-[18px] font-bold text-slate-900">$250.00</span>
            </div>
          </div>

        </div>
      )}

      {activeTab === "invoice_dashboard" && (
        <div className="animate-in fade-in duration-300">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Invoice #</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ticket</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Invoice Date</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Due Date</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {invoicesData.map((invoice, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 text-[13px] font-bold text-blue-600">{invoice.id}</td>
                      <td className="py-4 px-6 text-[13px] text-slate-500">{invoice.ticket}</td>
                      <td className="py-4 px-6 text-[13px] text-slate-700">{invoice.customer}</td>
                      <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{invoice.amount}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          invoice.status === "Paid" ? "bg-[#d1fae5] text-emerald-600" :
                          invoice.status === "Pending" ? "bg-[#fef9c3] text-amber-600" :
                          "bg-[#fee2e2] text-red-600"
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[13px] text-slate-500">{invoice.date}</td>
                      <td className="py-4 px-6 text-[13px] text-slate-500">{invoice.due}</td>
                      <td className="py-4 px-6 flex justify-end gap-2">
                        <button 
                          onClick={() => setSelectedInvoice(invoice)}
                          className="flex items-center px-3 py-1.5 border border-slate-200 rounded-full text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                          <Eye size={12} className="mr-1.5 text-slate-400" />
                          View
                        </button>
                        <button 
                          onClick={() => setExportInvoice(invoice)}
                          className="flex items-center px-3 py-1.5 border border-emerald-200 rounded-full text-[11px] font-bold text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm"
                        >
                          QB Export
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <ViewDashboardInvoiceModal 
        isOpen={!!selectedInvoice} 
        onClose={() => setSelectedInvoice(null)} 
        invoice={selectedInvoice} 
        onExport={(inv) => {
          setSelectedInvoice(null);
          setExportInvoice(inv);
        }}
      />

      <QuickBooksExportModal 
        isOpen={!!exportInvoice} 
        onClose={() => setExportInvoice(null)} 
        invoice={exportInvoice} 
      />

    </div>
  );
}
