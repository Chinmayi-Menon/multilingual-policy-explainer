import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TabsNav, ActiveTab } from './components/TabsNav';
import { NoticeExplainer } from './components/NoticeExplainer';
import { EligibilityChecker } from './components/EligibilityChecker';
import { CitizenRights } from './components/CitizenRights';
import { VoiceAssistantView } from './components/VoiceAssistantView';
import { SettingsModal } from './components/SettingsModal';
import { DocumentDossierModal, DossierContent } from './components/DocumentDossierModal';
import { Language } from './types';
import { UI_TRANSLATIONS } from './data/languages';
import { VoiceAssistantService } from './services/voiceAssistant';
import { PhoneCall, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTab>('notice');
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [dossierContent, setDossierContent] = useState<DossierContent | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  // Poll or listen for speech changes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSpeaking(VoiceAssistantService.isSpeaking());
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleStopSpeaking = () => {
    VoiceAssistantService.stopSpeaking();
    setIsSpeaking(false);
  };

  const handleLanguageChange = (lang: Language) => {
    VoiceAssistantService.stopSpeaking();
    setIsSpeaking(false);
    setCurrentLang(lang);
  };

  const handlePrintDossier = (content: DossierContent) => {
    setDossierContent(content);
    setIsDossierOpen(true);
  };

  const fontClass = fontScale === 'large' ? 'font-scale-lg' : fontScale === 'xlarge' ? 'font-scale-xl' : '';
  const contrastClass = isHighContrast ? 'high-contrast' : '';

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors ${fontClass} ${contrastClass}`}>
      {/* Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        fontScale={fontScale}
        onFontScaleChange={setFontScale}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        isSpeaking={isSpeaking}
        onStopSpeaking={handleStopSpeaking}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs */}
        <TabsNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            VoiceAssistantService.stopSpeaking();
            setIsSpeaking(false);
            setActiveTab(tab);
          }}
          currentLang={currentLang}
        />

        {/* Tab Views */}
        <div className="pt-2">
          {activeTab === 'notice' && (
            <NoticeExplainer
              currentLang={currentLang}
              speechRate={speechRate}
              onPrintDossier={handlePrintDossier}
            />
          )}

          {activeTab === 'eligibility' && (
            <EligibilityChecker
              currentLang={currentLang}
              speechRate={speechRate}
              onPrintDossier={handlePrintDossier}
            />
          )}

          {activeTab === 'rights' && (
            <CitizenRights
              currentLang={currentLang}
              speechRate={speechRate}
            />
          )}

          {activeTab === 'voice' && (
            <VoiceAssistantView
              currentLang={currentLang}
              speechRate={speechRate}
            />
          )}
        </div>
      </main>

      {/* Emergency Helpline Bottom Ticker */}
      <div className="bg-slate-900 text-slate-300 py-3 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-amber-400">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>National Citizen Toll-Free Helplines:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold">
            <a href="tel:112" className="hover:text-white transition">Emergency: <strong>112</strong></a>
            <a href="tel:14555" className="hover:text-white transition">Ayushman Bharat: <strong>14555</strong></a>
            <a href="tel:155261" className="hover:text-white transition">PM-KISAN: <strong>155261</strong></a>
            <a href="tel:15100" className="hover:text-white transition">Free Legal Aid (NALSA): <strong>15100</strong></a>
            <a href="tel:181" className="hover:text-white transition">Women Safety: <strong>181</strong></a>
            <a href="tel:1915" className="hover:text-white transition">Consumer Grievance: <strong>1915</strong></a>
            <a href="tel:14434" className="hover:text-white transition">e-Shram / Labour: <strong>14434</strong></a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">JanSeva AI</span>
            <span>• Multilingual Policy, Rights & Scheme Explainer</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Built for public awareness & legal empowerment</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>India</span>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        speechRate={speechRate}
        onSpeechRateChange={setSpeechRate}
      />

      {/* Printable Citizen Dossier Modal */}
      <DocumentDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        content={dossierContent}
      />
    </div>
  );
};
