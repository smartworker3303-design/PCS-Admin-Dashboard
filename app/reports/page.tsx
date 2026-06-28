"use client";

import React, { useState } from "react";
import { Eye, Download, Share2, FileText, Link as LinkIcon, Check, Copy, AlertTriangle, ShieldCheck } from "lucide-react";

interface SharedLinkItem {
  id: string;
  ticket: string;
  recipient: string;
  created: string;
  expiry: string;
  status: "Active" | "Expired";
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("recent_reports");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState("TK-2847");
  const [shareEmail, setShareEmail] = useState("");
  
  // Generated link output states
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const [reportsData] = useState([
    { id: "RPT-0284", ticket: "TK-2847", customer: "ABC Steel Corp", sections: ["Process", "QC", "Invoice"], date: "Apr 21, 2026", size: "2.4 MB", shared: true },
    { id: "RPT-0283", ticket: "TK-2844", customer: "Lone Star Mfg", sections: ["Process", "Photos"], date: "Apr 20, 2026", size: "5.1 MB", shared: false },
    { id: "RPT-0282", ticket: "TK-2840", customer: "Coastal Pipeline", sections: ["QC", "Measurements", "Invoice"], date: "Apr 19, 2026", size: "3.8 MB", shared: true },
    { id: "RPT-0281", ticket: "TK-2839", customer: "Prime Steel Inc.", sections: ["Process", "QC"], date: "Apr 18, 2026", size: "1.9 MB", shared: false },
  ]);

