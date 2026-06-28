import React, { useState, useEffect } from "react";
import { X, FileText, Plus, Trash2, ShieldAlert } from "lucide-react";

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InvoiceLineItem {
  id: string;
  type: "coating" | "non-coating";
  coatingItemType: "Tubing" | "Flange" | "Fitting" | "Fabrication";
  diameter: string;
  description: string;
  poNumber: string;
  quantity: number; // Total footage for Tubing, or count/hours for others
  coatedQuantity?: number; // Coated footage (billed) for Tubing
  unitPrice: number;
  cost: number;
  markupPercent: number;
  taxable: boolean;
  isLineRush: boolean;
}

const DIAMETERS = [
  '2"', '3"', '4"', '6"', '8"', '10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"'
];

export default function CreateInvoiceModal({ isOpen, onClose }: CreateInvoiceModalProps) {
  const [ticketId, setTicketId] = useState("TK-2847");
  const [customer, setCustomer] = useState("ABC Steel Corp");
  const [poNumber, setPoNumber] = useState("PO-2026-041");
  const [taxRate, setTaxRate] = useState<number>(8.25);
  const [discount, setDiscount] = useState<number>(0);
  const [isRush, setIsRush] = useState(false);
  const [isPOMarkup, setIsPOMarkup] = useState(false);

  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    {
      id: "1",
      type: "coating",
      coatingItemType: "Tubing",
      diameter: '6"',
      description: '6" Tubing Powder Coating',
      poNumber: "",
      quantity: 100, // Total 100 ft
      coatedQuantity: 40, // Coated 40 ft (billed)
      unitPrice: 7.50,
      cost: 0,
      markupPercent: 0,
      taxable: true,
      isLineRush: false,
    },
    {
      id: "2",
      type: "coating",
      coatingItemType: "Flange",
      diameter: '6"',
      description: '6" Flange Powder Coating',
      poNumber: "",
      quantity: 4,
      unitPrice: 45.00,
      cost: 0,
      markupPercent: 0,
      taxable: true,
      isLineRush: true,
    }
  ]);

  // Pricing lookups based on new classification rules
  const getCoatingDefaultPrice = (itemType: "Tubing" | "Flange" | "Fitting" | "Fabrication", diameter: string): number => {
    const size = parseFloat(diameter.replace('"', '')) || 0;
    if (itemType === "Tubing") {
      const prices: Record<number, number> = {
        2: 3.50, 3: 4.25, 4: 5.00, 6: 7.50, 8: 10.00, 10: 12.00, 12: 14.00,
        14: 16.50, 16: 19.00, 18: 22.00, 20: 25.00, 22: 28.00, 24: 32.00
      };
      return prices[size] || 7.50;
    } else if (itemType === "Flange") {
      const prices: Record<number, number> = {
        2: 25.00, 3: 32.00, 4: 45.00, 6: 60.00, 8: 80.00, 10: 110.00, 12: 140.00
      };
      if (size >= 14) return 180.00;
      return prices[size] || 45.00;
    } else if (itemType === "Fitting") {
      const prices: Record<number, number> = {
        2: 15.00, 3: 18.50, 4: 22.00, 6: 30.00, 8: 40.00, 10: 55.00, 12: 70.00
      };
      if (size >= 14) return 95.00;
      return prices[size] || 25.00;
    } else { // Fabrication
      return 35.00; // Hourly default fabrication/grinding rate
    }
  };

  const addCoatingItem = () => {
    const newItem: InvoiceLineItem = {
      id: Date.now().toString(),
      type: "coating",
      coatingItemType: "Tubing",
      diameter: '6"',
      description: '6" Tubing Powder Coating',
      poNumber: "",
      quantity: 100, // Default total footage
      coatedQuantity: 100, // Default coated footage
      unitPrice: 7.50,
      cost: 0,
      markupPercent: 0,
      taxable: true,
      isLineRush: false,
    };
    setLineItems([...lineItems, newItem]);
  };

  const addNonCoatingItem = () => {
    const newItem: InvoiceLineItem = {
      id: Date.now().toString(),
      type: "non-coating",
      coatingItemType: "Tubing", // unused
      diameter: '6"', // unused
      description: "PCS Internal PO Billing Sync",
      poNumber: "PCS-PO-041",
      quantity: 1,
      unitPrice: 180.00, // calculated from cost * markup
      cost: 150.00,
      markupPercent: 20, // 20% markup automatically flows to customer
      taxable: false,
      isLineRush: false,
    };
    setLineItems([...lineItems, newItem]);
  };

  const deleteItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<InvoiceLineItem>) => {
    setLineItems(lineItems.map(item => {
      if (item.id !== id) return item;
      
      const merged = { ...item, ...updates };

      // Re-trigger defaults if item type or diameter changes for coating
      if (item.type === "coating" && (updates.coatingItemType || updates.diameter)) {
        const type = updates.coatingItemType || item.coatingItemType;
        const diam = updates.diameter || item.diameter;
        merged.unitPrice = getCoatingDefaultPrice(type, diam);
        merged.description = type === "Fabrication" 
          ? "Hourly Fabrication & Grinding Labor"
          : `${diam} ${type} Powder Coating`;
          
        if (type !== "Tubing") {
          merged.coatedQuantity = undefined;
        } else if (merged.coatedQuantity === undefined) {
          merged.coatedQuantity = merged.quantity;
        }
      }

      // Re-trigger non-coating price if cost or markup changes
      if (item.type === "non-coating" && (updates.cost !== undefined || updates.markupPercent !== undefined)) {
        const cost = updates.cost !== undefined ? updates.cost : item.cost;
        const markup = updates.markupPercent !== undefined ? updates.markupPercent : item.markupPercent;
        merged.unitPrice = cost * (1 + markup / 100);
      }

      return merged;
    }));
  };

  // Calculations
  const calculateLineTotal = (item: InvoiceLineItem): number => {
    const lineRushMultiplier = (isRush || item.isLineRush) ? 1.5 : 1.0;
    
    if (item.type === "coating") {
      // If Tubing, charge only for the Coated Footage. Otherwise charge by Quantity
      const billableQty = item.coatingItemType === "Tubing" 
        ? (item.coatedQuantity !== undefined ? item.coatedQuantity : item.quantity)
        : item.quantity;
        
      const baseTotal = billableQty * item.unitPrice;
      return baseTotal * lineRushMultiplier;
    } else {
      // Non-coating (Internal Purchase PO charges)
      const baseCost = item.cost * (1 + item.markupPercent / 100);
      return item.quantity * baseCost;
    }
  };

  const getSubtotal = (): number => {
    return lineItems.reduce((acc, item) => acc + calculateLineTotal(item), 0);
  };

  const getTaxableAmount = (): number => {
    return lineItems
      .filter(item => item.taxable)
      .reduce((acc, item) => acc + calculateLineTotal(item), 0);
  };

  const subtotal = getSubtotal();
  const taxableAmount = getTaxableAmount();
  const taxAmount = (taxableAmount * taxRate) / 100;
  const total = Math.max(0, subtotal - discount + taxAmount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[1000px] flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-5 bg-white z-10 sticky top-0 flex justify-between items-center border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-[20px] font-bold text-slate-900">Create Itemized Invoice</h2>
            <p className="text-[12px] text-slate-400 mt-0.5">Define coating specs, side-billing PO costs, and client tax exemptions</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 overflow-y-auto no-scrollbar flex-1 flex flex-col gap-6">
          
          {/* Top Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100/60">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Ticket ID</label>
              <input 
                type="text" 
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder="TK-XXXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white transition-colors placeholder:text-slate-400 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Customer / Company</label>
              <input 
                type="text" 
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="Select customer"
                className="w-full border border-slate-200 rounded-xl px-4 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white transition-colors placeholder:text-slate-400 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Primary PO Number</label>
              <input 
                type="text" 
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                placeholder="PO-2026-XXX"
                className="w-full border border-slate-200 rounded-xl px-4 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white transition-colors placeholder:text-slate-400 shadow-sm"
              />
            </div>
          </div>

          {/* Line Items Container */}
          <div>
            <div className="flex justify-between items-center mb-3.5">
              <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-1.5">
                Line Items
                <span className="text-[11px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{lineItems.length}</span>
              </h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addCoatingItem}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100 px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Plus size={14} /> Add Coating/Fab Item
                </button>
                <button
                  type="button"
                  onClick={addNonCoatingItem}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100 px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Plus size={14} /> Link Internal PO Charge
                </button>
              </div>
            </div>

            {/* Line Items Table/Grid */}
            {lineItems.length === 0 ? (
              <div className="border border-dashed border-slate-200 rounded-2xl py-12 flex flex-col items-center justify-center bg-slate-50/20">
                <FileText size={32} className="text-slate-300 mb-2" />
                <p className="text-[13px] text-slate-400 font-semibold">No items added to invoice. Click options above to add.</p>
              </div>
            ) : (
              <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white shadow-inner max-h-[320px] overflow-y-auto no-scrollbar">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4 w-[35%]">Classification & Size</th>
                      <th className="py-3 px-4 w-[25%]">Quantity / Footage</th>
                      <th className="py-3 px-4 w-[20%]">Price Config</th>
                      <th className="py-3 px-4 w-[8%] text-center">Rush</th>
                      <th className="py-3 px-4 w-[6%] text-center">Tax</th>
                      <th className="py-3 px-4 w-[10%] text-right">Total</th>
                      <th className="py-3 px-4 w-[5%]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {lineItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/30 transition-colors bg-white">
                        
                        {/* Classification Details */}
                        <td className="py-3 px-4">
                          {item.type === "coating" ? (
                            <div className="flex items-center gap-2">
                              <select 
                                value={item.coatingItemType}
                                onChange={(e) => updateItem(item.id, { coatingItemType: e.target.value as any })}
                                className="border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 font-bold text-[12px] focus:outline-none focus:border-blue-500 shadow-sm cursor-pointer animate-in fade-in"
                              >
                                <option value="Tubing">Tubing (ft)</option>
                                <option value="Flange">Flange (ea)</option>
                                <option value="Fitting">Fitting (ea)</option>
                                <option value="Fabrication">Fabrication (hr)</option>
                              </select>

                              {item.coatingItemType !== "Fabrication" ? (
                                <select 
                                  value={item.diameter}
                                  onChange={(e) => updateItem(item.id, { diameter: e.target.value })}
                                  className="border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 font-bold text-[12px] focus:outline-none focus:border-blue-500 shadow-sm cursor-pointer"
                                >
                                  {DIAMETERS.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                  ))}
                                </select>
                              ) : (
                                <span className="text-slate-400 text-xs italic">N/A</span>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1">
                              <input 
                                type="text"
                                value={item.description}
                                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                                placeholder="Non-coating item description"
                                className="w-full border border-slate-200 rounded-lg px-2.5 py-1 text-[12px] focus:outline-none focus:border-blue-500 font-bold text-slate-700 shadow-sm"
                              />
                              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                                Linked PCS PO: 
                                <input 
                                  type="text"
                                  value={item.poNumber}
                                  onChange={(e) => updateItem(item.id, { poNumber: e.target.value })}
                                  className="border-b border-transparent hover:border-emerald-300 bg-transparent px-1 py-0 text-[10px] w-24 focus:outline-none focus:border-emerald-500 font-mono"
                                />
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Quantity / Footage (Tubing features total & coated footage) */}
                        <td className="py-3 px-4">
                          {item.type === "coating" && item.coatingItemType === "Tubing" ? (
                            <div className="flex items-center gap-1.5 animate-in fade-in">
                              <div className="flex flex-col">
                                <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Total Ft</span>
                                <input 
                                  type="number"
                                  min="0"
                                  value={item.quantity}
                                  onChange={(e) => updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                                  className="w-18 border border-slate-200 rounded-lg px-1.5 py-1 bg-white text-slate-500 font-semibold focus:outline-none focus:border-blue-500 text-center text-xs"
                                />
                              </div>
                              <span className="text-slate-400 mt-3 font-semibold">/</span>
                              <div className="flex flex-col">
                                <span className="text-[9px] text-emerald-600 font-bold uppercase mb-0.5">Coated Ft</span>
                                <input 
                                  type="number"
                                  min="0"
                                  value={item.coatedQuantity}
                                  onChange={(e) => updateItem(item.id, { coatedQuantity: parseFloat(e.target.value) || 0 })}
                                  className="w-18 border border-emerald-250 rounded-lg px-1.5 py-1 bg-emerald-50 text-emerald-700 font-bold focus:outline-none focus:border-emerald-500 text-center text-xs"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">
                                {item.coatingItemType === "Fabrication" ? "Hours" : "Count"}
                              </span>
                              <input 
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                                className="w-20 border border-slate-200 rounded-lg px-2.5 py-1 bg-white text-slate-700 font-bold focus:outline-none focus:border-blue-500 text-center text-xs shadow-xs"
                              />
                            </div>
                          )}
                        </td>

                        {/* Price Calculations */}
                        <td className="py-3 px-4">
                          {item.type === "coating" ? (
                            <div className="relative">
                              <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-400 font-bold text-[11px]">$</span>
                              <input 
                                type="number"
                                min="0"
                                step="any"
                                value={item.unitPrice}
                                onChange={(e) => updateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                                className="w-full border border-slate-200 rounded-lg pl-6 pr-2 py-1 bg-white text-slate-700 font-bold focus:outline-none focus:border-blue-500 text-xs shadow-sm"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <div className="relative w-22">
                                <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-slate-400 text-[8px] font-bold uppercase">Cost</span>
                                <input 
                                  type="number"
                                  min="0"
                                  step="any"
                                  value={item.cost}
                                  onChange={(e) => updateItem(item.id, { cost: parseFloat(e.target.value) || 0 })}
                                  className="w-full border border-slate-200 rounded-lg pl-8 pr-1 py-1 text-[11px] font-bold text-slate-700 focus:outline-none focus:border-blue-500 shadow-sm"
                                />
                              </div>
                              <div className="relative w-18">
                                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 text-[8px] font-bold uppercase">%</span>
                                <input 
                                  type="number"
                                  min="0"
                                  value={item.markupPercent}
                                  onChange={(e) => updateItem(item.id, { markupPercent: parseInt(e.target.value) || 0 })}
                                  className="w-full border border-slate-200 rounded-lg pl-1 pr-4 py-1 text-[11px] font-bold text-slate-700 focus:outline-none focus:border-blue-500 shadow-sm text-center"
                                />
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Rush Switch for Line Items */}
                        <td className="py-3 px-4 text-center">
                          <input 
                            type="checkbox"
                            checked={item.isLineRush}
                            onChange={(e) => updateItem(item.id, { isLineRush: e.target.checked })}
                            className="w-4 h-4 rounded border-slate-200 text-orange-500 focus:ring-orange-550 cursor-pointer"
                          />
                        </td>

                        {/* Tax Exemption Checkbox */}
                        <td className="py-3 px-4 text-center">
                          <input 
                            type="checkbox"
                            checked={item.taxable}
                            onChange={(e) => updateItem(item.id, { taxable: e.target.checked })}
                            className="w-4 h-4 rounded text-blue-600 border-slate-200 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>

                        {/* Row Subtotal */}
                        <td className="py-3 px-4 text-right font-bold text-slate-900">
                          ${calculateLineTotal(item).toFixed(2)}
                        </td>

                        {/* Delete Row Button */}
                        <td className="py-3 px-4 text-center">
                          <button 
                            type="button"
                            onClick={() => deleteItem(item.id)}
                            className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Surcharges & Billable Markups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between items-center border border-slate-250/60 rounded-xl p-4 bg-white shadow-sm">
              <div>
                <span className="text-[13px] font-bold text-slate-800 block">Rush Order Status (Global 1.5x)</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Applies 1.5x multiplier to all coating item prices</span>
              </div>
              <div 
                onClick={() => setIsRush(!isRush)}
                className={`w-10 h-6 rounded-full flex items-center px-1 cursor-pointer transition-all shadow-inner ${
                  isRush ? "bg-orange-500 justify-end" : "bg-slate-200 justify-start"
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>

            <div className="flex justify-between items-center border border-slate-250/60 rounded-xl p-4 bg-[#f8fafc] shadow-sm">
              <div>
                <span className="text-[13px] font-bold text-slate-800 block">Force Internal PO Markup Synced</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Flows all Linked PO charges immediately onto billing card</span>
              </div>
              <div 
                onClick={() => setIsPOMarkup(!isPOMarkup)}
                className={`w-10 h-6 rounded-full flex items-center px-1 cursor-pointer transition-all shadow-inner ${
                  isPOMarkup ? "bg-blue-600 justify-end" : "bg-slate-200 justify-start"
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>

          {/* Tax and Discount Controls */}
          <div className="grid grid-cols-2 gap-5 p-4 border border-slate-100 rounded-2xl bg-slate-50/30">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Tax Rate (%)</label>
              <input 
                type="number"
                min="0"
                step="any"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white transition-colors shadow-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Discount ($)</label>
              <input 
                type="number"
                min="0"
                step="any"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white transition-colors shadow-sm font-semibold"
              />
            </div>
          </div>

          {/* Live Totals Preview */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 mb-4 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <FileText size={14} className="text-slate-400" />
              <span>Invoice Totals Summary</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold text-slate-700">${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-red-500">Discount Applied</span>
                  <span className="font-semibold text-red-500">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-[13px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Calculated Tax ({taxRate}%)</span>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                    Taxable subtotal: ${taxableAmount.toFixed(2)}
                  </span>
                </div>
                <span className="font-semibold text-slate-700">${taxAmount.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-slate-100 my-1.5"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-bold text-slate-900">Total Invoice Amount</span>
                <span className="text-[20px] font-bold text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 flex gap-4 bg-white sticky bottom-0 shrink-0">
          <button 
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm flex items-center justify-center gap-1"
          >
            Create & Process Invoice
          </button>
        </div>

      </div>
    </div>
  );
}
