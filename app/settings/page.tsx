"use client";

import React, { useState } from "react";
import { 
  Save, 
  Globe, 
  Shield, 
  Users, 
  Plug,
  Check,
  Minus,
  Briefcase,
  Mail,
  Smartphone
} from "lucide-react";

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState("General");

  const tabs = [
    { name: "General", icon: Globe },
    { name: "Security", icon: Shield },
    { name: "Roles & Permissions", icon: Users },
    { name: "Integrations", icon: Plug },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 leading-tight">System Settings</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">Configure global system preferences and permissions</p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2">
          <Save size={16} strokeWidth={2.5} /> Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-xl inline-flex mb-6 border border-slate-100 shadow-sm overflow-x-auto max-w-full">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-5 py-2 rounded-lg text-[13px] font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.name
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            <tab.icon size={16} strokeWidth={2.5} />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "General" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Company Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-slate-900 mb-6">Company Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Company Name</label>
                <input 
                  type="text" 
                  defaultValue="Powder Coating Solutions"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Industry</label>
                <input 
                  type="text" 
                  defaultValue="Industrial Manufacturing"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Primary Phone</label>
                <input 
                  type="tel" 
                  defaultValue="+1 (713) 555-0000"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Primary Email</label>
                <input 
                  type="email" 
                  defaultValue="admin@pcsolutions.com"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Website</label>
                <input 
                  type="url" 
                  defaultValue="www.pcsolutions.com"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Tax ID</label>
                <input 
                  type="text" 
                  defaultValue="XX-XXXXXXX"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Language & Regional */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-slate-900 mb-6">Language & Regional</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Language</label>
                <select className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white shadow-sm appearance-none">
                  <option></option>
                  <option value="en">English (US)</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Timezone</label>
                <select className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white shadow-sm appearance-none">
                  <option></option>
                  <option value="CST">Central Time (US & Canada)</option>
                  <option value="EST">Eastern Time (US & Canada)</option>
                  <option value="PST">Pacific Time (US & Canada)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Currency</label>
                <select className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white shadow-sm appearance-none">
                  <option></option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Date Format</label>
                <select className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white shadow-sm appearance-none">
                  <option></option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      )}
      
      {activeTab === "Security" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Authentication */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-slate-900 mb-6">Authentication</h2>
            
            <div className="divide-y divide-slate-100">
              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div>
                  <div className="text-[14px] font-semibold text-slate-900">Two-Factor Authentication</div>
                  <div className="text-[13px] text-slate-500 mt-0.5">Require 2FA for all admin users</div>
                </div>
                {/* Toggle */}
                <button className="w-[44px] h-[24px] rounded-full relative transition-colors bg-blue-600">
                  <span className="absolute top-1/2 -translate-y-1/2 w-[20px] h-[20px] bg-white rounded-full shadow-sm transition-transform translate-x-[22px]" />
                </button>
              </div>

              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="text-[14px] font-semibold text-slate-900">Session Timeout (minutes)</div>
                <div className="text-[14px] font-bold text-slate-900">30m</div>
              </div>
            </div>
          </div>

          {/* Password Policy */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-slate-900 mb-6">Password Policy</h2>
            
            <div className="divide-y divide-slate-100">
              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="text-[14px] font-medium text-slate-700">Minimum Length</div>
                <div className="text-[14px] font-bold text-slate-900">8 characters</div>
              </div>

              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="text-[14px] font-medium text-slate-700">Require Uppercase</div>
                <div className="text-[14px] font-bold text-slate-900">Yes</div>
              </div>

              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="text-[14px] font-medium text-slate-700">Require Numbers</div>
                <div className="text-[14px] font-bold text-slate-900">Yes</div>
              </div>

              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="text-[14px] font-medium text-slate-700">Require Special Characters</div>
                <div className="text-[14px] font-bold text-slate-900">Yes</div>
              </div>

              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="text-[14px] font-medium text-slate-700">Password Expiry</div>
                <div className="text-[14px] font-bold text-slate-900">90 days</div>
              </div>

              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="text-[14px] font-medium text-slate-700">Failed Login Attempts Before Lock</div>
                <div className="text-[14px] font-bold text-slate-900">5 attempts</div>
              </div>
            </div>
          </div>

        </div>
      )}
      
      {activeTab === "Roles & Permissions" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 text-center shadow-sm cursor-pointer hover:border-blue-300 transition-colors">
              <div className="text-[24px] font-bold text-blue-600 leading-none mb-1.5">1</div>
              <div className="text-[12px] font-medium text-slate-700">Super Admin</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
              <div className="text-[24px] font-bold text-purple-500 leading-none mb-1.5">4</div>
              <div className="text-[12px] font-medium text-slate-500">Branch Admin</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
              <div className="text-[24px] font-bold text-amber-500 leading-none mb-1.5">8</div>
              <div className="text-[12px] font-medium text-slate-500">Supervisor</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
              <div className="text-[24px] font-bold text-emerald-500 leading-none mb-1.5">5</div>
              <div className="text-[12px] font-medium text-slate-500">QC Inspector</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
              <div className="text-[24px] font-bold text-slate-500 leading-none mb-1.5">42</div>
              <div className="text-[12px] font-medium text-slate-500">Worker</div>
            </div>
          </div>

          {/* Matrix */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-[16px] font-bold text-slate-900">Super Admin — Permission Matrix</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-4 px-6 text-[12px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Permission</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-blue-500 uppercase tracking-wider text-center">Super</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-purple-500 uppercase tracking-wider text-center">Branch</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-amber-500 uppercase tracking-wider text-center">Supervisor</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-emerald-500 uppercase tracking-wider text-center">QC</th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Worker</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: "View Dashboard", perms: [true, true, true, true, false] },
                    { name: "Manage Jobs", perms: [true, true, true, false, false] },
                    { name: "Receiving", perms: [true, true, true, false, true] },
                    { name: "Process Workflow", perms: [true, true, true, false, true] },
                    { name: "Quality Control", perms: [true, true, true, true, false] },
                    { name: "Pickup & Delivery", perms: [true, true, false, false, false] },
                    { name: "Reports", perms: [true, true, false, false, false] },
                    { name: "Manage Customers", perms: [true, true, false, false, false] },
                    { name: "Manage Employees", perms: [true, true, false, false, false] },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-6 text-[13px] text-slate-700 whitespace-nowrap">{row.name}</td>
                      {row.perms.map((hasPerm, colIdx) => {
                        const colors = ["bg-blue-500", "bg-purple-500", "bg-amber-500", "bg-emerald-500", "bg-slate-400"];
                        return (
                          <td key={colIdx} className="py-3.5 px-6">
                            <div className="flex justify-center">
                              {hasPerm ? (
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white shadow-sm ${colors[colIdx]}`}>
                                  <Check size={12} strokeWidth={3.5} />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                                  <Minus size={12} strokeWidth={3.5} />
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Integrations" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* QuickBooks */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
                  <Briefcase size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">QuickBooks Online</h3>
                  <p className="text-[13px] text-slate-500 mt-0.5">Sync invoices and payments automatically</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[12px] font-bold border border-green-200">
                <Check size={14} strokeWidth={2.5} /> Connected
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mb-6">
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-slate-700">API Key</label>
                <input 
                  type="text" 
                  defaultValue="sk_live_****"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-slate-700">Company ID</label>
                <input 
                  type="text" 
                  defaultValue="QB-XXXXX"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-[13px] font-bold transition-colors">
              Disconnect
            </button>
          </div>

          {/* SendGrid */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                  <Mail size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">Email Service (SendGrid)</h3>
                  <p className="text-[13px] text-slate-500 mt-0.5">Transactional email for notifications</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[12px] font-bold border border-green-200">
                <Check size={14} strokeWidth={2.5} /> Connected
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mb-6">
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-slate-700">API Key</label>
                <input 
                  type="text" 
                  defaultValue="SG.****"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-slate-700">From Address</label>
                <input 
                  type="text" 
                  defaultValue="no-reply@pcsolutions.com"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-[13px] font-bold transition-colors">
              Disconnect
            </button>
          </div>

          {/* Twilio */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                  <Smartphone size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">SMS Provider (Twilio)</h3>
                  <p className="text-[13px] text-slate-500 mt-0.5">SMS notifications and alerts</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[12px] font-bold border border-slate-200">
                Not Connected
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mb-6">
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-slate-700">Account SID</label>
                <input 
                  type="text" 
                  placeholder="Enter account sid..."
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-slate-700">Auth Token</label>
                <input 
                  type="text" 
                  placeholder="Enter auth token..."
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[12px] font-semibold text-slate-700">From Number</label>
                <input 
                  type="text" 
                  placeholder="Enter from number..."
                  className="w-full md:w-1/2 h-11 px-4 border border-slate-200 rounded-xl text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
