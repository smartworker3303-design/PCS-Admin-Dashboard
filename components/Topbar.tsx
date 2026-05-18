import React from "react";
import { Search, Globe, Bell, ChevronDown, Printer, Menu } from "lucide-react";

export default function Topbar({ setSidebarOpen }: { setSidebarOpen: (val: boolean) => void }) {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center flex-1">
        <button 
          className="mr-4 lg:hidden text-slate-500 hover:text-slate-700"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
        <div className="relative w-full max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            placeholder="Search tickets, customers, parts..."
          />
        </div>
        {/* Mobile Search Icon */}
        <button className="md:hidden text-slate-500 hover:text-slate-700">
          <Search size={20} />
        </button>
      </div>

      <div className="flex items-center space-x-3 lg:space-x-5">
        <button className="hidden sm:flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg px-3 py-2 bg-white hover:bg-slate-50 transition-colors">
          <Printer size={16} className="mr-2 text-blue-500" />
          All Branches
          <ChevronDown size={16} className="ml-2 text-slate-400" />
        </button>

        <div className="flex items-center space-x-3 lg:space-x-4">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Globe size={20} />
          </button>
          
          <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

          <button className="flex items-center focus:outline-none">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-xs">
              SA
            </div>
            <div className="hidden sm:flex items-center ml-2 text-sm font-medium text-slate-700">
              Super Admin
              <ChevronDown size={16} className="ml-1 text-slate-400" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
