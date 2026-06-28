import React, { useState } from "react";
import { X, FileText, Plus, Trash2, UploadCloud } from "lucide-react";

interface CreatePOModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface POItem {
  description: string;
  qty: number;
  unitPrice: number;
}

export default function CreatePOModal({ isOpen, onClose }: CreatePOModalProps) {
  const [vendor, setVendor] = useState("");
  const [branch, setBranch] = useState("Houston");
  const [client, setClient] = useState("");
  const [costCode, setCostCode] = useState("");
  const [job, setJob] = useState("");
  const [dueDate, setDueDate] = useState("Jul 15, 2026");
  const [isBillable, setIsBillable] = useState(false);
  const [markupPercent, setMarkupPercent] = useState("20");
  const [notes, setNotes] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [items, setItems] = useState<POItem[]>([
    { description: "Specialized Powder Primer Coat (lbs)", qty: 200, unitPrice: 8.50 },
    { description: "Industrial Oven Curing Agent", qty: 2, unitPrice: 350.00 }
  ]);

  const handleAddItem = () => {
    setItems([...items, { description: "", qty: 1, unitPrice: 0.00 }]);
  };

  const handleRemoveItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleUpdateItem = (idx: number, field: keyof POItem, val: any) => {
    setItems(items.map((item, i) => {
      if (i !== idx) return item;
      return { ...item, [field]: val };
    }));
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
  };

  const simulateInvoiceUpload = () => {
    const files = ["vendor_chemcorp_inv9283.pdf", "supplier_propowder_invoice.pdf", "gas_co_receipt_june.pdf"];
    setUploadedFileName(files[Math.floor(Math.random() * files.length)]);
  };

  if (!isOpen) return null;

  const total = getSubtotal();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[750px] flex flex-col max-h-[95vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 bg-white z-10 sticky top-0 flex justify-between items-center border-b border-slate-50 shrink-0">
          <h2 className="text-[20px] font-bold text-slate-900">Create PCS Purchase Order</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 overflow-y-auto no-scrollbar flex-1 flex flex-col gap-6">
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Vendor Name</label>
              <input 
                type="text" 
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder="e.g. ChemCorp Coatings"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">PCS Branch Facility</label>
              <select 
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 bg-white"
              >
                <option value="Houston">Houston (Main Plant)</option>
                <option value="Dallas">Dallas Branch</option>
                <option value="Austin">Austin Hub</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Customer To Bill</label>
              <input 
                type="text" 
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. ABC Steel Corp"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">PCS Internal Cost Code</label>
              <input 
                type="text" 
                value={costCode}
                onChange={(e) => setCostCode(e.target.value)}
                placeholder="e.g. CC-HOU-101"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 bg-white placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Related Job / Ticket ID</label>
              <input 
                type="text" 
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="e.g. TK-2847"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 bg-white placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Required Delivery Date</label>
              <input 
                type="text" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Billable to Customer Switch */}
          <div className="bg-[#f4f8ff] border border-[#e0ebfd] rounded-2xl p-5 flex flex-col gap-4 shadow-xs">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-blue-650 block">Billable to Customer Sync</span>
                <span className="text-[12px] text-blue-500 block mt-0.5">If toggled, this vendor purchase item + markup % automatically syncs to job invoice.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isBillable}
                  onChange={(e) => setIsBillable(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {isBillable && (
              <div className="flex justify-between items-center border-t border-[#dbeafe] pt-3.5 animate-in slide-in-from-top-2 duration-200">
                <span className="text-[12px] font-bold text-blue-700">Default PO Invoice Markup Percentage (%)</span>
                <div className="relative w-28 shrink-0">
                  <input 
                    type="number" 
                    value={markupPercent} 
                    onChange={(e) => setMarkupPercent(e.target.value)} 
                    className="w-full border border-blue-200 rounded-xl px-3 py-2 text-center text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 bg-white"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">%</span>
                </div>
              </div>
            )}
          </div>

          {/* Items Sub-table */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[14px] font-bold text-slate-800">Purchasing Line Items</h3>
              <button 
                type="button"
                onClick={handleAddItem}
                className="text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus size={14} /> Add Line Item
              </button>
            </div>
            
            <div className="border border-slate-150 rounded-xl overflow-hidden shadow-inner">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-150 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-4 w-[60%]">Description</th>
                    <th className="py-2.5 px-4 w-[12%] text-center">Qty</th>
                    <th className="py-2.5 px-4 w-[15%] text-center">Unit Price</th>
                    <th className="py-2.5 px-4 w-[10%] text-right">Total</th>
                    <th className="py-2.5 px-4 w-[3%]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-3">
                        <input 
                          type="text" 
                          value={item.description}
                          onChange={(e) => handleUpdateItem(idx, "description", e.target.value)}
                          placeholder="e.g. Bulk Sandblast Media"
                          className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500 font-medium"
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <input 
                          type="number" 
                          min={1}
                          value={item.qty}
                          onChange={(e) => handleUpdateItem(idx, "qty", parseInt(e.target.value) || 0)}
                          className="w-14 border border-slate-200 rounded-lg px-1.5 py-1.5 text-xs text-center font-bold"
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <div className="relative">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-xs">$</span>
                          <input 
                            type="number" 
                            step="any"
                            value={item.unitPrice}
                            onChange={(e) => handleUpdateItem(idx, "unitPrice", parseFloat(e.target.value) || 0)}
                            className="w-24 border border-slate-200 rounded-lg pl-5 pr-1 py-1.5 text-xs text-center font-semibold"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-slate-900">
                        ${(item.qty * item.unitPrice).toFixed(2)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button 
                          type="button" 
                          onClick={() => handleRemoveItem(idx)}
                          className="text-slate-350 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end mt-3 px-2">
              <span className="text-[13px] font-bold text-slate-800">
                PO Subtotal: <strong className="text-[15px] font-black text-slate-900">${total.toFixed(2)}</strong>
              </span>
            </div>
          </div>

          {/* Vendor Invoice File Upload */}
          <div className="mt-2">
            <label className="block text-[12px] font-bold text-slate-700 mb-2">Upload Vendor Invoice (PDF/Image)</label>
            <div 
              onClick={simulateInvoiceUpload}
              className="border-2 border-dashed border-slate-250 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <UploadCloud size={28} className="text-blue-500 mb-2" strokeWidth={1.5} />
              {uploadedFileName ? (
                <div className="text-center">
                  <p className="text-[13px] text-slate-900 font-bold flex items-center gap-1">
                    <FileText size={14} className="text-emerald-500" />
                    {uploadedFileName}
                  </p>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Click area to choose a different invoice file</span>
                </div>
              ) : (
                <p className="text-[13px] text-slate-500">
                  Drop vendor invoice here or <span className="text-blue-600 font-bold hover:underline">click to upload</span>
                </p>
              )}
            </div>
          </div>

          <div className="pb-2">
            <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Purchase Order Notes</label>
            <textarea 
              value={notes}
              onChange={(e)=>setNotes(e.target.value)}
              placeholder="Additional specifications or compliance certifications needed..."
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 resize-none font-medium text-slate-700"
            ></textarea>
          </div>

        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 flex gap-4 bg-white sticky bottom-0 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-750 font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full text-[13px] transition-colors shadow-sm cursor-pointer"
          >
            Create PO
          </button>
        </div>

      </div>
    </div>
  );
}
