import React from 'react';
import { FileText, CheckCircle2, ShieldAlert, Mic } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/languages';

export type ActiveTab = 'notice' | 'eligibility' | 'rights' | 'voice';

interface TabsNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentLang: Language;
}

export const TabsNav: React.FC<TabsNavProps> = ({
  activeTab,
  onTabChange,
  currentLang
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'notice',
      label: t.tabNotice,
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
      badge: 'Decoder'
    },
    {
      id: 'eligibility',
      label: t.tabEligibility,
      icon: <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />,
      badge: 'Screener'
    },
    {
      id: 'rights',
      label: t.tabRights,
      icon: <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />,
      badge: 'Legal & RTI'
    },
    {
      id: 'voice',
      label: t.tabVoice,
      icon: <Mic className="w-4 h-4 sm:w-5 sm:h-5" />,
      badge: 'Audio AI'
    }
  ];

  return (
    <div className="bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/90 max-w-4xl mx-auto shadow-xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all relative ${
                isActive
                  ? 'bg-white text-slate-900 shadow-md shadow-slate-200 border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span className={isActive ? 'text-amber-600' : 'text-slate-400'}>
                {tab.icon}
              </span>
              <span className="truncate">{tab.label}</span>
              {tab.badge && (
                <span className={`hidden lg:inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded font-extrabold ${
                  isActive ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
