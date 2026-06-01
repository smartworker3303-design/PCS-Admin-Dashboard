import React, { useState } from "react";
import { X, Check, ChevronRight, ArrowRight, CheckCircle2, Save, Plus, Trash2 } from "lucide-react";

interface NewPipeSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DIAMETER_OPTIONS = [
  '2"', '3"', '4"', '6"', '8"', '10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"'
];

const FITTING_TYPES = [
  'Tee', '45°', '90°', 'Reducer', 'Cap', 'Coupling', 'Cross', 'Other'
];

const FLANGE_SERIES_COLUMNS = ['150', '300', '600', '900', '1500', '3000'] as const;

export default function NewPipeSetupModal({ isOpen, onClose }: NewPipeSetupModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // State variables for interactive controls
  const [pipeType, setPipeType] = useState<string>("Tubing");
  const [primerRequired, setPrimerRequired] = useState<boolean>(true);
  const [coatingApplicability, setCoatingApplicability] = useState<string[]>(["External", "Flange"]);
  const [applySetupTo, setApplySetupTo] = useState<string>("All Parts");
  const [processTemplate, setProcessTemplate] = useState<string>("Standard Epoxy - Full Process");
  const [autoAssignPipeIds, setAutoAssignPipeIds] = useState<boolean>(true);

  const toggleCoatingApplicability = (val: string) => {
    if (coatingApplicability.includes(val)) {
      setCoatingApplicability(coatingApplicability.filter(x => x !== val));
    } else {
      setCoatingApplicability([...coatingApplicability, val]);
    }
  };

  // Helper to restrict numeric inputs to positive numbers only
  const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["-", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Material & Footage Breakdown state
  const [spoolFootages, setSpoolFootages] = useState<{ diameter: string; quantity: string; footage: string }[]>([
    { diameter: "6\"", quantity: "1", footage: "" }
  ]);

  // Reachable Welds Grinded state
  const [welds, setWelds] = useState<{ diameter: string; quantity: string }[]>([
    { diameter: "6\"", quantity: "" }
  ]);

  // Flanges state
  const [flanges, setFlanges] = useState<{
    diameter: string;
    series: string;
    quantity: string;
  }[]>([
    { diameter: "6\"", series: "150", quantity: "" }
  ]);

  // Fittings state
  const [fittings, setFittings] = useState<{
    fittingType: string;
    diameter: string;
    quantity: string;
  }[]>([
    { fittingType: "Tee", diameter: "6\"", quantity: "" }
  ]);

  // Spool Footages handlers
  const addSpoolFootage = () => {
    setSpoolFootages([...spoolFootages, { diameter: "6\"", quantity: "1", footage: "" }]);
  };
  const removeSpoolFootage = (index: number) => {
    setSpoolFootages(spoolFootages.filter((_, i) => i !== index));
  };
  const updateSpoolFootage = (index: number, field: "footage" | "diameter" | "quantity", value: string) => {
    const updated = [...spoolFootages];
    updated[index][field] = value;
    setSpoolFootages(updated);
  };

  // Welds handlers
  const addWeld = () => {
    setWelds([...welds, { diameter: "6\"", quantity: "" }]);
  };
  const removeWeld = (index: number) => {
    setWelds(welds.filter((_, i) => i !== index));
  };
  const updateWeld = (index: number, field: "diameter" | "quantity", value: string) => {
    const updated = [...welds];
    updated[index][field] = value;
    setWelds(updated);
  };

  // Flanges handlers
  const addFlange = () => {
    setFlanges([...flanges, { diameter: "6\"", series: "150", quantity: "" }]);
  };
  const removeFlange = (index: number) => {
    setFlanges(flanges.filter((_, i) => i !== index));
  };
  const updateFlange = (index: number, field: "diameter" | "series" | "quantity", value: string) => {
    const updated = [...flanges];
    updated[index][field] = value;
    setFlanges(updated);
  };

  // Fittings handlers
  const addFitting = () => {
    setFittings([...fittings, { fittingType: "Tee", diameter: "6\"", quantity: "" }]);
  };
  const removeFitting = (index: number) => {
    setFittings(fittings.filter((_, i) => i !== index));
  };
  const updateFitting = (index: number, field: "fittingType" | "diameter" | "quantity", value: string) => {
    const updated = [...fittings];
    updated[index][field] = value;
    setFittings(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-[800px] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-3 flex items-start justify-between bg-white z-10 sticky top-0">
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 mb-3.5">New Pipe Process Setup</h2>
            
            {/* Stepper */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5">
                {currentStep > 1 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                )}
                <span className={`text-[12px] font-medium ${currentStep === 1 ? 'text-slate-900' : 'text-slate-500'}`}>Pipe Details</span>
              </div>
              <ChevronRight size={14} className="text-slate-300 mx-1" />
              
              <div className="flex items-center gap-1.5">
                {currentStep > 2 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : currentStep === 2 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400">2</span>
                  </div>
                )}
                <span className={`text-[12px] font-medium ${currentStep === 2 ? 'text-slate-900' : 'text-slate-500'}`}>Coating Spec</span>
              </div>
              <ChevronRight size={14} className="text-slate-300 mx-1" />
              
              <div className="flex items-center gap-1.5">
                {currentStep > 3 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : currentStep === 3 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400">3</span>
                  </div>
                )}
                <span className={`text-[12px] font-medium ${currentStep >= 3 ? 'text-slate-900' : 'text-slate-500'}`}>Process Assignment</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50 mt-[-4px]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pt-6 pb-8 overflow-y-auto no-scrollbar flex flex-col relative">
          
          {currentStep === 1 && (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[30px] h-[30px] rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[14px] shadow-sm">
                  1
                </div>
                <h3 className="text-[17px] font-bold text-slate-900">Pipe Details</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">System Part ID</label>
                  <input type="text" placeholder="e.g. P-2241" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Client Pipe ID</label>
                  <input type="text" placeholder="e.g. CP-001" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
                
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Pipe Description</label>
                  <input type="text" placeholder='e.g. 6" Carbon Steel Pipe' className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Welder Info</label>
                  <input type="text" placeholder="e.g. W. Johnson — Cert #2234" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-6">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Pipe Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Tubing", "Fittings", "Flanges", "Fabrication"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPipeType(type)}
                        className={
                          pipeType === type
                            ? "bg-blue-600 text-white font-medium py-2 rounded-[10px] text-[13px] shadow-sm cursor-pointer"
                            : "bg-white border border-slate-200 text-slate-600 font-medium py-2 rounded-[10px] text-[13px] hover:bg-slate-50 transition-colors cursor-pointer"
                        }
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Material Type</label>
                  <input type="text" placeholder="e.g. Carbon Steel" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              {/* Spool Material & Footage Breakdown */}
              <div className="mb-6 border border-slate-100 rounded-2xl p-5 bg-slate-50/30">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[13px] font-bold text-slate-800">Spool Material & Footage Breakdown</h4>
                  <button 
                    type="button"
                    onClick={addSpoolFootage}
                    className="text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg text-[12px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    Add Diameter
                  </button>
                </div>
                
                <div className="space-y-2">
                  {spoolFootages.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 animate-in fade-in duration-150">
                      <div className="w-[80px] shrink-0">
                        <label className="block text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Quantity</label>
                        <input 
                          type="number" 
                          min="1"
                          step="1"
                          value={item.quantity}
                          placeholder="e.g. 1" 
                          onKeyDown={handleNumberKeyDown}
                          onChange={(e) => updateSpoolFootage(index, "quantity", e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 bg-white" 
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Footage (ft)</label>
                        <input 
                          type="number" 
                          min="0"
                          step="any"
                          value={item.footage}
                          placeholder="e.g. 6" 
                          onKeyDown={handleNumberKeyDown}
                          onChange={(e) => updateSpoolFootage(index, "footage", e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 bg-white" 
                        />
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Diameter</label>
                        <select
                          value={item.diameter}
                          onChange={(e) => updateSpoolFootage(index, "diameter", e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 bg-white"
                        >
                          {DIAMETER_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {spoolFootages.length > 1 && (
                        <div className="self-end pb-1">
                          <button 
                            type="button"
                            onClick={() => removeSpoolFootage(index)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Spool Assembly Visual Preview */}
                {spoolFootages.some(item => item.footage) && (
                  <div className="mt-5 pt-4 border-t border-slate-200/60 animate-in fade-in duration-200">
                    <span className="block text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">Spool Assembly Visual Preview</span>
                    <div className="bg-slate-900 rounded-xl p-6 flex items-center justify-center min-h-[110px] shadow-inner overflow-x-auto no-scrollbar">
                      <div className="flex items-center gap-0">
                        {spoolFootages.map((item, index) => {
                          const footageVal = parseFloat(item.footage) || 0;
                          const qtyVal = parseInt(item.quantity) || 1;
                          if (footageVal <= 0) return null;
                          
                          // Convert diameter option like '6"' to number for styling height
                          const diameterNum = parseInt(item.diameter) || 4; 
                          
                          // Determine proportional heights and widths for visualization
                          const heightMap: Record<number, number> = {
                            2: 18, 3: 22, 4: 28, 6: 38, 8: 46, 10: 54, 12: 62, 14: 70, 16: 78, 18: 86, 20: 94, 22: 98, 24: 104
                          };
                          const height = heightMap[diameterNum] || 38;
                          const width = Math.min(Math.max(footageVal * 12, 60), 220);
                          
                          return (
                            <React.Fragment key={index}>
                              {index > 0 && (
                                <div className="h-12 w-[3px] bg-amber-500 relative flex items-center justify-center shrink-0" title="Weld Seam">
                                  <div className="absolute -top-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                                  <div className="absolute -bottom-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                                </div>
                              )}
                              <div 
                                style={{ 
                                  height: `${height}px`, 
                                  width: `${width}px` 
                                }}
                                className="bg-gradient-to-r from-slate-600 to-slate-700 border-y border-slate-500 flex flex-col items-center justify-center text-white text-[10px] font-bold rounded-[3px] transition-all shadow-md relative group shrink-0"
                              >
                                <span className="truncate max-w-full px-1">{qtyVal > 1 ? `${qtyVal}x ` : ""}{item.diameter}</span>
                                <span className="text-[8px] opacity-75 truncate max-w-full px-1">{footageVal} ft</span>
                                
                                {/* Tooltip on hover */}
                                <div className="absolute bottom-full mb-2 bg-slate-950 text-white text-[10px] py-1.5 px-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-50">
                                  Segment {index + 1}: {qtyVal}x {item.diameter} pipe ({footageVal} ft)
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2 text-center">
                      ⚡ Visualizes welded pipe segments from left to right. Orange indicators represent weld seams.
                    </p>
                  </div>
                )}
              </div>

              {/* Reachable Welds Grinded */}
              <div className="mb-6 border border-slate-100 rounded-2xl p-5 bg-slate-50/30">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[13px] font-bold text-slate-800">Reachable Welds Grinded</h4>
                  <button 
                    type="button"
                    onClick={addWeld}
                    className="text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg text-[12px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    Add Weld Row
                  </button>
                </div>
                
                <div className="space-y-2">
                  {welds.map((weld, index) => (
                    <div key={index} className="flex items-center gap-3 animate-in fade-in duration-150">
                      <div className="flex-1">
                        <label className="block text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Diameter</label>
                        <select
                          value={weld.diameter}
                          onChange={(e) => updateWeld(index, "diameter", e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 bg-white"
                        >
                          {DIAMETER_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Quantity</label>
                        <input 
                          type="number" 
                          min="0"
                          step="1"
                          value={weld.quantity}
                          placeholder="e.g. 3" 
                          onKeyDown={handleNumberKeyDown}
                          onChange={(e) => updateWeld(index, "quantity", e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 bg-white" 
                        />
                      </div>

                      {welds.length > 1 && (
                        <div className="self-end pb-1">
                          <button 
                            type="button"
                            onClick={() => removeWeld(index)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Associated Flanges */}
              <div className="mb-6 border border-slate-100 rounded-2xl p-5 bg-slate-50/30">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[13px] font-bold text-slate-800">Associated Flanges</h4>
                  <button 
                    type="button"
                    onClick={addFlange}
                    className="text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg text-[12px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    Add Flange
                  </button>
                </div>
                
                <div className="space-y-2">
                  {flanges.map((flange, index) => (
                    <div key={index} className="flex items-center gap-3 animate-in fade-in duration-150">
                      <div className="flex-1">
                        <label className="block text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Flange Series</label>
                        <select
                          value={flange.series}
                          onChange={(e) => updateFlange(index, "series", e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 bg-white font-medium"
                        >
                          {FLANGE_SERIES_COLUMNS.map(col => (
                            <option key={col} value={col}>#{col}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Diameter</label>
                        <select
                          value={flange.diameter}
                          onChange={(e) => updateFlange(index, "diameter", e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 bg-white"
                        >
                          {DIAMETER_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Quantity</label>
                        <input 
                          type="number" 
                          min="0"
                          step="1"
                          value={flange.quantity}
                          placeholder="e.g. 2" 
                          onKeyDown={handleNumberKeyDown}
                          onChange={(e) => updateFlange(index, "quantity", e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 bg-white" 
                        />
                      </div>

                      {flanges.length > 1 && (
                        <div className="self-end pb-1">
                          <button 
                            type="button"
                            onClick={() => removeFlange(index)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Associated Fittings */}
              <div className="mb-6 border border-slate-100 rounded-2xl p-5 bg-slate-50/30">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[13px] font-bold text-slate-800">Associated Fittings</h4>
                  <button 
                    type="button"
                    onClick={addFitting}
                    className="text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg text-[12px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    Add Fitting
                  </button>
                </div>
                
                <div className="space-y-2">
                  {fittings.map((fitting, index) => (
                    <div key={index} className="flex items-center gap-3 animate-in fade-in duration-150">
                      <div className="flex-1">
                        <label className="block text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Fitting Type</label>
                        <select
                          value={fitting.fittingType}
                          onChange={(e) => updateFitting(index, "fittingType", e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 bg-white"
                        >
                          {FITTING_TYPES.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Diameter</label>
                        <select
                          value={fitting.diameter}
                          onChange={(e) => updateFitting(index, "diameter", e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 bg-white"
                        >
                          {DIAMETER_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-[10px] font-medium text-slate-400 mb-0.5 uppercase tracking-wider">Quantity</label>
                        <input 
                          type="number" 
                          min="0"
                          step="1"
                          value={fitting.quantity}
                          placeholder="e.g. 2" 
                          onKeyDown={handleNumberKeyDown}
                          onChange={(e) => updateFitting(index, "quantity", e.target.value)}
                          className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 bg-white" 
                        />
                      </div>

                      {fittings.length > 1 && (
                        <div className="self-end pb-1">
                          <button 
                            type="button"
                            onClick={() => removeFitting(index)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>


              <div className="mb-6">
                <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Special Instructions</label>
                <textarea 
                  placeholder="Any special handling or coating requirements..." 
                  rows={3}
                  className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-end pt-2">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  Next
                  <ArrowRight size={16} className="ml-1.5" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[30px] h-[30px] rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[14px] shadow-sm">
                  2
                </div>
                <h3 className="text-[17px] font-bold text-slate-900">Coating Specification</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">External Coating Type</label>
                  <input type="text" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Internal Coating Type</label>
                  <input type="text" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Primer Required</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPrimerRequired(true)}
                      className={
                        primerRequired
                          ? "bg-blue-600 text-white font-medium py-2.5 rounded-[10px] text-[13px] shadow-sm cursor-pointer"
                          : "bg-white border border-slate-200 text-slate-600 font-medium py-2.5 rounded-[10px] text-[13px] hover:bg-slate-50 transition-colors cursor-pointer"
                      }
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrimerRequired(false)}
                      className={
                        !primerRequired
                          ? "bg-blue-600 text-white font-medium py-2.5 rounded-[10px] text-[13px] shadow-sm cursor-pointer"
                          : "bg-white border border-slate-200 text-slate-600 font-medium py-2.5 rounded-[10px] text-[13px] hover:bg-slate-50 transition-colors cursor-pointer"
                      }
                    >
                      No
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Required Mil Thickness</label>
                  <div className="relative">
                    <input type="text" defaultValue="3.0" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500 pr-10" />
                    <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[13px] text-slate-400">
                      mil
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-5">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Customer Specification</label>
                  <input type="text" defaultValue="ASTM D3359" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Coating Standard</label>
                  <input type="text" defaultValue="SSPC-PA2" className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Coating Applicability</label>
                <div className="grid grid-cols-3 gap-3">
                  {["External", "Internal", "Flange"].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => toggleCoatingApplicability(app)}
                      className={
                        coatingApplicability.includes(app)
                          ? "bg-blue-600 text-white font-medium py-2.5 rounded-xl text-[13px] shadow-sm cursor-pointer"
                          : "bg-white border border-slate-200 text-slate-600 font-medium py-2.5 rounded-xl text-[13px] hover:bg-slate-50 transition-colors cursor-pointer"
                      }
                    >
                      {app}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material & Coating Summary Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#eff6ff] border border-blue-100 rounded-[14px] p-5">
                  <h4 className="text-[12px] font-bold text-blue-700 mb-3">Coating Summary</h4>
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                    <p className="text-[12px] text-slate-500">External: <span className="font-bold text-slate-900">{coatingApplicability.includes("External") ? "Epoxy" : "None"}</span></p>
                    <p className="text-[12px] text-slate-500">Internal: <span className="font-bold text-slate-900">{coatingApplicability.includes("Internal") ? "Yes" : "None"}</span></p>
                    <p className="text-[12px] text-slate-500">Primer: <span className="font-bold text-slate-900">{primerRequired ? "Yes" : "No"}</span></p>
                    <p className="text-[12px] text-slate-500">Min Thickness: <span className="font-bold text-slate-900">3.0 mil</span></p>
                    <p className="text-[12px] text-slate-500">Standard: <span className="font-bold text-slate-900">SSPC-PA2</span></p>
                    <p className="text-[12px] text-slate-500">Spec: <span className="font-bold text-slate-900">ASTM D3359</span></p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-[14px] p-5">
                  <h4 className="text-[12px] font-bold text-slate-700 mb-3">Material Summary</h4>
                  <div className="space-y-3 max-h-[140px] overflow-y-auto no-scrollbar">
                    {/* Footage */}
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">Footage Breakdown</span>
                      <div className="flex flex-wrap gap-1.5">
                        {spoolFootages.map((item, idx) => (
                          <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                            {item.quantity || '1'}x {item.diameter} ({item.footage || '0'} ft)
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Welds */}
                    {welds.some(w => w.quantity) && (
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">Welds Grinded</span>
                        <div className="flex flex-wrap gap-1.5">
                          {welds.filter(w => w.quantity).map((w, idx) => (
                            <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                              Qty {w.quantity} @ {w.diameter}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Flanges */}
                    {flanges.some(f => f.quantity) && (
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">Flanges</span>
                        <div className="flex flex-wrap gap-1.5">
                          {flanges.filter(f => f.quantity).map((flange, idx) => (
                            <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                              {flange.quantity}x {flange.diameter} Flange (#{flange.series})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Fittings */}
                    {fittings.some(f => f.quantity) && (
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider mb-1">Fittings</span>
                        <div className="flex flex-wrap gap-1.5">
                          {fittings.filter(f => f.quantity).map((fitting, idx) => (
                            <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                              {fitting.quantity}x {fitting.fittingType} ({fitting.diameter})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-between pt-2">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  <ArrowRight size={16} className="mr-1.5 rotate-180" />
                  Back
                </button>
                <button 
                  onClick={() => setCurrentStep(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  Next
                  <ArrowRight size={16} className="ml-1.5" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[30px] h-[30px] rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[14px] shadow-sm">
                  3
                </div>
                <h3 className="text-[17px] font-bold text-slate-900">Process Assignment</h3>
              </div>
              
              <div className="mb-6">
                <label className="block text-[13px] font-medium text-slate-700 mb-2">Apply Setup To</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setApplySetupTo("All Parts")}
                    className={
                      applySetupTo === "All Parts"
                        ? "flex-1 bg-blue-600 text-white font-medium py-2.5 rounded-xl text-[13px] shadow-sm cursor-pointer"
                        : "flex-1 bg-white border border-slate-200 text-slate-600 font-medium py-2.5 rounded-xl text-[13px] hover:bg-slate-50 transition-colors cursor-pointer"
                    }
                  >
                    All Parts
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplySetupTo("Selected Parts")}
                    className={
                      applySetupTo === "Selected Parts"
                        ? "flex-1 bg-blue-600 text-white font-medium py-2.5 rounded-xl text-[13px] shadow-sm cursor-pointer"
                        : "flex-1 bg-white border border-slate-200 text-slate-600 font-medium py-2.5 rounded-xl text-[13px] hover:bg-slate-50 transition-colors cursor-pointer"
                    }
                  >
                    Selected Parts
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[13px] font-medium text-slate-700 mb-2">Process Template</label>
                <div className="flex flex-col gap-2">
                  {["Standard Epoxy - Full Process", "Quick Coat - Polyester", "Heavy Duty - Industrial", "Custom Template"].map((tpl) => (
                    <button
                      key={tpl}
                      type="button"
                      onClick={() => setProcessTemplate(tpl)}
                      className={
                        processTemplate === tpl
                          ? "flex items-center justify-between px-5 py-3 border border-blue-500 bg-blue-50/50 rounded-xl transition-colors cursor-pointer text-left"
                          : "flex items-center justify-between px-5 py-3 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left"
                      }
                    >
                      <span className={
                        processTemplate === tpl
                          ? "text-[13px] font-bold text-blue-700"
                          : "text-[13px] font-medium text-slate-700"
                      }>
                        {tpl}
                      </span>
                      {processTemplate === tpl && (
                        <CheckCircle2 size={16} className="text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 p-4 border border-slate-200 rounded-xl bg-white">
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900">Auto Assign Pipe IDs</h4>
                  <p className="text-[12px] text-slate-500 mt-0.5">System generates unique IDs for each pipe</p>
                </div>
                <div 
                  onClick={() => setAutoAssignPipeIds(!autoAssignPipeIds)}
                  className={`w-10 h-6 rounded-full flex items-center px-1 cursor-pointer shadow-inner transition-all ${
                    autoAssignPipeIds ? "bg-blue-600 justify-end" : "bg-slate-200 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
                <h4 className="text-[13px] font-bold text-slate-900 mb-3">Process Flow Preview</h4>
                <div className="flex flex-wrap items-center gap-y-2.5 gap-x-1.5">
                  {[
                    "Receiving", "Pipe Process Setup", "Pre-Sandblasting", "Sandblasting", 
                    "Primer", "Coating", "Oven", "DFT Measurement", "QC", 
                    "Supervisor Review", "Delivery"
                  ].map((step, index, arr) => (
                    <React.Fragment key={step}>
                      <div className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded">
                        {step}
                      </div>
                      {index < arr.length - 1 && (
                        <ArrowRight size={12} className="text-slate-300 mx-0.5" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-between pt-2">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  <ArrowRight size={16} className="mr-1.5 rotate-180" />
                  Back
                </button>
                <div className="flex gap-3">
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center">
                    <Save size={16} className="mr-1.5" />
                    Save Draft
                  </button>
                  <button 
                    onClick={() => setCurrentStep(4)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 px-6 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                  >
                    <CheckCircle2 size={16} className="mr-1.5" />
                    Apply to Parts
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-in zoom-in-95 duration-300 flex flex-col items-center justify-center py-16">
              <div className="w-[60px] h-[60px] rounded-full bg-emerald-50 flex items-center justify-center mb-5 border border-emerald-100">
                <CheckCircle2 size={32} className="text-emerald-500" strokeWidth={2.5} />
              </div>
              <h2 className="text-[20px] font-bold text-emerald-500 mb-2">Pipe Process Setup Saved!</h2>
              <p className="text-[14px] text-slate-500 font-medium text-center">Configuration applied to all selected parts.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
