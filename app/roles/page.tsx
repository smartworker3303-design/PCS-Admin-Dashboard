"use client";

import React, { useState } from "react";
import { Plus, Shield, ArrowRight, Save } from "lucide-react";
import AddUserModal from "@/components/AddUserModal";
import AddRoleModal from "@/components/AddRoleModal";

export default function RolesPage() {
  const [activeTab, setActiveTab] = useState("Roles");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Manager");
  
  const [permissions, setPermissions] = useState([
    { module: "Dashboard", access: true, level: "Full Access" },
    { module: "Jobs / Tickets", access: true, level: "Full Access" },
    { module: "Receiving", access: true, level: "Full Access" },
    { module: "Pipe Setup", access: true, level: "Full Access" },
    { module: "Process Templates", access: false, level: "No Access" },
    { module: "QC & Rework", access: true, level: "Full Access" },
    { module: "Delivery", access: true, level: "Full Access" },
    { module: "Reports", access: true, level: "Full Access" },
    { module: "Invoices", access: true, level: "Full Access" },
  ]);

  const togglePermission = (index: number) => {
    const newPerms = [...permissions];
    newPerms[index].access = !newPerms[index].access;
    newPerms[index].level = newPerms[index].access ? "Full Access" : "No Access";
    setPermissions(newPerms);
  };

  const grantAll = () => {
    setPermissions(permissions.map(p => ({ ...p, access: true, level: "Full Access" })));
  };

  const revokeAll = () => {
    setPermissions(permissions.map(p => ({ ...p, access: false, level: "No Access" })));
  };

  const roles = [
    {
      title: "Super Admin",
      description: "Full system access, all modules, system configuration",
      userCount: 1,
      color: "red",
    },
    {
      title: "Admin",
      description: "All modules except system config and user deletion",
      userCount: 2,
      color: "orange",
    },
    {
      title: "Manager",
      description: "Jobs, payroll approval, reports, QC review",
      userCount: 4,
      color: "blue",
    },
    {
      title: "Supervisor",
      description: "Job management, employee oversight, QC approval",
      userCount: 6,
      color: "purple",
    },
    {
      title: "QC Inspector",
      description: "QC inspections, calibration, rework management",
      userCount: 3,
      color: "cyan",
    },
    {
      title: "Accounting",
      description: "Invoices, PO, pricing, payroll export",
      userCount: 2,
      color: "emerald",
    },
    {
      title: "Inventory Manager",
      description: "Inventory, PO creation, stock management",
      userCount: 2,
      color: "amber",
    },
    {
      title: "Viewer",
      description: "Read-only access to reports and dashboards",
      userCount: 5,
      color: "slate",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "red": return "bg-red-50 text-red-500";
      case "orange": return "bg-orange-50 text-orange-500";
      case "blue": return "bg-blue-50 text-blue-500";
      case "purple": return "bg-purple-50 text-purple-500";
      case "cyan": return "bg-cyan-50 text-cyan-500";
      case "emerald": return "bg-emerald-50 text-emerald-500";
      case "amber": return "bg-amber-50 text-amber-500";
      case "slate": return "bg-slate-100 text-slate-500";
      default: return "bg-slate-100 text-slate-500";
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 leading-tight">User Roles & Permissions</h1>
          <p className="text-[14px] text-slate-500 mt-0.5">Manage system access by role and configure permissions</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAddRoleModalOpen(true)}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus size={16} strokeWidth={3} /> Add Role
          </button>
          <button 
            onClick={() => setIsAddUserModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus size={16} strokeWidth={3} /> Add User
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-xl inline-flex mb-6 border border-slate-100 shadow-sm">
        {["Roles", "Users", "Permission Matrix"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-[13px] font-bold transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Roles Grid */}
      {activeTab === "Roles" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              
              <div>
                <div className="flex justify-between items-start">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColorClasses(role.color)}`}>
                    <Shield size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-[20px] font-bold text-slate-900 leading-none">{role.userCount}</span>
                </div>
                
                <h3 className="text-[15px] font-bold text-slate-900 mt-4">{role.title}</h3>
                <p className="text-[12px] text-slate-500 mt-1.5 mb-6 leading-relaxed min-h-[36px]">
                  {role.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-[12px] font-medium text-slate-400">
                  {role.userCount} {role.userCount === 1 ? "user" : "users"}
                </span>
                <button className="text-[12px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700 transition-colors group">
                  Edit Permissions <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Permission Matrix */}
      {activeTab === "Permission Matrix" && (
        <div className="animate-in fade-in duration-300">
          {/* Editing Role Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
              <span className="text-[14px] font-semibold text-slate-700 whitespace-nowrap mr-2">Editing role:</span>
              <div className="flex gap-1">
                {roles.map((r) => (
                  <button
                    key={r.title}
                    onClick={() => setSelectedRole(r.title)}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors whitespace-nowrap ${
                      selectedRole === r.title
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {r.title}
                  </button>
                ))}
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap ml-4">
              <Save size={16} strokeWidth={2.5} /> Save Permissions
            </button>
          </div>

          {/* Matrix Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-[15px] font-bold text-slate-900">{selectedRole} — Permission Matrix</h2>
              <div className="flex gap-3">
                <button 
                  onClick={grantAll}
                  className="px-4 py-1.5 rounded-full text-[12px] font-bold border border-green-200 text-green-600 hover:bg-green-50 transition-colors"
                >
                  Grant All
                </button>
                <button 
                  onClick={revokeAll}
                  className="px-4 py-1.5 rounded-full text-[12px] font-bold border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  Revoke All
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-4 px-6 text-[12px] font-bold text-slate-400 uppercase tracking-wider w-1/2">Module</th>
                    <th className="py-4 px-6 text-[12px] font-bold text-slate-400 uppercase tracking-wider w-1/4">Access</th>
                    <th className="py-4 px-6 text-[12px] font-bold text-slate-400 uppercase tracking-wider w-1/4">Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {permissions.map((perm, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 text-[14px] font-semibold text-slate-700">
                        {perm.module}
                      </td>
                      <td className="py-4 px-6">
                        {/* Toggle Switch */}
                        <button 
                          onClick={() => togglePermission(idx)}
                          className={`w-[44px] h-[24px] rounded-full relative transition-colors ${perm.access ? 'bg-green-500' : 'bg-slate-200'}`}
                        >
                          <span className={`absolute top-1/2 -translate-y-1/2 w-[20px] h-[20px] bg-white rounded-full shadow-sm transition-transform ${perm.access ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block text-[12px] font-bold ${
                          perm.level === "Full Access" 
                            ? "text-green-500" 
                            : "text-slate-300"
                        }`}>
                          {perm.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <AddUserModal 
        isOpen={isAddUserModalOpen} 
        onClose={() => setIsAddUserModalOpen(false)} 
      />
      <AddRoleModal
        isOpen={isAddRoleModalOpen}
        onClose={() => setIsAddRoleModalOpen(false)}
      />
    </div>
  );
}
