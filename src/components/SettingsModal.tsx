import React, { useState } from 'react';
import { X, Key, ShieldCheck, Volume2, Sparkles, ExternalLink } from 'lucide-react';
import { AIExplainerService } from '../services/aiExplainer';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  speechRate: number;
  onSpeechRateChange: (rate: number) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  speechRate,
  onSpeechRateChange
}) => {
  const [apiKey, setApiKey] = useState(AIExplainerService.getApiKey());
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    AIExplainerService.setApiKey(apiKey.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    AIExplainerService.setApiKey('');
    setApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">JanSeva AI Settings</h2>
            <p className="text-xs text-slate-500">Configure AI engine & accessibility preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Gemini API Key */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-600" />
                Google Gemini API Key (Optional)
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
              >
                Get Free Key <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Enables live multilingual LLM parsing for any custom government document or circular. JanSeva includes a built-in neural NLP parser if no key is provided.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Stored locally in browser only
              </span>
              {apiKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-rose-500 hover:underline"
                >
                  Clear Key
                </button>
              )}
            </div>
          </div>

          {/* Voice Narration Speed */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                Audio Reading Speed
              </label>
              <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                {speechRate}x {speechRate < 1 ? '(Calm / Senior)' : speechRate > 1 ? '(Fast)' : '(Normal)'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Adjust speech tempo for clear regional pronunciation, especially helpful for elders.
            </p>
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.05"
              value={speechRate}
              onChange={(e) => onSpeechRateChange(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>0.7x (Slow)</span>
              <span>1.0x (Standard)</span>
              <span>1.3x (Fast)</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-sm transition flex items-center gap-2"
          >
            {isSaved ? 'Saved!' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};
