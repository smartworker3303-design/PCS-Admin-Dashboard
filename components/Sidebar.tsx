"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Settings, 
  Files, 
  ClipboardCheck, 
  Truck, 
  Receipt, 
  ShoppingCart, 
  DollarSign, 
  BarChart2, 
  PackageOpen, 
  Wrench, 
  Users,
  ChevronRight,
  Menu,
  X,
  Clock,
  Bell,
  MapPin,
  Shield,
  BookOpen
} from "lucide-react";

const operations = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Jobs / Tickets", href: "/jobs", icon: FileText },
  { name: "Receiving", href: "/receiving", icon: Package },
  { name: "Carts Tracking", href: "/carts", icon: ShoppingCart },
  { name: "Pipe Process Setup", href: "/pipe-process", icon: Settings },
  { name: "Process Templates", href: "/process-templates", icon: Files },
  { name: "QC & Rework", href: "/qc-rework", icon: ClipboardCheck },
  { name: "Delivery / Pickup", href: "/delivery-pickup", icon: Truck },
];

const finance = [
  { name: "Invoices", href: "/invoices", icon: Receipt },
  { 
    name: "PO & Vendors", 
    href: "#", 
    icon: ShoppingCart, 
    hasArrow: true,
    subItems: [
      { name: "Purchase Orders", href: "/purchase-orders" },
      { name: "Vendors", href: "/vendors" }
    ]
  },
  { name: "Pricing Rules", href: "/pricing-rules", icon: DollarSign },
  { name: "Reports", href: "/reports", icon: BarChart2 },
];

const inventoryQC = [
  { name: "Inventory", href: "/inventory", icon: PackageOpen },
  { name: "Calibration Tools", href: "/calibration-tools", icon: Wrench },
];

const people = [
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Time Approval", href: "/time-approval", icon: Clock },
  { name: "Payroll Reports", href: "/payroll-reports", icon: FileText },
];

