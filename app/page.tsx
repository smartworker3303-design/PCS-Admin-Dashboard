"use client";

import React from "react";
import KPICard from "@/components/KPICard";
import { RevenueChart, JobStatusChart } from "@/components/Charts";
import { BranchPerformance, LiveProcessFlow } from "@/components/BottomWidgets";
import { 
  ClipboardList, 
  Clock, 
  Layers, 
  CheckCircle2, 
  DollarSign, 
  AlertCircle,
  RefreshCw
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Super Admin Dashboard</h1>
          <p className="text-sm text-slate-500">Real-time overview across all branches - Last updated: just now</p>
        </div>
        <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto">
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <KPICard 
          icon={ClipboardList} 
          value="147" 
          label="Active Jobs" 
          subtext="Across all branches" 
          change={12} 
          iconBgColor="bg-blue-50" 
          iconColor="text-blue-500" 
        />
        <KPICard 
          icon={Clock} 
          value="23" 
          label="Jobs Delayed" 
          subtext="Needs attention" 
          change={-5} 
          iconBgColor="bg-red-50" 
          iconColor="text-red-400" 
        />
        <KPICard 
          icon={Layers} 
          value="892" 
          label="Parts In Progress" 
          subtext="Current workflow" 
          change={8} 
          iconBgColor="bg-purple-50" 
          iconColor="text-purple-500" 
        />
        <KPICard 
          icon={CheckCircle2} 
          value="64" 
          label="Completed Today" 
          subtext="Since 6:00 AM" 
          change={15} 
          iconBgColor="bg-emerald-50" 
          iconColor="text-emerald-500" 
        />
        <KPICard 
          icon={DollarSign} 
          value="$63K" 
          label="Total Revenue" 
          subtext="April 2026" 
          change={14} 
          iconBgColor="bg-orange-50" 
          iconColor="text-orange-500" 
        />
        <KPICard 
          icon={AlertCircle} 
          value="31" 
          label="Pending Invoices" 
          subtext="$48,200 total" 
          change={-3} 
          iconBgColor="bg-orange-50" 
          iconColor="text-orange-500" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 min-h-[350px]">
          <RevenueChart />
        </div>
        <div className="min-h-[350px]">
          <JobStatusChart />
        </div>
      </div>

      {/* Bottom Widgets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        <div className="min-h-[250px]">
          <BranchPerformance />
        </div>
        <div className="min-h-[250px]">
          <LiveProcessFlow />
        </div>
      </div>
    </div>
  );
}
