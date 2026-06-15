import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface InventoryAddNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

export default function InventoryAddNewModal({ isOpen, onClose, defaultCategory }: InventoryAddNewModalProps) {
  const [category, setCategory] = useState("powder_coating");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("lbs");
  const [minThreshold, setMinThreshold] = useState("");
  const [branch, setBranch] = useState("Houston");
  const [powderType, setPowderType] = useState("Epoxy");

  useEffect(() => {
    if (isOpen) {
      setCategory(defaultCategory || "powder_coating");
      // Reset form fields on open
      setItemName("");
      setQuantity("");
      setMinThreshold("");
      setBranch("Houston");
      setPowderType("Epoxy");
    }
  }, [isOpen, defaultCategory]);

  useEffect(() => {
    // Set appropriate units based on category selection
    if (category === "powder_coating") {
      setUnit("lbs");
    } else if (category === "propane") {
      setUnit("Tanks");
    } else {
      setUnit("pcs");
    }
  }, [category]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[480px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-center bg-white z-10 sticky top-0 border-b border-slate-50">
          <h2 className="text-[20px] font-bold text-slate-900">Add Inventory Item</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-4 overflow-y-auto max-h-[72vh] no-scrollbar">
          
          <div className="flex flex-col gap-4 px-1">
            
            {/* Category Selector */}
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Inventory Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] font-bold text-slate-700 focus:outline-none focus:border-blue-500 bg-white transition-colors shadow-sm"
              >
                <option value="powder_coating">Powder Coating (Color)</option>
                <option value="propane">Propane Tanks</option>
                <option value="other">Other Supplies / Equipment</option>
              </select>
            </div>

            {/* Conditionally Render Fields based on Category */}
            {category === "powder_coating" && (
              <>
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Powder Color & RAL Code</label>
                  <input 
                    type="text" 
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="e.g. Cobalt Blue RAL 5013"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Powder Chemistry Type</label>
                  <select 
                    value={powderType}
                    onChange={(e) => setPowderType(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-slate-700 focus:outline-none focus:border-blue-500 bg-white transition-colors shadow-sm"
                  >
                    <option value="Epoxy">Epoxy</option>
                    <option value="Polyester">Polyester (TGIC)</option>
                    <option value="Urethane">Urethane</option>
                    <option value="Hybrid">Epoxy-Polyester Hybrid</option>
                    <option value="FBE">Fusion Bonded Epoxy (FBE)</option>
                  </select>
                </div>
              </>
            )}

            {category === "propane" && (
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Tank Description / Size</label>
                <input 
                  type="text" 
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. 100 lb Propane Tank"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                />
              </div>
            )}

            {category === "other" && (
              <>
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Item Name</label>
                  <input 
                    type="text" 
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="e.g. Blue Painters Masking Tape"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Unit</label>
                  <input 
                    type="text" 
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="e.g. rolls, cans, pairs"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                  />
                </div>
              </>
            )}

            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                  Quantity ({unit})
                </label>
                <input 
                  type="number" 
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm font-semibold text-center"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                  Min. Threshold ({unit})
                </label>
                <input 
                  type="number" 
                  min="0"
                  value={minThreshold}
                  onChange={(e) => setMinThreshold(e.target.value)}
                  placeholder="0"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 transition-colors shadow-sm font-semibold text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Branch Location</label>
              <select 
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-slate-700 focus:outline-none focus:border-blue-500 bg-white transition-colors shadow-sm"
              >
                <option value="Houston">Houston</option>
                <option value="Dallas">Dallas</option>
                <option value="Austin">Austin</option>
                <option value="San Antonio">San Antonio</option>
              </select>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-100 flex gap-4 bg-white sticky bottom-0 z-10 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-full text-[13px] transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full text-[13px] transition-colors shadow-sm"
          >
            Add to Inventory
          </button>
        </div>

      </div>
    </div>
  );
}
