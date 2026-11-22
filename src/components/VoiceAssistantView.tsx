import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Volume2, VolumeX, Sparkles, Send, 
  RotateCcw, Copy, Check, MessageSquare, HelpCircle, PhoneCall 
} from 'lucide-react';
import { Language, VoiceMessage } from '../types';
import { LANGUAGES, UI_TRANSLATIONS } from '../data/languages';
import { VoiceAssistantService } from '../services/voiceAssistant';
import { AIExplainerService } from '../services/aiExplainer';

interface VoiceAssistantViewProps {
  currentLang: Language;
  speechRate: number;
}

export const VoiceAssistantView: React.FC<VoiceAssistantViewProps> = ({
  currentLang,
  speechRate
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  const currentLangConfig = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeSpeechMsgId, setActiveSpeechMsgId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Message conversation history
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: currentLangConfig.sampleGreeting,
      lang: currentLang,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isListening, transcript]);

  // Suggested Voice Prompts
  const suggestedQuestions: Record<Language, string[]> = {
    en: [
      "I am a B.Tech college student, what scholarships and schemes can I get?",
      "Can colleges keep my original marksheets/certificates?",
      "Am I eligible for PM-KISAN ₹6,000 grant?",
      "Can police arrest a woman after sunset?",
      "How to get free Ayushman card for 70+ seniors?",
      "Can landlord cut my electricity for delayed rent?",
      "How to file RTI for road work and delayed file?"
    ],
    hi: [
      "मैं बीटेक कॉलेज छात्र हूँ, मुझे कौन सी स्कॉलरशिप मिल सकती है?",
      "क्या कॉलेज छात्र के मूल प्रमाण पत्र (Original Marksheets) रख सकता है?",
      "पीएम किसान ₹6000 अनुदान के लिए कौन पात्र है?",
      "क्या पुलिस सूर्यास्त के बाद महिला को गिरफ्तार कर सकती है?",
      "70 साल से ऊपर के बुजुर्गों को आयुष्मान कार्ड कैसे मिलेगा?",
      "क्या मकान मालिक किराया न देने पर बिजली-पानी काट सकता है?",
      "अटके हुए काम या पेंशन के लिए आरटीआई (RTI) कैसे लगाएं?"
    ],
    ta: [
      "PM-KISAN ₹6000 உதவித்தொகை பெற தகுதி என்ன?",
      "சூரிய அஸ்தமனத்திற்குப் பிறகு பெண்களை போலீசார் கைது செய்ய முடியுமா?",
      "வீட்டு உரிமையாளர் மின்சாரத்தை துண்டிக்க முடியுமா?",
      "70 வயது மூத்த குடிமக்களுக்கான இலவச மருத்துவ காப்பீடு எப்படி பெறுவது?"
    ],
    te: [
      "పీఎం కిసాన్ ₹6000 పొందడానికి అర్హత ఏమిటి?",
      "సూర్యాస్తమయం తర్వాత మహిళను పోలీసులు అరెస్ట్ చేయవచ్చా?",
      "ఇంటి యజమాని కరెంట్ లేదా నీటి సరఫరా నిలిపివేయవచ్చా?",
      "70 ఏళ్లు పైబడిన వారికి ఉచిత ఆయుష్మాన్ కార్డు ఎలా పొందాలి?"
    ],
    bn: [
      "পিএম কিষাণ ₹৬,০০০ টাকার অনুদান পেতে যোগ্যতা কী?",
      "সূর্যাস্তের পর কি পুলিশ কোনো নারীকে গ্রেপ্তার করতে পারে?",
      "বাড়িওয়ালা কি বিদ্যুৎ বা জলের সংযোগ বিচ্ছিন্ন করতে পারে?",
      "৭০ বছরের বেশি প্রবীণদের জন্য আয়ুষ্মান কার্ড কীভাবে পাবেন?"
    ],
    mr: [
      "पीएम किसान ₹६००० अनुदानासाठी कोण पात्र आहे?",
      "सूर्यास्तानंतर पोलीस महिलेला अटक करू शकतात का?",
      "घरमालक वीज किंवा पाणी कापू शकतो का?",
      "७० वर्षांवरील वृद्धांना मोफत आयुष्यमान कार्ड कसे मिळेल?"
    ],
    gu: [
      "પીએમ કિસાન યોજના માટે કોણ પાત્ર છે?",
      "સૂર્યાસ્ત પછી પોલીસ મહિલાની ધરપકડ કરી શકે?",
      "મકાનમાલિક વીજળી કે પાણી કાપી શકે?",
      "૭૦ વર્ષથી વધુ ઉંમરના વૃદ્ધો માટે આયુષ્માન કાર્ડ કેવી રીતે કઢાવવું?"
    ],
    kn: [
      "ಪಿಎಂ ಕಿಸಾನ್ ಯೋಜನೆಗೆ ಯಾರು ಅರ್ಹರು?",
      "ಸೂರ್ಯಾಸ್ತದ ನಂತರ ಮಹಿಳೆಯನ್ನು ಪೊಲೀಸರು ಬಂಧಿಸಬಹುದೇ?",
      "ಮನೆ ಮಾಲೀಕರು ವಿದ್ಯುತ್ ಅಥವಾ ನೀರು ಕಡಿತಗೊಳಿಸಬಹುದೇ?"
    ],
    ml: [
      "പിഎം കിസാൻ ആനുകൂല്യത്തിന് ആർക്കൊക്കെ അർഹതയുണ്ട്?",
      "സൂര്യാസ്തമയത്തിനു ശേഷം സ്ത്രീകളെ അറസ്റ്റ് ചെയ്യാൻ പോലീസിന് കഴിയുമോ?",
      "വാടകക്കാരന്റെ വൈദ്യുതിയോ വെള്ളമോ വീട്ടുടമസ്ഥന് വിച്ഛേദിക്കാൻ കഴിയുമോ?"
    ],
    pa: [
      "ਪੀਐਮ ਕਿਸਾਨ ਸਕੀਮ ਲਈ ਕੌਣ ਯੋਗ ਹੈ?",
      "ਕੀ ਪੁਲਿਸ ਸੂਰਜ ਡੁੱਬਣ ਤੋਂ ਬਾਅਦ ਔਰਤ ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਸਕਦੀ ਹੈ?",
      "ਕੀ ਮਕਾਨ ਮਾਲਕ ਬਿਜਲੀ ਜਾਂ ਪਾਣੀ ਕੱਟ ਸਕਦਾ ਹੈ?"
    ],
    or: [
      "ପିଏମ କିଷାନ ଯୋଜନା ପାଇଁ କିଏ ଯୋଗ୍ୟ?",
      "ସୂର୍ଯ୍ୟାସ୍ତ ପରେ ପୋଲିସ ମହିଳାଙ୍କୁ ଗିରଫ କରିପାରିବ କି?"
    ],
    ur: [
      "پی ایم کسان اسکیم کے لیے کون اہل ہے؟",
      "کیا پولیس غروب آفتاب کے بعد کسی خاتون کو گرفتار کر سکتی ہے؟",
      "کیا مکان مالک بجلی یا پانی کاٹ سکتا ہے؟"
    ]
  };

  const activeQuestions = suggestedQuestions[currentLang] || suggestedQuestions.en;

  const handleStartVoice = () => {
    if (isListening) {
      VoiceAssistantService.stopListening();
      setIsListening(false);
      return;
    }

    VoiceAssistantService.stopSpeaking();
    setActiveSpeechMsgId(null);
    setTranscript('');

    const started = VoiceAssistantService.startListening(
      currentLang,
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal && text.trim()) {
          processQuestion(text.trim());
        }
      },
      (err) => {
        console.warn('Speech error:', err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (started) {
      setIsListening(true);
    }
  };

  const processQuestion = async (query: string) => {
    if (!query.trim()) return;

    VoiceAssistantService.stopListening();
    setIsListening(false);

    const userMsg: VoiceMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      lang: currentLang,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setTextInput('');
    setTranscript('');
    setIsProcessing(true);

    try {
      const answer = await AIExplainerService.answerCitizenQuery(query, currentLang);
      const assistantMsg: VoiceMessage = {
        id: 'asst-' + Date.now(),
        sender: 'assistant',
        text: answer,
        lang: currentLang,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsProcessing(false);

      // Auto read answer aloud via speech synthesis!
      playAudio(assistantMsg);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const playAudio = (msg: VoiceMessage) => {
    if (activeSpeechMsgId === msg.id) {
      VoiceAssistantService.stopSpeaking();
      setActiveSpeechMsgId(null);
    } else {
      setActiveSpeechMsgId(msg.id);
      VoiceAssistantService.speak(
        msg.text,
        msg.lang,
        () => setActiveSpeechMsgId(msg.id),
        () => setActiveSpeechMsgId(null),
        speechRate
      );
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-orange-600 via-amber-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-orange-500/10 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            Bolti Sahayata (Voice Q&A)
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Speak & Listen in Your Regional Language
          </h2>
          <p className="text-xs sm:text-sm text-amber-50/90 font-medium">
            Ask any question about government schemes, legal protections, or official procedures. JanSeva AI answers by voice in plain language.
          </p>
        </div>
      </div>

      {/* Suggested Questions Chips */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2.5">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          Quick Voice Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {activeQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => processQuestion(q)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 hover:border-amber-300 transition text-left"
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Conversation Timeline */}
      <div className="bg-slate-100/70 rounded-3xl p-4 sm:p-6 border border-slate-200 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isSpeaking = activeSpeechMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-xl p-4 rounded-3xl shadow-xs transition-all ${
                  isUser
                    ? 'bg-amber-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1 text-[11px] opacity-70">
                  <span className="font-bold">
                    {isUser ? 'You (Voice Query)' : 'JanSeva AI Assistant'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>

                {/* Spoken Narration Controls for Assistant Response */}
                {!isUser && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => playAudio(msg)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
                        isSpeaking
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
                      <span>{isSpeaking ? t.stopAudio : 'Listen to Voice'}</span>
                    </button>

                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="text-slate-400 hover:text-slate-600 p-1 text-xs"
                      title={t.copy}
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Live Interim Transcript Bubble while speaking */}
        {isListening && transcript && (
          <div className="flex flex-col items-end space-y-1">
            <div className="max-w-xl p-4 rounded-3xl bg-amber-500/80 text-white shadow-xs rounded-br-xs animate-pulse">
              <span className="text-[10px] uppercase font-bold tracking-wider block opacity-80 mb-1">
                Listening to speech...
              </span>
              <p className="text-xs sm:text-sm font-medium italic">
                "{transcript}"
              </p>
            </div>
          </div>
        )}

        {/* AI Thinking Spinner */}
        {isProcessing && (
          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold bg-white px-4 py-2 rounded-2xl border border-slate-200 w-max shadow-xs">
            <div className="w-3 h-3 border-2 border-amber-600/30 border-t-amber-600 rounded-full animate-spin" />
            <span>Finding scheme & legal rules in simple language...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Spoken Microphone Central Control Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        {/* Big Mic Button */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative">
            {isListening && (
              <>
                <span className="absolute -inset-4 rounded-full bg-amber-500/20 animate-ping" />
                <span className="absolute -inset-2 rounded-full bg-amber-500/30 animate-pulse" />
              </>
            )}
            <button
              onClick={handleStartVoice}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform active:scale-95 ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/30 ring-4 ring-rose-200'
                  : 'bg-linear-to-tr from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-orange-500/30'
              }`}
              title={isListening ? 'Tap to stop listening' : 'Tap to speak'}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 animate-pulse" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
          </div>

          <span className="text-xs font-bold text-slate-700 mt-3">
            {isListening ? (
              <span className="text-rose-600 animate-pulse font-extrabold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                {t.listening} ({currentLangConfig.nativeName})
              </span>
            ) : (
              <span>{t.speakNow} in {currentLangConfig.nativeName} ({currentLangConfig.name})</span>
            )}
          </span>
          <span className="text-[11px] text-slate-400">
            Powered by Browser Web Speech Recognition & Natural Neural TTS
          </span>
        </div>

        {/* Text Input Fallback */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && textInput.trim()) {
                processQuestion(textInput.trim());
              }
            }}
            placeholder={t.askQuestion}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-amber-500 transition"
          />
          <button
            onClick={() => {
              if (textInput.trim()) processQuestion(textInput.trim());
            }}
            disabled={!textInput.trim() || isProcessing}
            className="px-5 py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow-xs"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
