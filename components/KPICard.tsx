import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  subtext: string;
  change: number;
  iconBgColor: string;
  iconColor: string;
}

export default function KPICard({ 
  icon: Icon, 
  value, 
  label, 
  subtext, 
  change, 
  iconBgColor, 
  iconColor 
}: KPICardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-lg ${iconBgColor} ${iconColor}`}>
          <Icon size={20} />
        </div>
        <div className={`flex items-center text-xs font-semibold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-400 mt-1">{subtext}</p>
      </div>
    </div>
  );
}
