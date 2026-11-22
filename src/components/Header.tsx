import React from 'react';
import { Globe, VolumeX, Settings, Eye, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { LANGUAGES, UI_TRANSLATIONS } from '../data/languages';
import { VoiceAssistantService } from '../services/voiceAssistant';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  fontScale: 'normal' | 'large' | 'xlarge';
  onFontScaleChange: (scale: 'normal' | 'large' | 'xlarge') => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  fontScale,
  onFontScaleChange,
  isHighContrast,
  onToggleHighContrast,
  isSpeaking,
  onStopSpeaking,
  onOpenSettings
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Civic Tech Branding */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-amber-500 via-orange-600 to-emerald-600 text-white shadow-md shadow-orange-500/20">
              <span className="text-2xl" role="img" aria-label="emblem">🏛️</span>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                  JanSeva <span className="text-amber-600 font-extrabold">AI</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Govt Rights & Schemes
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Speaking Indicator & Stop Button */}
            {isSpeaking && (
              <button
                onClick={onStopSpeaking}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-semibold animate-pulse hover:bg-rose-100 transition shadow-xs"
                title="Stop Audio"
              >
                <VolumeX className="w-4 h-4 text-rose-600" />
                <span className="hidden sm:inline">{t.stopAudio}</span>
              </button>
            )}

            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-100 hover:bg-slate-200/80 rounded-xl px-2.5 py-1.5 border border-slate-200 transition">
              <Globe className="w-4 h-4 text-slate-600 mr-2 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => {
                  const newLang = e.target.value as Language;
                  onLanguageChange(newLang);
                }}
                className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer outline-none pr-1"
                aria-label="Select Language"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-slate-800">
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Accessibility Controls: Font Size */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
              <button
                onClick={() => onFontScaleChange('normal')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                  fontScale === 'normal' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Standard Text Size"
              >
                A
              </button>
              <button
                onClick={() => onFontScaleChange('large')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                  fontScale === 'large' ? 'bg-white shadow-xs text-amber-700 font-extrabold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Large Text (Elderly Friendly)"
              >
                A+
              </button>
              <button
                onClick={() => onFontScaleChange('xlarge')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                  fontScale === 'xlarge' ? 'bg-white shadow-xs text-amber-700 font-extrabold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Extra Large Text"
              >
                A++
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={onToggleHighContrast}
              className={`p-2 rounded-xl border transition ${
                isHighContrast
                  ? 'bg-black text-yellow-300 border-yellow-400 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
              }`}
              title={t.highContrast}
              aria-label={t.highContrast}
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Settings & API Modal */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition"
              title={t.settings}
              aria-label={t.settings}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
