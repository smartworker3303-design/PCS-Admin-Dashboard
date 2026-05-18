"use client";

import React from "react";
import { Building2, Settings2 } from "lucide-react";

export function BranchPerformance() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Branch Performance</h3>
          <p className="text-xs text-slate-500">Revenue & jobs comparison</p>
        </div>
        <Building2 size={18} className="text-slate-400" />
      </div>
      
      <div className="flex-1 w-full flex flex-col justify-end pt-4">
        {/* Simplified Bar Chart visualization since it's cut off in screenshot */}
        <div className="relative h-20 flex items-end justify-between px-4 pb-2 border-b border-slate-100">
          <div className="w-8 bg-blue-500 rounded-t-sm" style={{ height: '40%' }}></div>
          <div className="w-8 bg-blue-200 rounded-t-sm" style={{ height: '70%' }}></div>
          <div className="w-8 bg-blue-500 rounded-t-sm" style={{ height: '60%' }}></div>
          <div className="w-8 bg-blue-200 rounded-t-sm" style={{ height: '90%' }}></div>
        </div>
        <div className="flex justify-between px-4 mt-2 text-xs text-slate-400">
          <span>North</span>
          <span>South</span>
          <span>East</span>
          <span>West</span>
        </div>
      </div>
    </div>
  );
}

export function LiveProcessFlow() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Live Process Flow</h3>
          <p className="text-xs text-slate-500">Parts count per stage</p>
        </div>
        <Settings2 size={18} className="text-slate-400" />
      </div>
      
      <div className="flex-1 w-full flex flex-col justify-center space-y-4">
        <div className="flex items-center text-sm">
          <div className="w-24 text-slate-600 font-medium text-xs">Receiving</div>
          <div className="flex-1 h-2 bg-slate-100 rounded-full mx-3 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <div className="flex items-center text-xs w-16 justify-end">
            <span className="font-bold text-slate-800 mr-2">32</span>
            <span className="text-slate-400">1.2h</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm">
          <div className="w-24 text-slate-600 font-medium text-xs">Prep & Sand</div>
          <div className="flex-1 h-2 bg-slate-100 rounded-full mx-3 overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <div className="flex items-center text-xs w-16 justify-end">
            <span className="font-bold text-slate-800 mr-2">45</span>
            <span className="text-slate-400">2.5h</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm">
          <div className="w-24 text-slate-600 font-medium text-xs">Coating</div>
          <div className="flex-1 h-2 bg-slate-100 rounded-full mx-3 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }}></div>
          </div>
          <div className="flex items-center text-xs w-16 justify-end">
            <span className="font-bold text-slate-800 mr-2">18</span>
            <span className="text-slate-400">0.8h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
