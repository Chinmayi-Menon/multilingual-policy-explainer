import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, Sparkles, Volume2, VolumeX, CheckSquare, Square, 
  AlertTriangle, ShieldCheck, ExternalLink, Copy, Check, Printer, 
  Upload, HelpCircle, ArrowRight, BookOpen, Layers, Camera, Image, X, RefreshCw
} from 'lucide-react';
import { Language, NoticeAnalysis } from '../types';
import { SAMPLE_NOTICES } from '../data/sampleNotices';
import { UI_TRANSLATIONS } from '../data/languages';
import { AIExplainerService } from '../services/aiExplainer';
import { VoiceAssistantService } from '../services/voiceAssistant';

interface NoticeExplainerProps {
  currentLang: Language;
  speechRate: number;
  onPrintDossier: (content: { title: string; summary: string; benefits: string[]; documents: string[]; steps: string[]; warning: string }) => void;
}

export const NoticeExplainer: React.FC<NoticeExplainerProps> = ({
  currentLang,
  speechRate,
  onPrintDossier
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  
  const [selectedSampleId, setSelectedSampleId] = useState<string>(SAMPLE_NOTICES[0].id);
  const [inputText, setInputText] = useState<string>(SAMPLE_NOTICES[0].rawText);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<NoticeAnalysis>(SAMPLE_NOTICES[0]);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});
  const [isReadingAudio, setIsReadingAudio] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // ★ Gemini API key handling -------------------------------------------------
  const [geminiKey, setGeminiKey] = useState<string>('');

  // Load any previously saved key from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('janseva_gemini_api_key');
    if (stored) {
      setGeminiKey(stored);
      AIExplainerService.setApiKey(stored);
    }
  }, []);

  const saveKey = () => {
    AIExplainerService.setApiKey(geminiKey);
    alert('Gemini API key saved – the next analysis will use the cloud model.');
  };

