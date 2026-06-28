import React, { useState, useEffect } from "react";
import { X, Check, ChevronRight, ArrowRight, Plus, Camera, Trash2, Image as ImageIcon, UploadCloud } from "lucide-react";

interface NewReceivingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ClientRep {
  name: string;
  phone: string;
  email: string;
}

interface ClientCompany {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  reps: ClientRep[];
}

const CLIENT_COMPANIES: ClientCompany[] = [
  {
    name: "ABC Steel Corp",
    companyName: "ABC Steel Corporation",
    phone: "+1 (713) 555-0142",
    email: "contact@abcsteel.com",
    reps: [
      { name: "John Smith", phone: "+1 (713) 555-0142", email: "jsmith@abcsteel.com" },
      { name: "Mike R. (Accounts Payable)", phone: "+1 (713) 555-0200", email: "mikr@abcsteelcorp.com" }
    ]
  },
  {
    name: "Metro Fab LLC",
    companyName: "Metro Fabrication LLC",
    phone: "+1 (214) 555-0238",
    email: "lwang@metrofab.com",
    reps: [
      { name: "Lisa Wang", phone: "+1 (214) 555-0238", email: "lwang@metrofab.com" },
      { name: "Sarah Connor", phone: "+1 (214) 555-9000", email: "sconnor@metrofab.com" }
    ]
  },
  {
    name: "Gulf Coast Ind.",
    companyName: "Gulf Coast Industries",
    phone: "+1 (713) 555-0374",
    email: "mdavis@gulfcoast.com",
    reps: [
      { name: "Mark Davis", phone: "+1 (713) 555-0374", email: "mdavis@gulfcoast.com" },
      { name: "James Dean", phone: "+1 (713) 555-7777", email: "jdean@gulfcoast.com" }
    ]
  },
  {
    name: "Lone Star Mfg",
    companyName: "Lone Star Manufacturing",
    phone: "+1 (512) 555-0491",
    email: "achen@lonestar.com",
    reps: [
      { name: "Amy Chen", phone: "+1 (512) 555-0491", email: "achen@lonestar.com" },
      { name: "Bob Dylan", phone: "+1 (512) 555-8888", email: "bdylan@lonestar.com" }
    ]
  },
  {
    name: "Tex-Mex Metals",
    companyName: "Tex-Mex Metals Inc.",
    phone: "+1 (210) 555-0156",
    email: "cruiz@texmex.com",
    reps: [
      { name: "Carlos Ruiz", phone: "+1 (210) 555-0156", email: "cruiz@texmex.com" }
    ]
  },
  {
    name: "Iron Works TX",
    companyName: "Iron Works Texas",
    phone: "+1 (713) 555-0627",
    email: "blee@ironworks.com",
    reps: [
      { name: "Bobby Lee", phone: "+1 (713) 555-0627", email: "blee@ironworks.com" }
    ]
  },
  {
    name: "Southern Steels",
    companyName: "Southern Steels Corp",
    phone: "+1 (214) 555-0783",
    email: "jpark@southernsteel.com",
    reps: [
      { name: "Jennifer Park", phone: "+1 (214) 555-0783", email: "jpark@southernsteel.com" }
    ]
  },
  {
    name: "Coastal Pipeline",
    companyName: "Coastal Pipeline Services",
    phone: "+1 (713) 555-0899",
    email: "dbrown@coastal.com",
    reps: [
      { name: "David Brown", phone: "+1 (713) 555-0899", email: "dbrown@coastal.com" }
    ]
  }
];

interface PartItem {
  id: string;
  clientPartId: string;
  classification: "Fabrication" | "Tubing" | "Fitting" | "Flange";
  description: string;
  qty: number;
  totalFootage?: number;
  coatedFootage?: number;
  isPartRush: boolean;
  photoName?: string;
}

