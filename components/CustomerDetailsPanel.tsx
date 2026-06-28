import React, { useState } from "react";
import { X, QrCode, Edit2, Plus, Phone, Mail, Check, Settings, ShieldAlert, Award } from "lucide-react";

interface CustomerDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
}

export default function CustomerDetailsPanel({ isOpen, onClose, customer }: CustomerDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Requirement Template States
  const [isEditingSpecs, setIsEditingSpecs] = useState(false);
  const [coatingSpec, setCoatingSpec] = useState("ASTM D3359 / SSPC-PA2");
  const [minDft, setMinDft] = useState("3.0");
  const [maxDft, setMaxDft] = useState("5.5");
  const [colorStandard, setColorStandard] = useState("RAL 5010 — Gentian Blue");
  const [holidayVoltage, setHolidayVoltage] = useState("1250");
  const [workflowSteps, setWorkflowSteps] = useState(["Grinding", "Sandblast", "Primer", "Coat", "QC", "Holiday Testing", "Final QC"]);
  const [newWorkflowStep, setNewWorkflowStep] = useState("");
  
  // Progress weights
  const [weights, setWeights] = useState({
    Grinding: 35,
    Sandblasting: 25,
    Coating: 20,
    Inspection: 10,
    Shipping: 10
  });

  // Pricing States
  const [isEditingPricing, setIsEditingPricing] = useState(false);
  const [rushMultiplier, setRushMultiplier] = useState("1.5");
  const [minOrder, setMinOrder] = useState("250.00");
  const [fabPriceHr, setFabPriceHr] = useState("35.00");
  const [fittingPrice, setFittingPrice] = useState("25.00");
  const [flangePrice, setFlangePrice] = useState("45.00");
  const [tubingPrices, setTubingPrices] = useState([
    { size: "2\"", price: "3.50" },
    { size: "4\"", price: "5.00" },
    { size: "6\"", price: "7.50" },
    { size: "8\"", price: "10.00" }
  ]);

  if (!isOpen || !customer) return null;

  const tabs = ["Overview", "Representatives", "Requirements", "Jobs", "Pricing", "Notes"];

  const handleWeightChange = (key: keyof typeof weights, val: number) => {
    setWeights({
      ...weights,
      [key]: val
    });
  };

  const handleAddStep = () => {
    if (!newWorkflowStep.trim()) return;
    setWorkflowSteps([...workflowSteps, newWorkflowStep.trim()]);
    setNewWorkflowStep("");
  };

  const handleRemoveStep = (index: number) => {
    setWorkflowSteps(workflowSteps.filter((_, i) => i !== index));
  };

  const handleUpdateTubingPrice = (index: number, val: string) => {
    const updated = [...tubingPrices];
    updated[index].price = val;
    setTubingPrices(updated);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] transition-opacity"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-[650px] bg-white shadow-2xl z-[210] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-6 border-b border-slate-100 flex justify-between items-start shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-[20px] font-bold shrink-0">
              {customer.initials}
            </div>
            <div className="flex flex-col">
              <h2 className="text-[20px] font-bold text-slate-900 leading-tight mb-1">{customer.name}</h2>
              <div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                  customer.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                }`}>
                  {customer.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <QrCode size={14} />
              Print QR Badge
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-4 shrink-0">
          <div className="bg-slate-50 p-1 rounded-full flex overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[max-content] px-4 py-2 text-[12px] font-bold rounded-full transition-all ${
                  activeTab === tab ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Body Content */}
        <div className="px-6 py-2 flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 pb-8">
          {activeTab === "Overview" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Contact Person</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.contact}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Phone</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.phone}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Email</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.email}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">City</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.location}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Total Jobs</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.jobs}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Total Revenue</span>
                  <span className="block text-[13px] font-bold text-slate-900">{customer.revenue}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Credit Terms</span>
                  <span className="block text-[13px] font-bold text-slate-900">Net 30</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-1">Tax ID</span>
                  <span className="block text-[13px] font-bold text-slate-900">TX-8834291</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                <span className="block text-[11px] font-medium text-slate-400 mb-1">Address</span>
                <span className="block text-[13px] font-bold text-slate-900">1234 Industrial Blvd, {customer.location} TX 77001</span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-full text-[13px] transition-colors shadow-sm flex items-center">
                  <Edit2 size={14} className="mr-1.5" strokeWidth={2.5} />
                  Edit Customer
                </button>
              </div>
            </>
          )}

          {activeTab === "Representatives" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[15px] font-bold text-slate-900">Representatives</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full text-[11px] transition-colors shadow-sm flex items-center gap-1">
                  <Plus size={12} strokeWidth={3} />
                  Add Rep
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[14px] font-bold text-slate-900">{customer.contact}</span>
                    <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      Primary Contact
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center text-[12px] text-slate-550 gap-2">
                      <Phone size={12} className="text-slate-400 shrink-0" strokeWidth={2.5} />
                      {customer.phone}
                    </div>
                    <div className="flex items-center text-[12px] text-slate-550 gap-2">
                      <Mail size={12} className="text-slate-400 shrink-0" strokeWidth={2.5} />
                      {customer.email}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[14px] font-bold text-slate-900">Mike R.</span>
                    <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      Accounts Payable
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center text-[12px] text-slate-555 gap-2">
                      <Phone size={12} className="text-slate-400 shrink-0" strokeWidth={2.5} />
                      +1 (713) 555-0200
                    </div>
                    <div className="flex items-center text-[12px] text-slate-555 gap-2">
                      <Mail size={12} className="text-slate-400 shrink-0" strokeWidth={2.5} />
                      mikr@abcsteelcorp.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Requirements" && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <h3 className="text-[15px] font-bold text-slate-900">Coating Specs & Quality Templates</h3>
                <button 
                  onClick={() => setIsEditingSpecs(!isEditingSpecs)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                >
                  {isEditingSpecs ? <Check size={12} className="text-emerald-600" /> : <Edit2 size={11} />}
                  {isEditingSpecs ? "Finish Setup" : "Edit Specification Templates"}
                </button>
              </div>

              {!isEditingSpecs ? (
                // Display Mode
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <span className="block text-[11px] font-semibold text-slate-455 mb-0.5">Coating Standard Spec</span>
                      <span className="block text-[13px] font-bold text-slate-900">{coatingSpec}</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <span className="block text-[11px] font-semibold text-slate-455 mb-0.5">DFT Range Requirement</span>
                      <span className="block text-[13px] font-bold text-slate-900">{minDft} mil - {maxDft} mil</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <span className="block text-[11px] font-semibold text-slate-455 mb-0.5">Color / RAL Standard</span>
                      <span className="block text-[13px] font-bold text-slate-900">{colorStandard}</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <span className="block text-[11px] font-semibold text-slate-455 mb-0.5">Holiday Test Voltage</span>
                      <span className="block text-[13px] font-bold text-emerald-600">{holidayVoltage}V DC</span>
                    </div>
                  </div>

                  {/* Workflow Steps */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <span className="block text-[11px] font-bold text-slate-450 uppercase tracking-wide mb-2.5">Dynamic Workflow Pipeline (Auto-Generated)</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {workflowSteps.map((step, idx) => (
                        <React.Fragment key={step}>
                          <span className="bg-blue-50 border border-blue-100 text-blue-700 rounded-lg px-2.5 py-1 text-[11px] font-bold shadow-sm">
                            {step}
                          </span>
                          {idx < workflowSteps.length - 1 && <span className="text-slate-350 text-[10px] font-bold">&rarr;</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Progress Weights */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <span className="block text-[11px] font-bold text-slate-450 uppercase tracking-wide mb-3">Admin Progress Completion Weights</span>
                    <div className="grid grid-cols-5 gap-2 text-center">
                      {Object.entries(weights).map(([key, val]) => (
                        <div key={key} className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs">
                          <span className="block text-[10px] text-slate-400 font-bold uppercase truncate">{key}</span>
                          <span className="block text-[14px] font-black text-slate-800 mt-0.5">{val}%</span>
                        </div>
                      ))}
                    </div>
                    <span className="block text-[10px] text-slate-400 text-right mt-2 font-medium">Total: {Object.values(weights).reduce((a,b)=>a+b, 0)}% (Used to plot dashboard charts)</span>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <div className="flex flex-col gap-4 bg-slate-50/50 border border-slate-200 rounded-2xl p-5 animate-in slide-in-from-top-2 duration-200">
                  <h4 className="text-[13px] font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1 flex items-center gap-1">
                    <Settings size={14} className="text-slate-500" />
                    Modify Customer Template Details
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-slate-600 mb-1">Coating Standard Spec</label>
                      <input 
                        type="text" 
                        value={coatingSpec} 
                        onChange={(e)=>setCoatingSpec(e.target.value)} 
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-slate-600 mb-1">Color / RAL Standard</label>
                      <input 
                        type="text" 
                        value={colorStandard} 
                        onChange={(e)=>setColorStandard(e.target.value)} 
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-slate-600 mb-1">DFT Threshold (Min / Max mils)</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          value={minDft} 
                          onChange={(e)=>setMinDft(e.target.value)} 
                          placeholder="Min"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-blue-500 bg-white text-center"
                        />
                        <span className="text-slate-400 text-xs">to</span>
                        <input 
                          type="text" 
                          value={maxDft} 
                          onChange={(e)=>setMaxDft(e.target.value)} 
                          placeholder="Max"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-blue-500 bg-white text-center"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-slate-600 mb-1">Holiday Testing Voltage</label>
                      <input 
                        type="number" 
                        value={holidayVoltage} 
                        onChange={(e)=>setHolidayVoltage(e.target.value)} 
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-blue-500 bg-white text-emerald-600 font-bold"
                      />
                    </div>
                  </div>

                  {/* Workflow Pipeline Builder */}
                  <div className="border-t border-slate-200 pt-3">
                    <label className="block text-[12px] font-bold text-slate-600 mb-2">Build Dynamic Process Workflow Pipeline</label>
                    <div className="flex flex-wrap items-center gap-1.5 mb-3 bg-white border border-slate-200 rounded-lg p-2.5 min-h-[50px]">
                      {workflowSteps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-1 bg-slate-100 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors border border-slate-200 text-slate-700 rounded px-2 py-0.5 text-[11px] font-semibold cursor-pointer" onClick={() => handleRemoveStep(idx)}>
                          {step}
                          <span className="text-[10px] text-slate-400 font-normal">x</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Add step (e.g. Grinding, Primer, Oven)" 
                        value={newWorkflowStep}
                        onChange={(e)=>setNewWorkflowStep(e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-blue-500 bg-white"
                      />
                      <button onClick={handleAddStep} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-[12px] shadow-sm">
                        + Add Step
                      </button>
                    </div>
                  </div>

                  {/* Progress weights editor */}
                  <div className="border-t border-slate-200 pt-3">
                    <label className="block text-[12px] font-bold text-slate-600 mb-2">Adjust Completion Weights (%)</label>
                    <div className="grid grid-cols-5 gap-3">
                      {Object.keys(weights).map((wKey) => {
                        const key = wKey as keyof typeof weights;
                        return (
                          <div key={key}>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase truncate mb-1">{key}</label>
                            <input 
                              type="number"
                              value={weights[key]}
                              onChange={(e) => handleWeightChange(key, parseInt(e.target.value) || 0)}
                              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-[12px] text-center focus:outline-none bg-white font-bold text-slate-700"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "Jobs" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-[15px] font-bold text-slate-900">Job History (3 jobs)</h3>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-start py-3 border-b border-slate-100">
                  <div>
                    <span className="block text-[13px] font-bold text-blue-600 mb-0.5">TK-2847</span>
                    <span className="block text-[12px] text-slate-400">24 parts &middot; Epoxy</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Apr 21, 2026</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] font-bold text-emerald-500 mb-0.5">Completed</span>
                    <span className="block text-[13px] font-bold text-slate-900">$1,240</span>
                  </div>
                </div>

                <div className="flex justify-between items-start py-3 border-b border-slate-100">
                  <div>
                    <span className="block text-[13px] font-bold text-blue-600 mb-0.5">TK-2842</span>
                    <span className="block text-[12px] text-slate-400">33 parts &middot; Epoxy</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Apr 19, 2026</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] font-bold text-purple-500 mb-0.5">Active</span>
                    <span className="block text-[13px] font-bold text-slate-900">$1,950</span>
                  </div>
                </div>

                <div className="flex justify-between items-start py-3 border-b border-slate-100">
                  <div>
                    <span className="block text-[13px] font-bold text-blue-600 mb-0.5">TK-2838</span>
                    <span className="block text-[12px] text-slate-400">9 parts &middot; Hybrid</span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Apr 17, 2026</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] font-bold text-emerald-500 mb-0.5">Completed</span>
                    <span className="block text-[13px] font-bold text-slate-900">$590</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Pricing" && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <h3 className="text-[15px] font-bold text-slate-900">Dynamic Pricing Charts</h3>
                <button 
                  onClick={() => setIsEditingPricing(!isEditingPricing)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                >
                  {isEditingPricing ? <Check size={12} className="text-emerald-600" /> : <Edit2 size={11} />}
                  {isEditingPricing ? "Finish Setup" : "Edit Customer Rates"}
                </button>
              </div>

              {!isEditingPricing ? (
                // Display Mode
                <div className="flex flex-col gap-3.5">
                  <div>
                    <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-wide mb-2">Tubing Pricing Chart (per linear foot)</h4>
                    <div className="border border-slate-100 rounded-xl overflow-hidden shadow-xs bg-white">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-4 py-2.5 text-[10px] font-bold text-slate-450 uppercase">Pipe Size</th>
                            <th className="px-4 py-2.5 text-[10px] font-bold text-slate-450 uppercase">Standard Rate / ft</th>
                            <th className="px-4 py-2.5 text-[10px] font-bold text-slate-455 uppercase">Rush Multiplier Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[13px]">
                          {tubingPrices.map((tp, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/30">
                              <td className="px-4 py-2.5 font-bold text-slate-900">{tp.size}</td>
                              <td className="px-4 py-2.5 font-medium text-slate-700">${parseFloat(tp.price).toFixed(2)}</td>
                              <td className="px-4 py-2.5 font-bold text-orange-550">${(parseFloat(tp.price) * parseFloat(rushMultiplier)).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-wide mt-2 mb-1">Standard Itemized & Hourly Pricing Charts</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <span className="block text-[11px] font-semibold text-slate-400 mb-0.5">Flanges Rate (per unit)</span>
                      <span className="block text-[14px] font-bold text-slate-900">${parseFloat(flangePrice).toFixed(2)}</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <span className="block text-[11px] font-semibold text-slate-400 mb-0.5">Fittings Rate (per unit)</span>
                      <span className="block text-[14px] font-bold text-slate-900">${parseFloat(fittingPrice).toFixed(2)}</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <span className="block text-[11px] font-semibold text-slate-400 mb-0.5">Fabrication / Grinding Rate (per hr)</span>
                      <span className="block text-[14px] font-bold text-slate-900">${parseFloat(fabPriceHr).toFixed(2)}</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="block text-[11px] font-semibold text-slate-400 mb-0.5">Rush Multiplier</span>
                        <span className="block text-[14px] font-bold text-orange-600">{rushMultiplier}x multiplier</span>
                      </div>
                      <ShieldAlert size={20} className="text-orange-400" />
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="block text-[11px] font-semibold text-slate-400 mb-0.5">Minimum Order Invoicing Baseline</span>
                    <span className="block text-[14px] font-bold text-slate-900">${parseFloat(minOrder).toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <div className="flex flex-col gap-4 bg-slate-50/50 border border-slate-200 rounded-2xl p-5 animate-in slide-in-from-top-2 duration-200">
                  <h4 className="text-[13px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center gap-1.5">
                    <Award size={15} className="text-slate-500" />
                    Configure Customer Pricing Rule Cards
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-slate-600 mb-1">Rush pricing markup (multiplier)</label>
                      <input 
                        type="text" 
                        value={rushMultiplier}
                        onChange={(e)=>setRushMultiplier(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-slate-600 mb-1">Minimum Order Minimum ($)</label>
                      <input 
                        type="text" 
                        value={minOrder}
                        onChange={(e)=>setMinOrder(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-slate-600 mb-1">Fabrication / Grinding hourly rate ($)</label>
                      <input 
                        type="text" 
                        value={fabPriceHr}
                        onChange={(e)=>setFabPriceHr(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-blue-500 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-slate-600 mb-1">Fittings standard rate per unit ($)</label>
                      <input 
                        type="text" 
                        value={fittingPrice}
                        onChange={(e)=>setFittingPrice(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-blue-500 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-slate-600 mb-1">Flanges standard rate per unit ($)</label>
                      <input 
                        type="text" 
                        value={flangePrice}
                        onChange={(e)=>setFlangePrice(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:outline-none focus:border-blue-500 bg-white font-bold"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <label className="block text-[12px] font-bold text-slate-600 mb-2">Edit Tubing Price Per Linear Foot</label>
                    <div className="grid grid-cols-4 gap-2">
                      {tubingPrices.map((tp, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-2.5 text-center shadow-xs">
                          <span className="block text-[11px] font-bold text-slate-400">{tp.size} Tubing</span>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <span className="text-[12px] text-slate-400">$</span>
                            <input 
                              type="text"
                              value={tp.price}
                              onChange={(e)=>handleUpdateTubingPrice(idx, e.target.value)}
                              className="w-12 text-center text-[12px] border-b border-slate-300 font-bold focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "Notes" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[15px] font-bold text-slate-900">Notes & Comments</h3>
                <button 
                  onClick={() => setIsAddingNote(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full text-[11px] transition-colors shadow-sm flex items-center gap-1"
                >
                  <Plus size={12} strokeWidth={3} />
                  Add Note
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {isAddingNote && (
                  <div className="bg-[#f8fafc] rounded-xl p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <textarea 
                      placeholder="Enter your note..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-3 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none min-h-[80px] shadow-sm"
                    />
                    <div className="flex items-center gap-1">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-full text-[12px] transition-colors shadow-sm">
                        Save Note
                      </button>
                      <button 
                        onClick={() => setIsAddingNote(false)}
                        className="text-slate-500 hover:text-slate-700 font-bold py-1.5 px-3 rounded-full text-[12px] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">Priority</span>
                    <span className="text-[11px] text-slate-400 font-medium">Apr 20, 2026</span>
                  </div>
                  <p className="text-[13px] text-slate-700 font-medium leading-relaxed">Customer requested prioritization on all Houston orders going forward.</p>
                  <p className="text-[11px] text-slate-400">&mdash; Mike Torres</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
