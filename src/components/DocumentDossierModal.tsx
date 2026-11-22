import React from 'react';
import { X, Printer, ShieldCheck, AlertTriangle } from 'lucide-react';

export interface DossierContent {
  title: string;
  summary: string;
  benefits: string[];
  documents: string[];
  steps: string[];
  warning: string;
}

interface DocumentDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: DossierContent | null;
}

export const DocumentDossierModal: React.FC<DocumentDossierModalProps> = ({
  isOpen,
  onClose,
  content
}) => {
  if (!isOpen || !content) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 no-print">
          <div className="flex items-center gap-2">
            <span className="text-xl">📄</span>
            <h3 className="text-lg font-bold text-slate-900">Citizen Dossier & Checklist</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="space-y-6 text-slate-900 font-sans print:p-0">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black tracking-widest text-amber-700 uppercase">
                  JANSEVA AI • PUBLIC WELFARE ADVISORY
                </span>
                <h1 className="text-2xl font-black mt-1">{content.title}</h1>
              </div>
              <div className="text-right text-xs text-slate-500">
                <span>Date: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Plain Summary */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
              Plain Language Meaning
            </h4>
            <p className="text-sm font-medium leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {content.summary}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-2">
              Key Entitlements & Benefits
            </h4>
            <ul className="space-y-1.5">
              {content.benefits.map((b, idx) => (
                <li key={idx} className="text-xs sm:text-sm font-semibold flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents Checklist */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              Required Documents Checklist (Bring Original + 2 Photocopies)
            </h4>
            <div className="space-y-1.5">
              {content.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-medium">
                  <div className="w-4 h-4 border border-slate-400 rounded-sm shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Steps */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              Step-by-Step How to Apply
            </h4>
            <ol className="space-y-1.5">
              {content.steps.map((step, idx) => (
                <li key={idx} className="text-xs font-medium flex items-start gap-2">
                  <span className="font-bold text-slate-800 shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Anti-Scam Warning */}
          <div className="border border-rose-300 bg-rose-50/50 p-4 rounded-xl">
            <span className="text-xs font-black uppercase tracking-wider text-rose-800 block mb-1">
              Official Fraud Alert
            </span>
            <p className="text-xs text-rose-950 font-medium">
              {content.warning}
            </p>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
            JanSeva AI — Simplifying Public Policy & Entitlements for Every Citizen. Free of commercial charge.
          </div>
        </div>
      </div>
    </div>
  );
};