const [previousAnalysis, setPreviousAnalysis] = useState<NoticeAnalysis | null>(null);

  // Photo / Image Upload & OCR States
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [ocrStatus, setOcrStatus] = useState<string>('');
  const [ocrProgress, setOcrProgress] = useState<number>(0);

  const analysisRef = useRef<HTMLDivElement>(null);

  const isPendingDecode = inputText.trim() !== (analysis?.rawText || '').trim();

  const handleSelectSample = (sampleId: string) => {
    setSelectedSampleId(sampleId);
    setUploadedImage(null);
    setImageFileName('');
    setOcrStatus('');
    const found = SAMPLE_NOTICES.find(s => s.id === sampleId);
    if (found) {
      setInputText(found.rawText);
      setAnalysis(found);
      setCompletedSteps({});
      setCheckedDocs({});
      VoiceAssistantService.stopSpeaking();
      setIsReadingAudio(false);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    VoiceAssistantService.stopSpeaking();
    setIsReadingAudio(false);
    try {
      const res = await AIExplainerService.analyzeNotice(inputText, currentLang);
      setAnalysis(res);
      setCompletedSteps({});
      setCheckedDocs({});
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedSampleId('custom');
    VoiceAssistantService.stopSpeaking();
    setIsReadingAudio(false);

    // If Image file (Camera photo, screenshot, JPG, PNG, WebP)
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
        setUploadedImage(base64Data);
        setImageFileName(file.name);
        setIsAnalyzing(true);
        setOcrStatus('Scanning photo of notice...');
        setOcrProgress(15);

        try {
          const { analysis: resultAnalysis, extractedText } = await AIExplainerService.analyzeImageNotice(
            base64Data,
            file.type,
            currentLang,
            (progress, statusMsg) => {
              setOcrProgress(progress);
              setOcrStatus(statusMsg);
            }
          );

          setInputText(extractedText || 'Notice text extracted from uploaded photo.');
          setAnalysis(resultAnalysis);
          setCompletedSteps({});
          setCheckedDocs({});
        } catch (err: any) {
          console.error('Image analysis error:', err);
          alert(err.message || 'Could not process notice image. Please ensure image is clear.');
        } finally {
          setIsAnalyzing(false);
          setOcrStatus('');
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Plain text file (.txt)
      setUploadedImage(null);
      setImageFileName('');
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setInputText(text);
          setSelectedSampleId('custom');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImageFileName('');
    setOcrStatus('');
    setOcrProgress(0);
  };

  const toggleAudioNarration = () => {
    if (isReadingAudio) {
      VoiceAssistantService.stopSpeaking();
      setIsReadingAudio(false);
    } else {
      const textToRead = `${analysis.title}. ${analysis.summary}. Important benefits include: ${analysis.keyBenefits.join('. ')}. Action steps: ${analysis.actionSteps.join('. ')}. Important alert: ${analysis.scamAlert}`;
      VoiceAssistantService.speak(
        textToRead,
        currentLang,
        () => setIsReadingAudio(true),
        () => setIsReadingAudio(false),
        speechRate
      );
    }
  };

  const handleCopySummary = () => {
    const text = `${analysis.title}\n\nSummary:\n${analysis.summary}\n\nBenefits:\n${analysis.keyBenefits.join('\n')}\n\nWarning:\n${analysis.scamAlert}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTriggerPrint = () => {
    onPrintDossier({
      title: analysis.title,
      summary: analysis.summary,
      benefits: analysis.keyBenefits,
      documents: analysis.documentsNeeded,
      steps: analysis.actionSteps,
      warning: analysis.scamAlert
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Intro Hero Banner */}
      <div className="bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-orange-500/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <FileText className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            AI Policy & Circular Decoder
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Decode Government Notices in Simple Language
          </h2>
          <p className="text-sm sm:text-base text-amber-50/90 font-medium leading-relaxed">
            Upload a camera photo or document of any government gazette, court notice, circular, or tenancy order. JanSeva AI reads the document, translates bureaucratic jargon into clear citizen rights, checklists, and scam warnings.
          </p>
        </div>
      </div>

      {/* Input & Sample Selector Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          {/* ★ Gemini API key input (optional) */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="password"
              placeholder="Enter Gemini API key (optional)"
              className="flex-1 px-3 py-2 bg-white/10 text-white rounded"
              value={geminiKey}
              onChange={e => setGeminiKey(e.target.value)}
            />
            <button
              onClick={saveKey}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded"
            >
              Save Key
            </button>
          </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              {t.sampleDocuments}
            </h3>
            <p className="text-xs text-slate-500">Pick an authentic sample or upload your own notice / photo below</p>
          </div>

          {/* Photo & Document Upload Button */}
          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold cursor-pointer transition shadow-xs">
            <Camera className="w-4 h-4 text-amber-600" />
            <span>Upload Notice Photo (JPG, PNG) or Text</span>
            <input 
              type="file" 
              accept="image/png,image/jpeg,image/webp,image/jpg,.txt" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </label>
        </div>

        {/* Sample Notice Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_NOTICES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectSample(sample.id)}
              className={`p-3.5 rounded-2xl text-left border transition-all ${
                selectedSampleId === sample.id && !uploadedImage
                  ? 'border-amber-500 bg-amber-50/70 shadow-xs ring-2 ring-amber-500/20'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="text-[11px] font-bold text-amber-700 block uppercase tracking-wider mb-1">
                {sample.authority.substring(0, 35)}...
              </span>
              <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                {sample.title}
              </p>
            </button>
          ))}
        </div>

        {/* Gemini Vision Tip Banner if no key entered yet */}
        {!AIExplainerService.getApiKey() && (
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Tip for Highest Accuracy on Photo Reading:</strong> Click <strong>⚙️ Settings</strong> at the top right and paste your free key from Google AI Studio. Gemini Multimodal Vision reads skewed, stylized, and complex circular photos with 100% human-grade precision!
              </span>
            </div>
          </div>
        )}

        {/* Uploaded Notice Photo Preview Card */}
        {uploadedImage && (
          <div className="bg-slate-50 border border-slate-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-slate-200 shadow-xs">
                <img src={uploadedImage} alt="Uploaded Notice" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 mb-1">
                  <Image className="w-3 h-3 text-emerald-600" />
                  Notice Photo Attached
                </span>
                <p className="text-xs font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
                  {imageFileName || 'Government Notice Photo'}
                </p>
                <span className="text-[11px] text-slate-400">
                  Ready for AI Multimodal / OCR Scanning
                </span>
              </div>
            </div>

            <button
              onClick={handleRemoveImage}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 p-2 rounded-xl hover:bg-rose-50 flex items-center gap-1 transition"
            >
              <X className="w-4 h-4" />
              <span>Remove Photo</span>
            </button>
          </div>
        )}

        {/* OCR Scanning Progress Bar */}
        {isAnalyzing && ocrStatus && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-amber-700/30 border-t-amber-700 rounded-full animate-spin" />
                {ocrStatus}
              </span>
              <span>{ocrProgress}%</span>
            </div>
            <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-600 rounded-full transition-all duration-300"
                style={{ width: `${ocrProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setSelectedSampleId('custom');
            }}
            rows={6}
            placeholder="Paste text here, or upload a photo of the circular above to extract and decode automatically..."
            className="w-full p-4 text-xs sm:text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition font-sans"
          />
          <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1 px-1">
            <span>{inputText.length} characters</span>
            {inputText && (
              <button
                type="button"
                onClick={() => {
                  setInputText('');
                  setUploadedImage(null);
                }}
                className="text-slate-500 hover:text-rose-600 transition"
              >
                Clear text
              </button>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !inputText.trim()}
            className="w-full sm:w-auto px-6 py-3.5 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Reading & Decoding Notice with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Decode & Simplify with JanSeva AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Output Section */}
      {analysis && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                    Official Breakdown
                  </span>
                  <span className="text-xs text-slate-400">• {analysis.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {analysis.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  Authority: {analysis.authority}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center flex-wrap gap-2">
                <button
                  onClick={toggleAudioNarration}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-xs ${
                    isReadingAudio
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {isReadingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
                  <span>{isReadingAudio ? t.stopAudio : t.readAloud}</span>
                </button>

                <button
                  onClick={handleCopySummary}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
                  title={t.copy}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? t.copied : t.copy}</span>
                </button>

                <button
                  onClick={handleTriggerPrint}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition"
                  title={t.print}
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.print}</span>
                </button>
              </div>
            </div>

            {/* If a photo was uploaded, show it cleanly in the breakdown */}
            {uploadedImage && (
              <div className="pt-6 pb-2">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-32 h-32 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-white shadow-xs">
                    <img src={uploadedImage} alt="Uploaded Notice" className="w-full h-full object-contain" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase text-amber-700">Source Photo of Document</span>
                    <h4 className="text-sm font-bold text-slate-800">{imageFileName || 'Original Document Photo'}</h4>
                    <p className="text-xs text-slate-600 font-medium">
                      Scanned and extracted using Multimodal Vision & OCR. The verified plain-language breakdown is shown below.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Plain Language Summary Card */}
            <div className="pt-6">
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-2 text-amber-800 font-extrabold text-xs uppercase tracking-wider mb-2">
                  <span className="text-base">💡</span>
                  Plain Language Meaning (5th-Grade Level)
                </div>
                <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed">
                  {analysis.summary}
                </p>
                <div className="mt-3 text-xs text-slate-600 font-semibold bg-white/70 px-3 py-1.5 rounded-lg inline-block border border-amber-200/50">
                  Target Beneficiaries: <span className="text-slate-900 font-bold">{analysis.whoIsAffected}</span>
                </div>
              </div>

              {/* Grid: Benefits & Conditions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                {/* Benefits */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                    <span className="text-lg">💰</span>
                    What You Get (Benefits & Cash)
                  </div>
                  <ul className="space-y-2.5">
                    {analysis.keyBenefits.map((ben, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                          ✓
                        </span>
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Critical Conditions & Exclusions */}
                <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-3">
                    <span className="text-lg">⚠️</span>
                    Conditions & Who is Disqualified
                  </div>
                  <ul className="space-y-2.5">
                    {analysis.criticalConditions.map((cond, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                          !
                        </span>
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Jargon Buster Table */}
              {analysis.jargonList && analysis.jargonList.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-3">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>{t.jargonBuster}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {analysis.jargonList.map((item, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1">
                        <span className="text-xs font-black text-amber-700 tracking-wide block">
                          "{item.term}"
                        </span>
                        <p className="text-xs text-slate-700 font-medium">
                          {item.explanation}
                        </p>
                        <div className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          Analogy: {item.simpleAnalogy}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents & Action Plan Interactive Checklists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                {/* Documents Checklist */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="text-base">📋</span>
                      {t.documentsRequired}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {Object.values(checkedDocs).filter(Boolean).length} / {analysis.documentsNeeded.length} ready
                    </span>
                  </div>
                  <div className="space-y-2">
                    {analysis.documentsNeeded.map((doc, idx) => {
                      const isChecked = !!checkedDocs[idx];
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCheckedDocs({ ...checkedDocs, [idx]: !isChecked })}
                          className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition ${
                            isChecked
                              ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                          <span className={isChecked ? 'line-through text-slate-500' : ''}>{doc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step-by-Step Action Plan */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="text-base">🚀</span>
                      {t.howToApply}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      Step progress: {Object.values(completedSteps).filter(Boolean).length} / {analysis.actionSteps.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {analysis.actionSteps.map((step, idx) => {
                      const isDone = !!completedSteps[idx];
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCompletedSteps({ ...completedSteps, [idx]: !isDone })}
                          className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition ${
                            isDone
                              ? 'bg-amber-50/60 border-amber-300 text-amber-900'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 ${
                            isDone ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className={isDone ? 'line-through text-slate-500' : ''}>{step}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Anti-Scam Alert Banner */}
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-start gap-3.5">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-800">
                    {t.scamWarning}
                  </span>
                  <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                    {analysis.scamAlert}
                  </p>
                </div>
              </div>

              {/* Official Links & Helplines */}
              {analysis.officialLinks && analysis.officialLinks.length > 0 && (
                <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="font-bold text-slate-600 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Verified Official Portals:
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {analysis.officialLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition"
                      >
                        {link.name}
                        {link.phone && <span className="text-emerald-700">({link.phone})</span>}
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