  // Expiry changed to 24 Hours to support the client's strict portal rule
  const [sharedLinks, setSharedLinks] = useState<SharedLinkItem[]>([
    { id: "LNK-901", ticket: "TK-2847", recipient: "john@abcsteel.com", created: "Jun 28, 2026 10:30 AM", expiry: "Jun 29, 2026 10:30 AM (24h)", status: "Active" },
    { id: "LNK-902", ticket: "TK-2840", recipient: "david@coastal.com", created: "Jun 28, 2026 09:15 AM", expiry: "Jun 29, 2026 09:15 AM (24h)", status: "Active" },
    { id: "LNK-903", ticket: "TK-2835", recipient: "info@metalfab.com", created: "Jun 25, 2026 02:00 PM", expiry: "Jun 26, 2026 02:00 PM (Expired)", status: "Expired" },
  ]);

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareEmail.trim()) return;

    const mockToken = Math.random().toString(36).substring(2, 10);
    const linkUrl = `https://portal.pcs-coatings.com/exhibit-a/view?token=${mockToken}&ticket=${selectedTicket}`;
    setGeneratedLink(linkUrl);

    // Add to state
    const newLink: SharedLinkItem = {
      id: `LNK-${900 + sharedLinks.length + 1}`,
      ticket: selectedTicket,
      recipient: shareEmail,
      created: new Date().toLocaleString(),
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString() + " (24h)",
      status: "Active"
    };

    setSharedLinks([newLink, ...sharedLinks]);
    setShareEmail("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReissueLink = (id: string) => {
    setSharedLinks(sharedLinks.map(link => {
      if (link.id !== id) return link;
      return {
        ...link,
        created: new Date().toLocaleString(),
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString() + " (24h)",
        status: "Active"
      };
    }));
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900 leading-tight flex items-center gap-2">
            <FileText className="text-blue-600" />
            Exhibit A Report Center
          </h1>
          <p className="text-[14px] text-slate-500 mt-0.5">Generate QC reports and create secure, 24-hour expiring customer share links</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-[28px] font-bold text-blue-600 leading-none mb-2">284</div>
          <div className="text-[13px] font-medium text-slate-500">Reports Compiled</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-[28px] font-bold text-emerald-500 leading-none mb-2">
            {sharedLinks.filter(l => l.status === "Active").length}
          </div>
          <div className="text-[13px] font-medium text-slate-500">Active Shared Links</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-[28px] font-bold text-red-500 leading-none mb-2">
            {sharedLinks.filter(l => l.status === "Expired").length}
          </div>
          <div className="text-[13px] font-medium text-slate-500">Expired Secure Links</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-[28px] font-bold text-amber-505 leading-none mb-2">24 Hours</div>
          <div className="text-[13px] font-medium text-slate-505">Link Expiry Period</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-xl inline-flex mb-6 overflow-x-auto no-scrollbar max-w-full">
        <button 
          onClick={() => setActiveTab("recent_reports")}
          className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === "recent_reports" ? "bg-blue-600 text-white shadow-sm" : "text-slate-505 hover:text-slate-700"
          }`}
        >
          Recent QC Reports
        </button>
        <button 
          onClick={() => setActiveTab("report_builder")}
          className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === "report_builder" ? "bg-blue-600 text-white shadow-sm" : "text-slate-505 hover:text-slate-700"
          }`}
        >
          Secure Link Generator
        </button>
        <button 
          onClick={() => setActiveTab("shared_links")}
          className={`px-5 py-2 text-[13px] font-bold rounded-lg transition-all whitespace-nowrap ${
            activeTab === "shared_links" ? "bg-blue-600 text-white shadow-sm" : "text-slate-505 hover:text-slate-700"
          }`}
        >
          Link Expiry Registry ({sharedLinks.length})
        </button>
      </div>

      {/* Tab 1: Recent Reports */}
      {activeTab === "recent_reports" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-slate-150 bg-slate-50/50 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Report ID</th>
                  <th className="py-4 px-6">Ticket</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Report Categories Included</th>
                  <th className="py-4 px-6">Date Generated</th>
                  <th className="py-4 px-6">File Size</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reportsData.map((report, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors bg-white">
                    <td className="py-4 px-6 font-bold text-slate-900">{report.id}</td>
                    <td className="py-4 px-6 text-blue-600 font-bold">{report.ticket}</td>
                    <td className="py-4 px-6 font-semibold text-slate-800">{report.customer}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {report.sections.map((sec, i) => (
                          <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-650 rounded text-[10px] font-bold">
                            {sec}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-medium">{report.date}</td>
                    <td className="py-4 px-6 text-slate-500 font-mono font-bold">{report.size}</td>
                    <td className="py-4 px-6">
                      {report.shared ? (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 border border-emerald-100 text-emerald-600 uppercase tracking-wide">
                          Shared Link Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 text-[10px] font-bold bg-slate-105 text-slate-400 rounded uppercase">
                          Private Document
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-3 text-slate-400">
                        <button className="hover:text-blue-600 p-1 hover:bg-slate-100 rounded transition-colors" title="Preview Report">
                          <Eye size={16} />
                        </button>
                        <button className="hover:text-blue-600 p-1 hover:bg-slate-100 rounded transition-colors" title="Download PDF">
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Secure Link Generator & Report Previewer */}
      {activeTab === "report_builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
          
          {/* Link Generator Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
            <h2 className="text-[15px] font-bold text-slate-900 mb-2">Create Customer Secure Share Link</h2>
            <p className="text-[12px] text-slate-450 mb-5">Generates a secure login-free URL that expires in exactly 24 hours.</p>
            
            <form onSubmit={handleGenerateLink} className="flex flex-col gap-4 flex-1">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Select Active Job Ticket</label>
                <select 
                  value={selectedTicket} 
                  onChange={(e)=>setSelectedTicket(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] bg-white font-bold focus:outline-none"
                >
                  <option value="TK-2847">TK-2847 (ABC Steel Corp)</option>
                  <option value="TK-2844">TK-2844 (Lone Star Mfg)</option>
                  <option value="TK-2840">TK-2840 (Coastal Pipeline)</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Recipient Customer Email</label>
                <input 
                  type="email" 
                  value={shareEmail}
                  onChange={(e)=>setShareEmail(e.target.value)}
                  placeholder="e.g. buyer@customer.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-2">
                <AlertTriangle size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <span className="text-[11px] text-blue-700 font-medium">
                  After 24 hours have elapsed, this link will return a <strong>Link Expired</strong> screen. Customers can click a button on that screen to request a reissue.
                </span>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs shadow-sm mt-auto cursor-pointer">
                Generate 24-Hour Shared Link
              </button>
            </form>

            {/* Generated Link Result Area */}
            {generatedLink && (
              <div className="border border-emerald-250 bg-emerald-50/50 rounded-2xl p-4 mt-5 animate-in slide-in-from-top-2 duration-200">
                <span className="block text-[11px] font-bold text-emerald-800 mb-1.5">Secure Share Link Created Successfully:</span>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={generatedLink}
                    className="flex-1 border border-emerald-200 bg-white rounded-lg px-3 py-1.5 text-[11px] font-mono select-all text-slate-600 focus:outline-none"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs shrink-0 cursor-pointer"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <span className="block text-[9px] text-emerald-600/80 mt-1.5 font-bold uppercase tracking-wider">
                  Expires in 23 hours 59 minutes
                </span>
              </div>
            )}
          </div>

          {/* Exhibit A Customer Portal Previewer */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full min-h-[450px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-bold text-slate-900">Exhibit A: Customer Report Preview</h2>
              <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">EXHIBIT A</span>
            </div>
            
            {/* Simulated Customer Portal Screen */}
            <div className="border border-slate-200 rounded-xl overflow-hidden flex-1 flex flex-col bg-slate-50 text-[12px]">
              
              {/* Portal Header */}
              <div className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center">
                <span className="font-bold text-[11px] tracking-wider">PCS CUSTOMER REPORT PORTAL</span>
                <span className="text-[9px] text-slate-400 font-mono">LINK TOKEN VALID</span>
              </div>

              {/* Portal Content */}
              <div className="p-4 flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar max-h-[300px]">
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="text-[13px] font-bold text-slate-800">Job Quality Inspection Record</h3>
                  <span className="text-[10px] text-slate-400 font-medium">Customer: ABC Steel Corp &middot; Job Ref: TK-2847</span>
                </div>

                {/* Exhibit A Items List */}
                <div className="flex flex-col gap-2">
                  {[
                    { id: "PCS-P-101", client: "P-101", desc: '6" Tubing (100ft)', spec: "RAL 5010 Blue Epoxy", dft: "4.2 mils (Passed)", holiday: "Passed (1250V)" },
                    { id: "PCS-P-102", client: "P-102", desc: '6" Tubing (100ft)', spec: "RAL 5010 Blue Epoxy", dft: "4.8 mils (Passed)", holiday: "Passed (1250V)" }
                  ].map((pipe) => (
                    <div key={pipe.id} className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-2">
                      <div className="flex justify-between font-bold text-slate-800 text-[11px]">
                        <span>Pipe ID: {pipe.id}</span>
                        <span className="text-blue-600">Client ID: {pipe.client}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-500 font-medium">
                        <div>Material: {pipe.desc}</div>
                        <div>Specification: {pipe.spec}</div>
                        <div className="text-emerald-600 font-bold flex items-center gap-1">
                          <ShieldCheck size={11} /> DFT: {pipe.dft}
                        </div>
                        <div className="text-emerald-600 font-bold flex items-center gap-1">
                          <ShieldCheck size={11} /> Holiday Check: {pipe.holiday}
                        </div>
                      </div>
                      {/* Photo identification reference */}
                      <div className="bg-slate-50 border border-slate-100 rounded p-1.5 flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                        <ImageIcon size={12} className="text-slate-350" />
                        Attached Photo Reference: pipe_delivery_sketch.jpg
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portal Footer */}
              <div className="bg-white border-t border-slate-200 px-4 py-2 flex justify-between items-center text-[10px] text-slate-400">
                <span>Verification Authority: PCS Quality Management</span>
                <span className="font-bold text-emerald-600">CERTIFICATE VALID</span>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Shared Links Expirations Registry */}
      {activeTab === "shared_links" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-slate-150 bg-slate-50/50 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Ticket</th>
                  <th className="py-4 px-6">Recipient Customer</th>
                  <th className="py-4 px-6">Created Timestamp</th>
                  <th className="py-4 px-6">Expiry Timestamp (24h Limit)</th>
                  <th className="py-4 px-6">Link Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sharedLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-50/50 transition-colors bg-white">
                    <td className="py-4 px-6 font-bold text-blue-600">{link.ticket}</td>
                    <td className="py-4 px-6 font-semibold text-slate-750">{link.recipient}</td>
                    <td className="py-4 px-6 text-slate-500 font-mono text-[12px]">{link.created}</td>
                    <td className={`py-4 px-6 font-mono text-[12px] font-bold ${link.status === "Active" ? "text-emerald-600" : "text-red-500"}`}>
                      {link.expiry}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        link.status === "Active" 
                          ? "bg-emerald-50 border border-emerald-100 text-emerald-600" 
                          : "bg-red-50 border border-red-100 text-red-600"
                      }`}>
                        {link.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex justify-end items-center gap-3">
                      {link.status === "Active" ? (
                        <button 
                          onClick={() => { setGeneratedLink(`https://portal.pcs-coatings.com/exhibit-a/view?token=reissued&ticket=${link.ticket}`); copyToClipboard(); }}
                          className="text-slate-400 hover:text-blue-500 transition-colors p-1 hover:bg-slate-100 rounded" 
                          title="Copy Link Token"
                        >
                          <LinkIcon size={14} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleReissueLink(link.id)}
                          className="px-3.5 py-1 bg-blue-550 border border-blue-100 hover:bg-blue-600 text-white rounded-full text-[11px] font-bold transition-all shadow-sm cursor-pointer"
                        >
                          Reissue Link (New 24h)
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
