import React, { useState } from 'react';
import { 
  ShieldAlert, Scale, PhoneCall, FileText, Copy, Check, 
  Printer, Volume2, VolumeX, Sparkles, ChevronDown, ChevronUp, 
  ExternalLink, Send, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { CitizenRight, Language } from '../types';
import { CITIZEN_RIGHTS } from '../data/rights';
import { UI_TRANSLATIONS } from '../data/languages';
import { VoiceAssistantService } from '../services/voiceAssistant';

interface CitizenRightsProps {
  currentLang: Language;
  speechRate: number;
}

export const CitizenRights: React.FC<CitizenRightsProps> = ({
  currentLang,
  speechRate
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedRightId, setExpandedRightId] = useState<string | null>(CITIZEN_RIGHTS[0].id);
  const [speakingRightId, setSpeakingRightId] = useState<string | null>(null);
  
  // RTI Draft Generator State
  const [isRTIOpen, setIsRTIOpen] = useState<boolean>(false);
  const [rtiDept, setRtiDept] = useState<string>('Municipal Corporation / Gram Panchayat');
  const [rtiSubject, setRtiSubject] = useState<string>('Inquiry into delayed approval of welfare scheme application & certified copies of file notings');
  const [applicantName, setApplicantName] = useState<string>('Citizen Beneficiary');
  const [applicantAddress, setApplicantAddress] = useState<string>('House No. 123, Ward 4, Tehsil & District, State');
  const [applicantPhone, setApplicantPhone] = useState<string>('9876543210');
  const [isBPL, setIsBPL] = useState<boolean>(false);
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);

  const categories = ['All', 'Police & Arrest', 'Tenancy & Housing', 'Transparency & RTI', 'Consumer & Digital', 'Women & Family', 'Labor & Wages'];

  const filteredRights = selectedCategory === 'All' 
    ? CITIZEN_RIGHTS 
    : CITIZEN_RIGHTS.filter(r => r.category === selectedCategory);

  const toggleSpeech = (right: CitizenRight) => {
    if (speakingRightId === right.id) {
      VoiceAssistantService.stopSpeaking();
      setSpeakingRightId(null);
    } else {
      const trans = right.translations[currentLang];
      const title = trans?.title || right.title;
      const summary = trans?.summary || right.summary;
      const protections = trans?.keyProtections || right.keyProtections;
      const speech = `${title}. Legal Basis: ${right.legalBasis}. Summary: ${summary}. Key Protections: ${protections.join('. ')}. In case of violation: ${right.whatToDoIfViolated.join('. ')}`;

      setSpeakingRightId(right.id);
      VoiceAssistantService.speak(
        speech,
        currentLang,
        () => setSpeakingRightId(right.id),
        () => setSpeakingRightId(null),
        speechRate
      );
    }
  };

  const generatedRTIText = `FORM A - APPLICATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

To,
The Public Information Officer (PIO),
Department / Office: ${rtiDept}
Address: [Office of the PIO, ${rtiDept}]

1. Full Name of Applicant: ${applicantName}
2. Address for Correspondence: ${applicantAddress}
3. Contact Number: ${applicantPhone}
4. Particulars of Information Sought:
   a) ${rtiSubject}
   b) Please provide certified daily progress report / file notings for the subject file.
   c) Please provide names and designations of officials who held this file beyond statutory citizen charter timelines.
5. Statutory Timeline: As per Section 7(1) of RTI Act 2005, please furnish information within 30 days.
6. Application Fee: ${isBPL ? 'Nil (Exempted as BPL Cardholder under Section 7(5); BPL Card Copy enclosed)' : '₹10 paid via Court Fee Stamp / Postal Order / Netbanking'}

Declaration: I am a citizen of India and seek information strictly for public interest and citizen rights.

Date: ${new Date().toISOString().split('T')[0]}
Place: [City/District]

Applicant Signature: ______________________
(${applicantName})`;

  const handleCopyRTI = () => {
    navigator.clipboard.writeText(generatedRTIText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handlePrintRTI = () => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Popup blocked – please enable pop‑ups for this site to view the printable RTI document.');
    return;
  }
  printWindow.document.write(`
    <html>
      <head>
        <title>RTI Application - ${applicantName}</title>
        <style>
          body { font-family: monospace; padding: 40px; line-height: 1.6; font-size: 14px; }
          h2 { text-align: center; margin-bottom: 30px; font-family: sans-serif; }
        </style>
      </head>
      <body>
        <pre>${generatedRTIText}</pre>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};


  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/20 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3 text-amber-300">
            <Scale className="w-3.5 h-3.5" />
            Adhikar Kendra (Citizen Legal Shield)
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Everyday Legal Rights & Protection Laws
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Police procedures, tenant eviction rules, consumer refunds, domestic safety, and right to information. Know what the law says in plain language and how to stand up for your rights.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsRTIOpen(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{t.generateRTI}</span>
            </button>
            <span className="text-xs text-slate-400">
              Includes 1-click legal notice & complaint letters
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rights Cards Accordion */}
      <div className="space-y-4">
        {filteredRights.map((right) => {
          const isExpanded = expandedRightId === right.id;
          const isSpeaking = speakingRightId === right.id;
          const trans = right.translations[currentLang];
          const title = trans?.title || right.title;
          const summary = trans?.summary || right.summary;
          const protections = trans?.keyProtections || right.keyProtections;
          const violationSteps = trans?.whatToDoIfViolated || right.whatToDoIfViolated;

          return (
            <div
              key={right.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs transition-all overflow-hidden"
            >
              {/* Header Header */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60">
                      {right.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Basis: {right.legalBasis.substring(0, 45)}...
                    </span>
                  </div>

                  {/* Audio Listen Button */}
                  <button
                    onClick={() => toggleSpeech(right)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition self-start sm:self-auto ${
                      isSpeaking
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? t.stopAudio : t.readAloud}</span>
                  </button>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-4">
                  {summary}
                </p>

                {/* Bottom Toggle Bar */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    {right.emergencyHelplines.map((hl, idx) => (
                      <a
                        key={idx}
                        href={`tel:${hl.number}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 hover:bg-emerald-100 transition"
                      >
                        <PhoneCall className="w-3 h-3 text-emerald-600" />
                        <span>{hl.name}: {hl.number}</span>
                      </a>
                    ))}
                  </div>

                  <button
                    onClick={() => setExpandedRightId(isExpanded ? null : right.id)}
                    className="flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-amber-700 py-1.5 px-3 rounded-xl hover:bg-slate-100 transition"
                  >
                    <span>{isExpanded ? 'Hide Protections' : 'View What To Do'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Protections & Action Guide */}
              {isExpanded && (
                <div className="p-5 sm:p-6 bg-slate-50/70 border-t border-slate-100 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Key Protections */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        Your Clear Legal Rights & Protections
                      </span>
                      <ul className="space-y-2">
                        {protections.map((p, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                              ✓
                            </span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What to do if violated */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        Action Plan If Your Rights Are Violated
                      </span>
                      <ul className="space-y-2">
                        {violationSteps.map((v, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                              !
                            </span>
                            <span>{v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Ready to Use Draft / Legal Notice if available */}
                  {right.draftTemplate && (
                    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                            Ready-To-Use Document Template
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-white">
                            {right.draftTemplate.title}
                          </h4>
                          <p className="text-xs text-slate-400">
                            {right.draftTemplate.instructions}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(right.draftTemplate!.templateBody);
                            alert('Template copied to clipboard!');
                          }}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition self-start sm:self-auto"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Template</span>
                        </button>
                      </div>
                      <pre className="p-3 bg-slate-950/80 rounded-xl text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap font-mono border border-slate-800 max-h-48">
                        {right.draftTemplate.templateBody}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive RTI Application Builder Modal */}
      {isRTIOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-slate-900">Official RTI Application Drafter</h3>
              </div>
              <button
                onClick={() => setIsRTIOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded-lg hover:bg-slate-100"
              >
                Close (✕)
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Department / PIO</label>
                  <input
                    type="text"
                    value={rtiDept}
                    onChange={(e) => setRtiDept(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Applicant Name</label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Information / Records Sought</label>
                <textarea
                  rows={2}
                  value={rtiSubject}
                  onChange={(e) => setRtiSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Postal Address</label>
                  <input
                    type="text"
                    value={applicantAddress}
                    onChange={(e) => setApplicantAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBPL}
                  onChange={(e) => setIsBPL(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Applicant is a BPL Cardholder (Exempted from ₹10 fee)</span>
              </label>

              {/* Preview Box */}
              <div>
                <span className="text-xs font-bold text-slate-500 block mb-1">Generated RTI Letter Preview:</span>
                <pre className="p-4 bg-slate-100 rounded-2xl text-xs text-slate-800 font-mono whitespace-pre-wrap border border-slate-200 max-h-60 overflow-y-auto">
                  {generatedRTIText}
                </pre>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={handleCopyRTI}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
                >
                  {copiedDraft ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedDraft ? 'Copied to Clipboard!' : 'Copy RTI Letter'}</span>
                </button>
                <button
                  onClick={handlePrintRTI}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
