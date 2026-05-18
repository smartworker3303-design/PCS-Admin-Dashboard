"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const revenueData = [
  { name: "Oct", revenue: 42 },
  { name: "Nov", revenue: 48 },
  { name: "Dec", revenue: 40 },
  { name: "Jan", revenue: 52 },
  { name: "Feb", revenue: 58 },
  { name: "Mar", revenue: 55 },
  { name: "Apr", revenue: 63 },
];

const jobStatusData = [
  { name: "Active", value: 147, color: "#3b82f6" },     // blue-500
  { name: "Completed", value: 284, color: "#10b981" },  // emerald-500
  { name: "Delayed", value: 23, color: "#ef4444" },     // red-500
  { name: "Draft", value: 18, color: "#94a3b8" },       // slate-400
];

export function RevenueChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Revenue Overview</h3>
          <p className="text-xs text-slate-500">Monthly actual vs target</p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center">
          <span className="mr-1">↗</span> +14.6% vs last month
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }} 
              tickFormatter={(value) => `$${value}k`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`$${value}k`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function JobStatusChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Job Status Overview</h3>
        <p className="text-xs text-slate-500">All branches combined</p>
      </div>
      
      <div className="flex-1 w-full min-h-[250px] relative flex flex-col">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <PieChart>
              <Pie
                data={jobStatusData}
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="85%"
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {jobStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2.5 px-2">
          {jobStatusData.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="text-slate-600">{item.name}</span>
              </div>
              <span className="font-semibold text-slate-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