const system = [
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Locations / Branches", href: "/locations", icon: MapPin },
  { name: "User Roles & Permissions", href: "/roles", icon: Shield },
  { name: "Audit Logs", href: "/audit-logs", icon: BookOpen },
  { name: "System Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ 
  isOpen, 
  setIsOpen,
  isCollapsed,
  toggleCollapse
}: { 
  isOpen: boolean; 
  setIsOpen: (val: boolean) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initial: Record<string, boolean> = {};
    finance.forEach(item => {
      if (item.subItems?.some(sub => pathname === sub.href)) {
        initial[item.name] = true;
      }
    });
    setExpandedMenus(prev => ({ ...prev, ...initial }));
  }, [pathname]);

  const toggleMenu = (e: React.MouseEvent, name: string, defaultExpanded: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedMenus(prev => ({
      ...prev,
      [name]: prev[name] !== undefined ? !prev[name] : !defaultExpanded
    }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#1a233a] text-slate-400 flex flex-col h-full transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20 w-64' : 'w-64'}`}
      >
        <div className={`flex items-center p-4 mb-2 lg:mb-4 border-b border-white/5 lg:border-none ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="font-bold text-white text-sm leading-tight mr-2">
                <span className="block">POWDER COATING</span>
                <span className="block text-blue-400">SOLUTIONS</span>
              </div>
            </div>
          )}
          
          <button 
            className="text-slate-400 hover:text-white lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
          
          <button 
            className="hidden lg:flex items-center justify-center text-slate-400 hover:text-white"
            onClick={toggleCollapse}
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 px-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="space-y-6">
            
            {/* Operations */}
            <div>
              {!isCollapsed && <p className="text-xs font-semibold text-slate-500 mb-2 px-3 tracking-wider">OPERATIONS</p>}
              <ul className="space-y-1">
                {operations.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        title={isCollapsed ? item.name : undefined}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive 
                            ? 'bg-blue-600 text-white font-medium' 
                            : 'hover:bg-white/5 hover:text-white'
                        } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                      >
                        <div className="flex items-center">
                          <item.icon size={18} className={`${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          {!isCollapsed && <span>{item.name}</span>}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Finance */}
            <div>
              {!isCollapsed && <p className="text-xs font-semibold text-slate-500 mb-2 px-3 tracking-wider">FINANCE</p>}
              <ul className="space-y-1">
                {finance.map((item, idx) => {
                  const hasActiveSub = item.subItems?.some(sub => pathname === sub.href);
                  const isActive = pathname === item.href || hasActiveSub;
                  const isExpanded = expandedMenus[item.name] !== undefined ? expandedMenus[item.name] : hasActiveSub;
                  
                  return (
                    <li key={idx}>
                      <Link
                        href={item.subItems ? item.subItems[0].href : item.href}
                        title={isCollapsed ? item.name : undefined}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive 
                            ? 'bg-blue-600 text-white font-medium' 
                            : 'hover:bg-white/5 hover:text-white'
                        } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                      >
                        <div className="flex items-center">
                          <item.icon size={18} className={`${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          {!isCollapsed && <span>{item.name}</span>}
                        </div>
                        {!isCollapsed && item.hasArrow && (
                          <div 
                            onClick={(e) => toggleMenu(e, item.name, hasActiveSub ?? false)}
                            className={`p-0.5 rounded transition-colors ${isActive ? 'hover:bg-blue-700' : 'hover:bg-white/10'}`}
                          >
                            <ChevronRight size={16} className={`transition-transform ${isExpanded ? 'rotate-90 text-white' : 'text-slate-400'}`} />
                          </div>
                        )}
                      </Link>
                      
                      {/* Sub Items */}
                      {!isCollapsed && item.subItems && isExpanded && (
                        <ul className="mt-1 mb-2 space-y-1">
                          {item.subItems.map((sub, subIdx) => (
                            <li key={subIdx}>
                              <Link
                                href={sub.href}
                                className={`block pl-11 pr-3 py-2 text-[13px] rounded-lg transition-colors ${
                                  pathname === sub.href 
                                    ? 'text-blue-400 font-medium' 
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Inventory & QC */}
            <div>
              {!isCollapsed && <p className="text-xs font-semibold text-slate-500 mb-2 px-3 tracking-wider">INVENTORY & QC</p>}
              <ul className="space-y-1">
                {inventoryQC.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        title={isCollapsed ? item.name : undefined}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive 
                            ? 'bg-blue-600 text-white font-medium' 
                            : 'hover:bg-white/5 hover:text-white'
                        } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                      >
                        <div className="flex items-center">
                          <item.icon size={18} className={`${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          {!isCollapsed && <span>{item.name}</span>}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* People */}
            <div>
              {!isCollapsed && <p className="text-xs font-semibold text-slate-500 mb-2 px-3 tracking-wider">PEOPLE</p>}
              <ul className="space-y-1">
                {people.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        title={isCollapsed ? item.name : undefined}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive 
                            ? 'bg-blue-600 text-white font-medium' 
                            : 'hover:bg-white/5 hover:text-white'
                        } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                      >
                        <div className="flex items-center">
                          <item.icon size={18} className={`${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          {!isCollapsed && <span>{item.name}</span>}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {/* System */}
            <div>
              {!isCollapsed && <p className="text-xs font-semibold text-slate-500 mb-2 px-3 tracking-wider mt-6">SYSTEM</p>}
              <ul className="space-y-1">
                {system.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        title={isCollapsed ? item.name : undefined}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive 
                            ? 'bg-blue-600 text-white font-medium' 
                            : 'hover:bg-white/5 hover:text-white'
                        } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                      >
                        <div className="flex items-center">
                          <item.icon size={18} className={`${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          {!isCollapsed && <span>{item.name}</span>}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5 bg-[#141b2d] lg:bg-transparent">
          <div className={`flex items-center bg-[#1e293b] lg:bg-white/5 rounded-xl ${isCollapsed ? 'p-2 justify-center' : 'p-3'}`}>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-xs shrink-0">
              AT
            </div>
            {!isCollapsed && (
              <>
                <div className="ml-3 flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-white leading-none mb-1 truncate">Alex Thompson</p>
                  <p className="text-xs text-slate-400 leading-none truncate">Super Admin</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 ml-2"></div>
              </>
            )}
            {isCollapsed && (
              <div className="absolute bottom-5 right-5 h-2 w-2 rounded-full bg-emerald-500 shrink-0 hidden"></div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