export default function NewReceivingModal({ isOpen, onClose }: NewReceivingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // Form interactive states
  const [selectedClientIndex, setSelectedClientIndex] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  
  const [selectedRepIndex, setSelectedRepIndex] = useState(0);
  const [repName, setRepName] = useState("");
  const [repPhone, setRepPhone] = useState("");
  const [repEmail, setRepEmail] = useState("");

  // Step 2 states
  const [poNumber, setPoNumber] = useState("PO-2026-041");
  const [costCode, setCostCode] = useState("CC-HOU-101");
  const [dueDate, setDueDate] = useState("May 01, 2026");
  const [priority, setPriority] = useState("High");
  const [paintType, setPaintType] = useState("Epoxy");
  const [isRush, setIsRush] = useState(false);

  // Step 3 (Parts List) states
  const [parts, setParts] = useState<PartItem[]>([
    {
      id: "PCS-P-001",
      clientPartId: "P-101",
      classification: "Tubing",
      description: "6\" Carbon Steel Pipe",
      qty: 10,
      totalFootage: 100,
      coatedFootage: 40,
      isPartRush: false,
      photoName: "pipe_delivery_sketch.jpg"
    },
    {
      id: "PCS-P-002",
      clientPartId: "FL-202",
      classification: "Flange",
      description: "6\" Flange Class 150",
      qty: 4,
      isPartRush: true,
      photoName: ""
    }
  ]);

  // Inputs for adding a new part
  const [newClassification, setNewClassification] = useState<"Fabrication" | "Tubing" | "Fitting" | "Flange">("Tubing");
  const [newClientPartId, setNewClientPartId] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newQty, setNewQty] = useState<number>(1);
  const [newTotalFootage, setNewTotalFootage] = useState<string>("");
  const [newCoatedFootage, setNewCoatedFootage] = useState<string>("");
  const [newIsPartRush, setNewIsPartRush] = useState(false);
  const [newPhotoName, setNewPhotoName] = useState("");

  // Initialize fields when modal opens or customer selection changes
  useEffect(() => {
    if (isOpen) {
      handleClientChange(0);
    }
  }, [isOpen]);

  const handleClientChange = (index: number) => {
    setSelectedClientIndex(index);
    const client = CLIENT_COMPANIES[index];
    if (client) {
      setCompanyName(client.companyName);
      setCompanyPhone(client.phone);
      setCompanyEmail(client.email);

      // Pre-select first rep
      if (client.reps && client.reps.length > 0) {
        handleRepChange(0, client.reps);
      } else {
        setSelectedRepIndex(-1);
        setRepName("");
        setRepPhone("");
        setRepEmail("");
      }
    }
  };

  const handleRepChange = (repIdx: number, repsList?: ClientRep[]) => {
    setSelectedRepIndex(repIdx);
    const list = repsList || CLIENT_COMPANIES[selectedClientIndex].reps;
    const rep = list[repIdx];
    if (rep) {
      setRepName(rep.name);
      setRepPhone(rep.phone);
      setRepEmail(rep.email);
    }
  };

  const handleAddPart = () => {
    if (!newDescription.trim()) return;
    
    const nextIdNum = parts.length > 0 
      ? Math.max(...parts.map(p => parseInt(p.id.replace("PCS-P-", "")) || 0)) + 1 
      : 1;
      
    const padNum = String(nextIdNum).padStart(3, "0");

    const newItem: PartItem = {
      id: `PCS-P-${padNum}`,
      clientPartId: newClientPartId || `C-${100 + nextIdNum}`,
      classification: newClassification,
      description: newDescription,
      qty: newQty,
      totalFootage: newClassification === "Tubing" ? parseFloat(newTotalFootage) || undefined : undefined,
      coatedFootage: newClassification === "Tubing" ? parseFloat(newCoatedFootage) || undefined : undefined,
      isPartRush: newIsPartRush,
      photoName: newPhotoName || undefined
    };

    setParts([...parts, newItem]);

    // Reset fields
    setNewClientPartId("");
    setNewDescription("");
    setNewQty(1);
    setNewTotalFootage("");
    setNewCoatedFootage("");
    setNewIsPartRush(false);
    setNewPhotoName("");
  };

  const handleRemovePart = (id: string) => {
    setParts(parts.filter(p => p.id !== id));
  };

  const simulatePhotoUpload = () => {
    const mockFiles = ["received_part_photo_1.jpg", "incoming_tubing_inspect.png", "fitting_flange_side.jpg", "fab_part_front.jpg"];
    const randomFile = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    setNewPhotoName(randomFile);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[950px] flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-3 flex items-start justify-between bg-white z-10 sticky top-0">
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 mb-3.5">New Receiving Form</h2>
            
            {/* Stepper */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-[12px] font-medium text-slate-500">Customer</span>
              </div>
              <ChevronRight size={14} className="text-slate-300 mx-1" />
              
              <div className="flex items-center gap-1.5">
                {currentStep >= 2 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400">2</span>
                  </div>
                )}
                <span className={`text-[12px] font-medium ${currentStep >= 2 ? 'text-slate-700' : 'text-slate-500'}`}>Paint & PO</span>
              </div>
              <ChevronRight size={14} className="text-slate-300 mx-1" />
              
              <div className="flex items-center gap-1.5">
                {currentStep >= 3 ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400">3</span>
                  </div>
                )}
                <span className={`text-[12px] font-medium ${currentStep >= 3 ? 'text-slate-700' : 'text-slate-500'}`}>Parts Setup</span>
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
        <div className="px-8 pt-5 pb-8 overflow-y-auto no-scrollbar flex flex-col relative">
          
          {currentStep === 1 && (
            <div className="animate-in fade-in duration-200">
              <h3 className="text-[15px] font-bold text-slate-800 mb-5">Customer Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Customer Profile</label>
                  <select 
                    value={selectedClientIndex}
                    onChange={(e) => handleClientChange(parseInt(e.target.value) || 0)}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm cursor-pointer"
                  >
                    {CLIENT_COMPANIES.map((company, index) => (
                      <option key={index} value={index}>{company.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Company Name (Autofilled)</label>
                  <input 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Company name"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 font-medium text-slate-700 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Company Phone</label>
                  <input 
                    type="text" 
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    placeholder="+1 (xxx) xxx-xxxx"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-600 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Company Email</label>
                  <input 
                    type="text" 
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    placeholder="contact@company.com"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-600 shadow-sm"
                  />
                </div>
              </div>

              <h3 className="text-[15px] font-bold text-slate-800 mb-5">Representative</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Rep Name</label>
                  <select 
                    value={selectedRepIndex}
                    onChange={(e) => handleRepChange(parseInt(e.target.value) || 0)}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm cursor-pointer"
                  >
                    {CLIENT_COMPANIES[selectedClientIndex]?.reps.map((rep, idx) => (
                      <option key={idx} value={idx}>{rep.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Rep Phone (Autofilled)</label>
                  <input 
                    type="text" 
                    value={repPhone}
                    onChange={(e) => setRepPhone(e.target.value)}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 font-semibold text-slate-700 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Rep Email (Autofilled)</label>
                  <input 
                    type="text" 
                    value={repEmail}
                    onChange={(e) => setRepEmail(e.target.value)}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 font-semibold text-slate-700 shadow-sm"
                  />
                </div>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-end mt-2">
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
              <h3 className="text-[15px] font-bold text-slate-800 mb-5">PO & Cost Code</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">PO Number</label>
                  <input 
                    type="text" 
                    placeholder="PO-2026-XXX"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Cost Code</label>
                  <input 
                    type="text" 
                    placeholder="CC-HOU-XXX"
                    value={costCode}
                    onChange={(e) => setCostCode(e.target.value)}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Due Date</label>
                  <input 
                    type="text" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-2">Priority</label>
                  <select 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm cursor-pointer"
                  >
                    <option value="Standard">Standard</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              {/* RUSH PROJECT LOGIC SWITCH */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-8 flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-orange-850">Rush Project Classification</h4>
                  <p className="text-[12px] text-orange-600 mt-0.5">Applies a global multiplier to all parts and flags this ticket for high-priority fast tracking.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isRush}
                    onChange={(e) => setIsRush(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  <span className="ml-3 text-[13px] font-bold text-orange-750 uppercase tracking-wide">RUSH JOB</span>
                </label>
              </div>

              <h3 className="text-[15px] font-bold text-slate-800 mb-4">Paint Type</h3>
              
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["Epoxy", "Polyester", "Hybrid", "Urethane", "Polyurethane"].map((paint) => (
                  <button 
                    key={paint}
                    onClick={() => setPaintType(paint)}
                    className={`px-4 py-2 border rounded-xl text-[13px] font-medium transition-colors ${
                      paint === paintType 
                        ? "bg-blue-600 border-blue-600 text-white font-bold" 
                        : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {paint}
                  </button>
                ))}
              </div>

              {/* Bottom Action */}
              <div className="flex justify-between mt-2">
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
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-[15px] font-bold text-slate-800">Describe Materials & Parts</h3>
                  <p className="text-[12px] text-slate-505 mt-0.5">Itemize structural pipes, flanges, and fittings with customer identifiers.</p>
                </div>
              </div>
              
              <div className="bg-slate-50/50 border border-slate-200 rounded-xl overflow-x-auto mb-8">
                <table className="w-full text-sm text-left whitespace-nowrap min-w-[850px]">
                  <thead className="text-[11px] text-slate-500 font-semibold bg-slate-100/50 border-b border-slate-200 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Classification</th>
                      <th className="py-3 px-4">PCS Part ID</th>
                      <th className="py-3 px-4">Client Pipe ID</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Qty</th>
                      <th className="py-3 px-4">Footage (Total / Coated)</th>
                      <th className="py-3 px-4">Rush?</th>
                      <th className="py-3 px-4">Photo</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {parts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-md text-[11px] font-bold ${
                            p.classification === "Tubing" ? "bg-blue-50 text-blue-600" :
                            p.classification === "Flange" ? "bg-purple-50 text-purple-600" :
                            p.classification === "Fitting" ? "bg-teal-50 text-teal-600" :
                            "bg-amber-50 text-amber-600"
                          }`}>
                            {p.classification}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[12px] font-semibold text-slate-500">{p.id}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{p.clientPartId}</td>
                        <td className="py-3 px-4 text-slate-700 font-medium">{p.description}</td>
                        <td className="py-3 px-4 text-slate-600 font-bold">{p.qty}</td>
                        <td className="py-3 px-4 text-slate-600 font-medium">
                          {p.classification === "Tubing" ? (
                            <span>{p.totalFootage} ft <span className="text-slate-400">/</span> <strong className="text-emerald-600">{p.coatedFootage} ft</strong></span>
                          ) : (
                            <span className="text-slate-400">&mdash;</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {p.isPartRush ? (
                            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold">RUSH</span>
                          ) : (
                            <span className="text-slate-400 text-xs">Standard</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {p.photoName ? (
                            <span className="text-slate-500 text-xs flex items-center gap-1.5">
                              <ImageIcon size={12} className="text-blue-500" />
                              {p.photoName}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic text-xs">No photo</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button 
                            onClick={() => handleRemovePart(p.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1 hover:bg-slate-100 rounded"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    
                    {/* Add Part Form Row */}
                    <tr className="bg-slate-50/40">
                      <td className="py-3 px-3">
                        <select 
                          value={newClassification}
                          onChange={(e) => setNewClassification(e.target.value as any)}
                          className="px-2 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500 bg-white font-bold"
                        >
                          <option value="Tubing">Tubing</option>
                          <option value="Flange">Flange</option>
                          <option value="Fitting">Fitting</option>
                          <option value="Fabrication">Fabrication</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-400">PCS-P-Auto</td>
                      <td className="py-3 px-3">
                        <input 
                          type="text" 
                          placeholder="Client Pipe ID" 
                          value={newClientPartId}
                          onChange={(e) => setNewClientPartId(e.target.value)}
                          className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500" 
                        />
                      </td>
                      <td className="py-3 px-3">
                        <input 
                          type="text" 
                          placeholder="Dimensions / Specs..." 
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500 font-semibold" 
                        />
                      </td>
                      <td className="py-3 px-3">
                        <input 
                          type="number" 
                          min={1}
                          value={newQty}
                          onChange={(e) => setNewQty(parseInt(e.target.value) || 1)}
                          className="w-16 px-2.5 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500 text-center font-bold" 
                        />
                      </td>
                      <td className="py-3 px-3">
                        {newClassification === "Tubing" ? (
                          <div className="flex items-center gap-1.5">
                            <input 
                              type="number" 
                              placeholder="Total ft" 
                              value={newTotalFootage}
                              onChange={(e) => setNewTotalFootage(e.target.value)}
                              className="w-16 px-2 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500 text-center" 
                            />
                            <span className="text-slate-400 text-xs">/</span>
                            <input 
                              type="number" 
                              placeholder="Coated" 
                              value={newCoatedFootage}
                              onChange={(e) => setNewCoatedFootage(e.target.value)}
                              className="w-16 px-2 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-500 text-center text-emerald-600 font-bold" 
                            />
                          </div>
                        ) : (
                          <span className="text-slate-450 italic text-[11px] block text-center">N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <input 
                          type="checkbox" 
                          checked={newIsPartRush}
                          onChange={(e) => setNewIsPartRush(e.target.checked)}
                          className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500 cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <button 
                          onClick={simulatePhotoUpload}
                          className="flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all shadow-sm"
                        >
                          <Camera size={13} className="text-blue-500" />
                          {newPhotoName ? "Attached" : "Snap"}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button 
                          onClick={handleAddPart}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg text-[12px] shadow-sm transition-colors flex items-center gap-1"
                        >
                          <Plus size={14} /> Add
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-between mt-2">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  <ArrowRight size={16} className="mr-1.5 rotate-180" />
                  Back
                </button>
                <button 
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl text-[13px] transition-colors shadow-sm flex items-center"
                >
                  <Check size={16} className="mr-1.5" />
                  Submit Receiving Form
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
