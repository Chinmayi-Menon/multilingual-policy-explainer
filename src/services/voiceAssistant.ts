import { Language } from '../types';
import { LANGUAGES } from '../data/languages';

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export class VoiceAssistantService {
  private static recognition: any = null;
  private static isListening: boolean = false;
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  /**
   * Check if speech recognition is supported in current browser
   */
  static isSTTSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  /**
   * Check if speech synthesis (TTS) is supported
   */
  static isTTSSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!window.speechSynthesis;
  }

  /**
   * Start listening via microphone in the specified language
   */
  static startListening(
    lang: Language,
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): boolean {
    if (!this.isSTTSupported()) {
      onError('Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return false;
    }

    try {
      this.stopListening();
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionClass();

      const langConfig = LANGUAGES.find(l => l.code === lang);
      this.recognition.lang = langConfig?.voiceCode || 'hi-IN';
      this.recognition.continuous = false;
      this.recognition.interimResults = true;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          onResult(finalTranscript, true);
        } else if (interimTranscript) {
          onResult(interimTranscript, false);
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          onError('Microphone permission was denied. Please allow microphone access in your browser.');
        } else if (event.error === 'no-speech') {
          onError('No speech detected. Please speak clearly into the microphone.');
        } else {
          onError(`Speech recognition error: ${event.error}`);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
      return true;
    } catch (e: any) {
      console.error('Failed to start speech recognition:', e);
      onError(e.message || 'Failed to start microphone');
      return false;
    }
  }

  /**
   * Stop speech recognition
   */
  static stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {}
      this.isListening = false;
    }
  }

  /**
   * Speak out text in the specified regional language
   */
  static speak(
    text: string,
    lang: Language,
    onStart?: () => void,
    onEnd?: () => void,
    rate: number = 0.95
  ) {
    if (!this.synth) return;

    this.stopSpeaking();

    // Clean text: strip markdown characters
    const cleanText = text
      .replace(/[#*`_~\[\]()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const langConfig = LANGUAGES.find(l => l.code === lang);
    utterance.lang = langConfig?.voiceCode || 'hi-IN';
    utterance.rate = rate; // slightly calmer rate for elderly comprehension
    utterance.pitch = 1.0;

    // Try to select appropriate voice if available
    const voices = this.synth.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(langConfig?.voiceCode || 'hi'));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  /**
   * Stop any active speech playback
   */
  static stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  /**
   * Check if speech is currently playing
   */
  static isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking);
  }
}
