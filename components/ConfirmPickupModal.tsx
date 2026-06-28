import React, { useState, useRef, useEffect } from "react";
import { X, Truck, Check, Camera, RefreshCw } from "lucide-react";

interface PickupRecord {
  pickupId: string;
  ticket: string;
  customer: string;
  parts: string;
  ready: string;
  driver: string;
  status: string;
  date: string;
}

interface ConfirmPickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PickupRecord | null;
}

interface PickablePart {
  id: string;
  clientPipeId: string;
  desc: string;
  status: "Ready" | "In-Process" | "Curing";
  selected: boolean;
}

export default function ConfirmPickupModal({ isOpen, onClose, record }: ConfirmPickupModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Interactive ownership states
  const [pickupCompany, setPickupCompany] = useState("");
  const [pickupPerson, setPickupPerson] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [shipmentPhoto, setShipmentPhoto] = useState("");

  // Stateful parts checklist for partial pickup selection
  const [partsList, setPartsList] = useState<PickablePart[]>([
    { id: "PCS-P-101", clientPipeId: "P-101", desc: '6" Tubing CS', status: "Ready", selected: true },
    { id: "PCS-P-102", clientPipeId: "P-102", desc: '6" Tubing CS', status: "Ready", selected: true },
    { id: "PCS-P-103", clientPipeId: "P-103", desc: '6" Tubing CS', status: "Ready", selected: true },
    { id: "PCS-P-104", clientPipeId: "FL-202", desc: '6" Flange Cl-150', status: "Curing", selected: false }
  ]);

  // Set default timestamp and prefill driver when open
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      setPickupTime(now.toLocaleString());
      if (record) {
        setPickupPerson(record.driver || "");
        setPickupCompany(record.customer === "ABC Steel Corp" ? "ABC Logistics" : "Customer Self-Pickup");
      }
    }
  }, [isOpen, record]);

  if (!isOpen || !record) return null;

  // Digital Signature Canvas draw handlers (Mouse & Touch responsive)
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0f172a"; // slate-900

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const togglePartSelection = (id: string) => {
    setPartsList(partsList.map(p => {
      if (p.id !== id || p.status !== "Ready") return p;
      return { ...p, selected: !p.selected };
    }));
  };

  const simulatePhotoUpload = () => {
    const mockPhotos = ["shipment_loaded_flatbed_1.jpg", "cargo_securing_photo_2.jpg", "delivery_pickup_pallet_3.jpg"];
    setShipmentPhoto(mockPhotos[Math.floor(Math.random() * mockPhotos.length)]);
  };

  const selectedCount = partsList.filter(p => p.selected).length;
  const isPartial = selectedCount < partsList.filter(p => p.status === "Ready").length;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[600px] flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-7 py-5 flex items-center justify-between border-b border-slate-100 bg-white z-10 sticky top-0 shrink-0">
          <div>
            <h2 className="text-[18px] font-bold text-slate-900">Confirm Ticket Dispatch & Pickup</h2>
            <p className="text-[11px] text-slate-450 mt-0.5">Authorize transfer of custody with signatures and photo proof</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6 overflow-y-auto no-scrollbar flex-1 flex flex-col gap-5">
          
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <div className="text-[10px] text-slate-450 font-bold uppercase mb-0.5">Ticket ID</div>
              <div className="text-[13px] font-bold text-blue-600">{record.ticket}</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <div className="text-[10px] text-slate-450 font-bold uppercase mb-0.5">Customer Name</div>
              <div className="text-[13px] font-bold text-slate-950 truncate">{record.customer}</div>
            </div>
          </div>

          {/* Form Entries for Ownership */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Pickup Company Name</label>
              <input 
                type="text" 
                value={pickupCompany} 
                onChange={(e) => setPickupCompany(e.target.value)}
                placeholder="e.g. ABC Logistics"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-blue-500 bg-white font-semibold text-slate-750 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Pickup Representative Name</label>
              <input 
                type="text" 
                value={pickupPerson} 
                onChange={(e) => setPickupPerson(e.target.value)}
                placeholder="Driver full name"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-blue-500 bg-white font-semibold text-slate-750 shadow-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Dispatched Date/Time</label>
              <input 
                type="text" 
                value={pickupTime} 
                readOnly
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none bg-slate-50 font-mono font-bold text-slate-500 shadow-xs select-none"
              />
            </div>
            
            {/* Shipment Photo Uploader */}
            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Cargo Shipment Photo (Loaded)</label>
              <button 
                type="button"
                onClick={simulatePhotoUpload}
                className="w-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Camera size={14} className="text-blue-500" />
                {shipmentPhoto ? shipmentPhoto : "Snap Shipment Photo"}
              </button>
            </div>
          </div>

          {/* Parts checklist for partial pickups */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[12px] font-bold text-slate-700">Select Specific Part Serial IDs to Pickup</label>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                {selectedCount} selected
              </span>
            </div>
            
            <div className="border border-slate-150 rounded-xl divide-y divide-slate-100 max-h-[150px] overflow-y-auto no-scrollbar bg-white shadow-inner">
              {partsList.map((part) => (
                <div 
                  key={part.id} 
                  onClick={() => togglePartSelection(part.id)}
                  className={`px-4 py-2.5 flex justify-between items-center text-xs transition-colors ${
                    part.status === "Ready" ? "cursor-pointer hover:bg-slate-50/50" : "opacity-50 select-none bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input 
                      type="checkbox"
                      checked={part.selected}
                      disabled={part.status !== "Ready"}
                      onChange={() => {}} // handled by click of row
                      className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-mono font-bold text-slate-700">{part.id}</span>
                      <span className="text-slate-400 text-[10px] ml-2 font-medium">({part.clientPipeId})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-medium">{part.desc}</span>
                    <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-wider ${
                      part.status === "Ready" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600 animate-pulse"
                    }`}>
                      {part.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {isPartial && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mt-2 flex items-start gap-2 animate-in fade-in duration-200">
                <Truck size={14} className="text-amber-600 mt-0.5 shrink-0" />
                <span className="text-[11px] text-amber-700 font-medium">
                  <strong>Partial Pickup Flagged</strong>: Some parts are not selected or are still in processing/curing.
                </span>
              </div>
            )}
          </div>

          {/* Digital Signature Drawing Canvas */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[12px] font-bold text-slate-700">Digital Signature (Draw below)</label>
              <button 
                type="button" 
                onClick={clearCanvas}
                className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wide"
              >
                Clear Pad
              </button>
            </div>
            
            <div className="border border-slate-200 bg-[#f8fafc] rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
              <canvas 
                ref={canvasRef}
                width={540}
                height={120}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full bg-[#f8fafc] cursor-crosshair touch-none block"
                title="Signature Drawing Canvas"
              />
            </div>
            <span className="block text-[10px] text-slate-400 text-center mt-1">Signature represents proof that custody has transferred</span>
          </div>

        </div>

        {/* Footer */}
        <div className="px-7 py-5 flex gap-3 border-t border-slate-100 bg-slate-50/50 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl text-[12px] transition-all shadow-sm"
          >
            Cancel Dispatch
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-[12px] transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <Check size={15} strokeWidth={2.5} />
            Confirm Dispatch
          </button>
        </div>

      </div>
    </div>
  );
}
