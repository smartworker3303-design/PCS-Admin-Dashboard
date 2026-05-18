"use client";

import React, { useState } from "react";
import { Search, Eye, Edit2, MapPin } from "lucide-react";
import CustomerDetailsPanel from "@/components/CustomerDetailsPanel";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewCustomer, setViewCustomer] = useState<any>(null);

  const customers = [
    { id: "C1", name: "ABC Steel Corp", location: "Houston", initials: "A", contact: "John Smith", phone: "+1 (713) 555-0142", email: "jsmith@abcsteel.com", jobs: 84, revenue: "$42,800", status: "Active" },
    { id: "C2", name: "Metro Fab LLC", location: "Dallas", initials: "M", contact: "Lisa Wang", phone: "+1 (214) 555-0238", email: "lwang@metrofab.com", jobs: 52, revenue: "$28,400", status: "Active" },
    { id: "C3", name: "Gulf Coast Ind.", location: "Houston", initials: "G", contact: "Mark Davis", phone: "+1 (713) 555-0374", email: "mdavis@gulfcoast.com", jobs: 38, revenue: "$19,200", status: "Active" },
    { id: "C4", name: "Lone Star Mfg", location: "Austin", initials: "L", contact: "Amy Chen", phone: "+1 (512) 555-0491", email: "achen@lonestar.com", jobs: 65, revenue: "$33,600", status: "Active" },
    { id: "C5", name: "Tex-Mex Metals", location: "San Antonio", initials: "T", contact: "Carlos Ruiz", phone: "+1 (210) 555-0156", email: "cruiz@texmex.com", jobs: 29, revenue: "$14,900", status: "Active" },
    { id: "C6", name: "Iron Works TX", location: "Houston", initials: "I", contact: "Bobby Lee", phone: "+1 (713) 555-0627", email: "blee@ironworks.com", jobs: 41, revenue: "$21,300", status: "Inactive" },
    { id: "C7", name: "Southern Steels", location: "Dallas", initials: "S", contact: "Jennifer Park", phone: "+1 (214) 555-0783", email: "jpark@southernsteel.com", jobs: 33, revenue: "$17,100", status: "Active" },
    { id: "C8", name: "Coastal Pipeline", location: "Houston", initials: "C", contact: "David Brown", phone: "+1 (713) 555-0899", email: "dbrown@coastal.com", jobs: 72, revenue: "$38,900", status: "Active" },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 leading-tight">Customer Management</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">8 registered customers</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center">
          <span className="mr-1.5 text-lg leading-none">+</span> Add Customer
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
          <span className="text-[32px] font-bold text-blue-600 leading-none mb-1">8</span>
          <span className="text-[13px] font-medium text-slate-500">Total Customers</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
          <span className="text-[32px] font-bold text-emerald-500 leading-none mb-1">7</span>
          <span className="text-[13px] font-medium text-slate-500">Active</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
          <span className="text-[32px] font-bold text-slate-400 leading-none mb-1">1</span>
          <span className="text-[13px] font-medium text-slate-500">Inactive</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
          <span className="text-[32px] font-bold text-amber-500 leading-none mb-1">$216K</span>
          <span className="text-[13px] font-medium text-slate-500">Total Revenue</span>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search customers..." 
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-full text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Jobs</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[13px] font-bold shrink-0">
                        {c.initials}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-slate-900">{c.name}</div>
                        <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin size={10} className="text-slate-400" strokeWidth={3} /> {c.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-medium text-slate-700">{c.contact}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{c.phone}</td>
                  <td className="px-6 py-4 text-[13px] text-slate-500">{c.email}</td>
                  <td className="px-6 py-4 text-[13px] font-bold text-slate-700">{c.jobs}</td>
                  <td className="px-6 py-4 text-[13px] font-bold text-slate-900">{c.revenue}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      c.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => setViewCustomer(c)}
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CustomerDetailsPanel 
        isOpen={!!viewCustomer} 
        onClose={() => setViewCustomer(null)} 
        customer={viewCustomer} 
      />

    </div>
  );
}
