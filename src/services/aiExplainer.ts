import { Language, NoticeAnalysis, JargonTerm } from '../types';
import { SAMPLE_NOTICES } from '../data/sampleNotices';
import { SCHEMES_DATABASE } from '../data/schemes';
import { CITIZEN_RIGHTS } from '../data/rights';
import Tesseract from 'tesseract.js';

const COMMON_JARGON_DICTIONARY: Record<string, { explanation: string; analogy: string }> = {
  'cfa': {
    explanation: 'Central Financial Assistance — direct government subsidy credited into your bank account.',
    analogy: 'Direct government cash discount.'
  },
  'almm': {
    explanation: 'Approved List of Models and Manufacturers — official government list of certified, verified solar equipment.',
    analogy: 'ISI / Hallmark quality mark.'
  },
  'dcr': {
    explanation: 'Domestic Content Requirement — rule requiring solar equipment to be manufactured in India.',
    analogy: 'Made in India certification.'
  },
  'discom': {
    explanation: 'Distribution Company — your local state or private electricity provider board.',
    analogy: 'Local electricity board.'
  },
  'net-meter': {
    explanation: 'A two-way electric meter that tracks electricity you take from the grid and solar power you send back.',
    analogy: 'Two-way electricity meter.'
  },
  'proviso': {
    explanation: 'A mandatory condition or requirement that you must satisfy to receive benefits.',
    analogy: 'Terms and conditions rule.'
  },
  'ex-gratia': {
    explanation: 'A payment made by the government out of relief or goodwill, not as a legal obligation.',
    analogy: 'Disaster / accident relief fund.'
  },
  'supersession': {
    explanation: 'Replacing and cancelling older rules or circulars with new updated rules.',
    analogy: 'Software update overriding old rules.'
  },
  'admissible': {
    explanation: 'Eligible or allowed according to government policy.',
    analogy: 'Permitted under official rules.'
  },
  'dbt': {
    explanation: 'Direct Benefit Transfer — money is deposited straight into your bank account without middlemen.',
    analogy: 'Direct bank transfer.'
  },
  'e-kyc': {
    explanation: 'Electronic verification of your identity using your Aadhaar number and OTP or fingerprint.',
    analogy: 'Digital ID check.'
  },
  'non-est': {
    explanation: 'Latin legal term meaning invalid, void, or as if it never existed in the eyes of the law.',
    analogy: 'Completely null and void.'
  },
  'encumbrance': {
    explanation: 'A legal claim, loan mortgage, or restriction on a property.',
    analogy: 'A debt or legal lock on property.'
  }
};

export class AIExplainerService {
  private static apiKey: string = '';

  static setApiKey(key: string) {
    this.apiKey = key;
    if (typeof window !== 'undefined') {
      localStorage.setItem('janseva_gemini_api_key', key);
    }
  }

  static getApiKey(): string {
    if (this.apiKey) return this.apiKey;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('janseva_gemini_api_key');
      if (stored) {
        this.apiKey = stored;
        return stored;
      }
    }
    return '';
  }

  /**
   * Cleans OCR noise (e.g. #<%, random symbols, isolated 1-2 char lines)
   */
  static cleanOCRText(raw: string): string {
    return raw
      .split('\n')
      .map(line => line.trim())
      .filter(line => {
        if (!line) return false;
        if (line.length <= 2) return false;
        const letterCount = (line.match(/[a-zA-Z0-9\u0900-\u0D7F]/g) || []).length;
        return letterCount >= 3;
      })
      .map(line => line.replace(/^[#<%>=\-\_\$\*\+~`|\\/]+\s*/, '').trim())
      .join('\n');
  }

  /**
   * Run OCR on an uploaded image/photo to extract printed or scanned government text
   */
  static async extractTextFromImage(
    imageSource: string | File | Blob,
    onProgress?: (progress: number, status: string) => void
  ): Promise<string> {
    try {
      if (onProgress) onProgress(10, 'Initializing OCR engine...');
      const result = await Tesseract.recognize(imageSource, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text' && onProgress) {
            const p = Math.round(m.progress * 100);
            onProgress(p, `Scanning photo text: ${p}%`);
          }
        }
      });
      const rawText = result.data.text || '';
      return this.cleanOCRText(rawText) || rawText;
    } catch (err) {
      console.error('Tesseract OCR error:', err);
      throw new Error('Could not read text from this image. Please ensure the photo is clear and well lit.');
    }
  }

  /**
   * Analyzes an uploaded photo or image of a government notice.
   */
  static async analyzeImageNotice(
    base64Data: string,
    mimeType: string,
    targetLanguage: Language,
    onProgress?: (p: number, msg: string) => void
  ): Promise<{ analysis: NoticeAnalysis; extractedText: string }> {
    const key = this.getApiKey();

    if (key) {
      try {
        if (onProgress) onProgress(30, 'Sending image to Gemini Multimodal AI Vision...');
        const cleanBase64 = base64Data.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

        const prompt = `You are JanSeva AI, an elite legal and public policy simplifier for Indian citizens.
Examine this government circular / notice / scheme graphic photo.
Accurately read the scheme name, department, cash amounts, benefits, and rules shown in the image.
Translate and output the result STRICTLY as a JSON object with this exact structure:
{
  "id": "gemini-vision-analysis",
  "title": "Clear authentic official title from the image",
  "authority": "Issuing Ministry or Authority from the image",
  "date": "Date if mentioned or 2026",
  "rawText": "The clean, complete text extracted from the image",
  "summary": "Plain language summary at a 5th-grade reading level explaining what this notice actually means in practice.",
  "whoIsAffected": "Who exactly this impacts",
  "keyBenefits": ["Benefit 1", "Benefit 2"],
  "criticalConditions": ["Rule 1", "Rule 2"],
  "documentsNeeded": ["Doc 1", "Doc 2"],
  "actionSteps": ["Step 1", "Step 2", "Step 3"],
  "deadlines": ["Deadlines or 'Ongoing'"],
  "jargonList": [
    {
      "term": "Complex word from text",
      "explanation": "What it actually means",
      "simpleAnalogy": "Everyday analogy"
    }
  ],
  "scamAlert": "Clear warning against middleman fraud or fake websites regarding this notice",
  "officialLinks": [
    { "name": "Portal Name", "url": "https://example.gov.in", "phone": "1800-xxx-xxxx" }
  ]
}

Ensure all explanations are clear, actionable, free of jargon, and adapted for language: ${targetLanguage}.`;

        const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
        for (const model of models) {
          try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      { text: prompt },
                      {
                        inlineData: {
                          mimeType: mimeType || 'image/jpeg',
                          data: cleanBase64
                        }
                      }
                    ]
                  }
                ],
                generationConfig: { responseMimeType: 'application/json' }
              })
            });

            if (res.ok) {
              const data = await res.json();
              const jsonStr = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (jsonStr) {
                const parsed = JSON.parse(jsonStr);
                if (onProgress) onProgress(100, 'Analysis complete!');
                return { analysis: parsed, extractedText: parsed.rawText || '' };
              }
            }
          } catch (modelErr) {
            console.warn(`Vision model ${model} failed, trying next:`, modelErr);
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini vision failed, falling back to OCR:', geminiErr);
      }
    }

    // Fallback: Run client-side OCR
    if (onProgress) onProgress(20, 'Scanning photo with client OCR...');
    const extractedText = await this.extractTextFromImage(base64Data, onProgress);
    if (onProgress) onProgress(80, 'Analyzing extracted notice text...');
    const analysis = await this.analyzeNotice(extractedText, targetLanguage);
    if (onProgress) onProgress(100, 'Done!');
    return { analysis, extractedText };
  }

  /**
   * Analyzes an official notice or legal text.
   */
  static async analyzeNotice(rawText: string, targetLanguage: Language): Promise<NoticeAnalysis> {
    const key = this.getApiKey();
    if (key) {
      try {
        return await this.analyzeWithGemini(rawText, targetLanguage, key);
      } catch (err) {
        console.warn('Gemini API call failed, falling back to built-in parser:', err);
      }
    }
    return this.analyzeHeuristically(rawText, targetLanguage);
  }

  /**
   * Answers a voice or text query from the citizen in simple terms.
   */
  static async answerCitizenQuery(query: string, targetLanguage: Language): Promise<string> {
    const key = this.getApiKey();
    if (key) {
      try {
        const prompt = `You are JanSeva AI, an empathetic, highly knowledgeable public policy, student welfare, and legal rights assistant for citizens in India.
Answer the following citizen statement or question in simple, everyday language (5th-grade level) with zero confusing legal jargon.
If the citizen is a student (e.g., B.Tech / college student), guide them on scholarships (NSP, Post-Matric), interest subsidies for education loans (PM-Vidyalaxmi), skill schemes, and student rights (e.g. UGC ban on colleges holding original certificates).
If they ask about welfare schemes or rights, give practical steps, mention official portals and helplines, and warn against frauds.
Language: Answer directly and fluently in ${targetLanguage} language. Keep the response concise, clear for reading aloud (under 160 words).
Citizen Statement: "${query}"`;

        const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
        for (const model of models) {
          try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
              })
            });

            if (res.ok) {
              const data = await res.json();
              const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (answer) return answer.trim();
            }
          } catch (modelErr) {
            console.warn(`Model ${model} failed, trying next:`, modelErr);
          }
        }
      } catch (e) {
        console.warn('Gemini query failed, using offline engine:', e);
      }
    }

    return this.answerQueryOffline(query, targetLanguage);
  }

  /**
   * Dynamic heuristic parser that extracts titles, authorities, numbers, rules, and jargon directly from user text!
   */
  private static analyzeHeuristically(rawText: string, lang: Language): NoticeAnalysis {
    const cleanedText = this.cleanOCRText(rawText);
    const textToProcess = cleanedText || rawText;
    const lower = textToProcess.toLowerCase();

    // Split into non-empty clean lines
    const lines = textToProcess.split('\n').map(l => l.trim()).filter(Boolean);

    // 1. DYNAMIC TITLE EXTRACTION
    let title = '';
    let authority = '';
    let refNumber = '';

    // Search for authority and title in the first 6 lines
    for (let i = 0; i < Math.min(lines.length, 6); i++) {
      const line = lines[i];
      // Authority patterns
      if (/ministry of|department of|government of|municipal|authority|commission|court of|panchayat/i.test(line) && !authority) {
        authority = line;
      }
      // Reference number
      else if (/no\.\s?[0-9]|file no|notification no|order no|circular no/i.test(line) && !refNumber) {
        refNumber = line;
      }
      // Notification title
      else if (/notification|circular|directive|order|advisory|guidelines|rules|act|scheme/i.test(line) && !title) {
        title = line;
      }
      // Fallback title to first prominent line
      else if (!title && line.length > 8 && !/gazette of india/i.test(line)) {
        title = line;
      }
    }

    if (!title && lines.length > 0) title = lines[0];
    if (!authority) authority = 'Competent Public Authority';

    // 2. DYNAMIC MONETARY VALUE DETECTION (₹, Rs, Lakhs, Crores, %)
    const rupeeMatches = textToProcess.match(/₹\s?[\d,]+(\/\-)?|Rs\.?\s?[\d,]+|[\d,]+\s?(lakh|crore|thousand|units|%)/gi) || [];
    const uniqueAmounts = Array.from(new Set(rupeeMatches)).slice(0, 5);

    // 3. DYNAMIC NUMBERED / BULLETED RULES EXTRACTION
    const extractedRules: string[] = [];
    for (const line of lines) {
      if (/^(\d+[\.\)]|\([a-z0-9]\)|•|\-)\s+/i.test(line) && line.length > 15) {
        extractedRules.push(line.replace(/^(\d+[\.\)]|\([a-z0-9]\)|•|\-)\s+/, '').trim());
      }
    }

    // 4. DYNAMIC JARGON DETECTION
    const detectedJargon: JargonTerm[] = [];
    for (const [term, meta] of Object.entries(COMMON_JARGON_DICTIONARY)) {
      if (lower.includes(term.toLowerCase())) {
        detectedJargon.push({
          term: term.toUpperCase(),
          explanation: meta.explanation,
          simpleAnalogy: meta.analogy
        });
      }
    }

    if (detectedJargon.length === 0) {
      detectedJargon.push({
        term: 'Direct Benefit Transfer (DBT)',
        explanation: 'Money is deposited straight into your bank account with no middleman.',
        simpleAnalogy: 'Direct bank transfer.'
      });
      detectedJargon.push({
        term: 'Proviso / Conditions',
        explanation: 'Mandatory rules that must be satisfied to receive official entitlements.',
        simpleAnalogy: 'Rules that must be followed.'
      });
    }

    // 5. TOPIC-SPECIFIC INTELLIGENCE
    // Topic A: SOLAR / PM SURYA GHAR / POWER
    if (lower.includes('solar') || lower.includes('surya') || lower.includes('muft bijli') || lower.includes('electricity')) {
      return {
        id: 'solar-' + Date.now(),
        title: title || 'PM Surya Ghar: Residential Rooftop Solar Guidelines',
        authority: authority || 'Ministry of New and Renewable Energy (MNRE)',
        date: '2026',
        rawText: textToProcess,
        summary: `The government provides direct bank subsidies up to ₹78,000 to install rooftop solar panels, enabling residential households to generate up to 300 units of free electricity every month.`,
        whoIsAffected: 'Homeowners and long-term residential electricity consumers.',
        keyBenefits: uniqueAmounts.length > 0 
          ? [
              `Direct Bank Subsidy: ${uniqueAmounts.join(' | ')} credited via DBT.`,
              'Up to 300 units of free solar electricity every month.',
              'Excess electricity generated during sunny hours feeds back into the grid to reduce electricity bills.'
            ]
          : [
              'Direct cash subsidy up to ₹78,000 deposited into your bank account.',
              'Up to 300 units of free power per month.'
            ],
        criticalConditions: [
          'Must have an active domestic low-tension (LT) electricity connection.',
          'Solar panels must be DCR compliant (Made in India) and installed exclusively via DISCOM-empaneled vendors.',
          'Unregistered third-party installations will not be eligible for government subsidy.'
        ],
        documentsNeeded: [
          'Latest Electricity Bill (showing Consumer Account Number)',
          'Aadhaar Card of electricity bill holder',
          'Bank Passbook / Cancelled Cheque (Aadhaar-seeded for DBT)',
          'Roof possession proof / Tenancy consent'
        ],
        actionSteps: [
          '1. Register on pmsuryaghar.gov.in with your electricity provider (DISCOM) and Consumer Number.',
          '2. Submit rooftop feasibility application online.',
          '3. Choose a registered empaneled vendor to complete installation.',
          '4. DISCOM inspects and installs the two-way net meter.',
          '5. Direct subsidy is transferred to your bank account within 30 days.'
        ],
        deadlines: ['Active scheme operational through 2026-2027.'],
        jargonList: detectedJargon,
        scamAlert: 'Do NOT pay unauthorized middleman fees. Registration on pmsuryaghar.gov.in is completely free.',
        officialLinks: [
          { name: 'PM Surya Ghar National Portal', url: 'https://pmsuryaghar.gov.in', phone: '15555' }
        ]
      };
    }

    // Topic B: TENANCY / RENT / HOUSING EVICTION
    if (lower.includes('eviction') || lower.includes('tenant') || lower.includes('landlord') || lower.includes('rent control') || lower.includes('tenancy')) {
      return {
        id: 'tenancy-' + Date.now(),
        title: title || 'Municipal Tenancy & Rent Protection Directive',
        authority: authority || 'Municipal Rent Control Authority & Sub-Divisional Magistrate',
        date: '2026',
        rawText: textToProcess,
        summary: `This directive prohibits landlords from arbitrarily evicting tenants, cutting essential water/electricity supplies, or demanding more than 2 months rent as security deposit.`,
        whoIsAffected: 'Tenants and residential property owners.',
        keyBenefits: [
          'Statutory protection against arbitrary utility disconnection (water/power).',
          'Security deposit is strictly capped at a maximum of 2 months rent.',
          'Mandatory 30-day statutory written notice before any eviction can be initiated.'
        ],
        criticalConditions: [
          'Tenants must retain proof of rent payment (UPI receipts, bank transfers, or signed slips).',
          'Landlord must give at least 24 hours prior written notice before entering rented premises.'
        ],
        documentsNeeded: [
          'Written Rent Agreement',
          'Rent payment transaction receipts / UPI screenshots',
          'Utility disconnection evidence / Landlord communication'
        ],
        actionSteps: [
          '1. If water or power is cut, file an emergency petition before the local Rent Authority / SDM Court.',
          '2. Summary reconnection orders are issued within 24 hours.',
          '3. Dial 15100 for free government legal aid or 112 if facing physical intimidation.'
        ],
        deadlines: ['30 days mandatory notice required before eviction proceedings.'],
        jargonList: detectedJargon,
        scamAlert: 'Oral eviction threats or changing door locks without court orders are illegal. Police cannot assist unlawful lockouts.',
        officialLinks: [
          { name: 'National Free Legal Aid Helpline', url: 'https://nalsa.gov.in', phone: '15100' },
          { name: 'Emergency Helpline', url: 'tel:112', phone: '112' }
        ]
      };
    }

    // Topic C: AYUSHMAN / HEALTHCARE
    if (lower.includes('arocgya') || lower.includes('arogya') || lower.includes('ayushman') || lower.includes('pmjay') || lower.includes('cashless')) {
      return {
        id: 'pmjay-' + Date.now(),
        title: title || 'Pradhan Mantri Jan Arogya Yojana (Ayushman Bharat)',
        authority: authority || 'National Health Authority (NHA)',
        date: '2026',
        rawText: textToProcess,
        summary: 'Provides completely cashless and paperless hospital healthcare coverage up to ₹5,00,000 per family per year in over 29,000 empaneled hospitals across India.',
        whoIsAffected: 'Eligible families and all senior citizens aged 70+ across India.',
        keyBenefits: [
          '₹5,00,000 annual cashless hospital treatment per family.',
          '100% paperless and cashless admission at all empaneled hospitals.',
          'Covers pre-existing diseases, surgery, ICU, and diagnostics from Day 1.'
        ],
        criticalConditions: [
          'Hospital must be empaneled under AB-PMJAY network.',
          'Hospitals cannot demand advance cash deposits for covered treatments.'
        ],
        documentsNeeded: [
          'Aadhaar Card (linked with active mobile)',
          'Ration Card / PMJAY Family Letter'
        ],
        actionSteps: [
          '1. Check eligibility on beneficiary.nha.gov.in or Ayushman App.',
          '2. Complete Aadhaar e-KYC and download card instantly.',
          '3. Present card at the hospital Ayushman Mitra desk.'
        ],
        deadlines: ['Active operational universal coverage.'],
        jargonList: detectedJargon,
        scamAlert: 'Ayushman Card creation is 100% FREE. Never pay money to private agents.',
        officialLinks: [
          { name: 'NHA Beneficiary Portal', url: 'https://beneficiary.nha.gov.in', phone: '14555' }
        ]
      };
    }

    // Generic Document Breakdown using extracted details!
    const keyBenefits: string[] = uniqueAmounts.length > 0 
      ? uniqueAmounts.map(amt => `Financial entitlement / benefit amount of ${amt} specified in the notification.`)
      : extractedRules.length > 0
      ? extractedRules.slice(0, 3)
      : [
          'Direct welfare entitlement and statutory protection under notified government guidelines.',
          'Simplified access through online designated portal and CSC centers.'
        ];

    const criticalConditions: string[] = extractedRules.length > 3
      ? extractedRules.slice(3, 6)
      : [
          'Beneficiaries must satisfy all eligibility parameters stated in the notification.',
          'Must possess valid government identification (Aadhaar / Voter ID).',
          'Applications must be submitted through designated official portals or district offices.'
        ];

    return {
      id: 'custom-' + Date.now(),
      title: title.length > 90 ? title.substring(0, 87) + '...' : title,
      authority,
      date: new Date().toISOString().split('T')[0],
      rawText: textToProcess,
      summary: `This official notification from ${authority} specifies citizen entitlements and mandatory rules. Eligible citizens complying with the stated criteria can apply to receive benefits directly.`,
      whoIsAffected: 'Eligible citizens, beneficiaries, and households as designated in this notification.',
      keyBenefits,
      criticalConditions,
      documentsNeeded: [
        'Aadhaar Card (linked with mobile number)',
        'Active Bank Account Passbook (Aadhaar-seeded for DBT)',
        'Relevant certificate or document specified in the notice',
        'Address Proof (Electricity Bill / Ration Card)'
      ],
      actionSteps: [
        '1. Verify your eligibility against the criteria outlined above.',
        '2. Keep required documents scanned and mobile phone ready for OTP verification.',
        '3. Visit the designated government portal or nearest Common Services Center (CSC).',
        '4. Submit your application and note down the tracking / acknowledgement number.'
      ],
      deadlines: ['Active operational notification. Apply at the earliest.'],
      jargonList: detectedJargon,
      scamAlert: 'Never pay any unauthorized agent or share your OTP / banking passwords. Government welfare registrations are conducted through official portals with standard minimal fees.',
      officialLinks: [
        { name: 'National Government Services Portal', url: 'https://services.india.gov.in', phone: '1800-111-555' }
      ]
    };
  }

  private static async analyzeWithGemini(rawText: string, lang: Language, key: string): Promise<NoticeAnalysis> {
    const prompt = `You are JanSeva AI, an elite legal and public policy simplifier for Indian citizens.
Analyze this official government document, circular, or legal notice text.
Translate and output the result STRICTLY as a JSON object with this exact structure:
{
  "id": "gemini-analysis",
  "title": "Clear short title of notice",
  "authority": "Issuing Ministry or Department",
  "date": "Date if mentioned or 2026",
  "summary": "Plain language summary at a 5th-grade reading level explaining what this notice actually means in practice.",
  "whoIsAffected": "Who exactly this impacts",
  "keyBenefits": ["Benefit 1", "Benefit 2"],
  "criticalConditions": ["Rule 1", "Rule 2"],
  "documentsNeeded": ["Doc 1", "Doc 2"],
  "actionSteps": ["Step 1", "Step 2", "Step 3"],
  "deadlines": ["Deadlines or 'Ongoing'"],
  "jargonList": [
    {
      "term": "Complex word from text",
      "explanation": "What it actually means",
      "simpleAnalogy": "Everyday analogy"
    }
  ],
  "scamAlert": "Clear warning against middleman fraud or fake websites regarding this notice",
  "officialLinks": [
    { "name": "Portal Name", "url": "https://example.gov.in", "phone": "1800-xxx-xxxx" }
  ]
}

Ensure all explanations are clear, actionable, free of jargon, and adapted for language: ${lang}.
Official Document Text:
"""
${rawText}
"""`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.statusText}`);
    }

    const data = await res.json();
    const jsonStr = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(jsonStr);
    parsed.rawText = rawText;
    return parsed;
  }

  private static matchWord(text: string, pattern: RegExp): boolean {
    return pattern.test(text);
  }

  public static answerQueryOffline(query: string, lang: Language): string {
    const q = query.toLowerCase().trim();

    // 1. STUDENTS / B.TECH / COLLEGE / HIGHER EDUCATION / SCHOLARSHIPS / DEGREES
    if (this.matchWord(q, /\b(student|students|b\s?tech|btech|engineering|college|degree|undergraduate|postgraduate|scholarship|scholarships|tuition|fees|vidyalakshmi|nsp|aicte|exam|campus)\b/i) ||
        q.includes('छात्र') || q.includes('विद्यार्थी') || q.includes('इंजीनियरिंग') || q.includes('कॉलेज') || q.includes('स्कॉलरशिप') || q.includes('மாணவர்') || q.includes('విద్యార్థి')) {
      
      if (lang === 'hi') {
        return `बी.टेक और कॉलेज छात्रों के लिए सरकार की प्रमुख योजनाएं एवं अधिकार:

1. नेशनल स्कॉलरशिप पोर्टल (NSP scholarships.gov.in): पोस्ट-मैट्रिक और मेरिट-कम-मीन्स छात्रवृत्ति के तहत ट्यूशन फीस की 100% तक वापसी और मासिक गुजारा भत्ता।
2. पीएम-विद्यालक्ष्मी (PM-Vidyalaxmi): उच्च तकनीकी शिक्षा के लिए बिना किसी गारंटी (collateral-free) के ₹7.5 से ₹10 लाख तक का सस्ता शिक्षा ऋण, जिस पर ब्याज सब्सिडी (CSIS) मिलती है।
3. एआईसीटीई प्रगति एवं सक्षम योजना: इंजीनियरिंग/डिप्लोमा छात्राओं एवं दिव्यांग छात्रों को ₹50,000 प्रति वर्ष की छात्रवृत्ति।
4. छात्र कानूनी अधिकार: यूजीसी/एआईसीटीई नियमानुसार कोई भी कॉलेज छात्र के मूल प्रमाण पत्र (original certificates) जब्त नहीं रख सकता। दाखिला रद्द कराने पर नियमानुसार फीस वापसी अनिवार्य है।`;
      }

      if (lang === 'ta') {
        return `பி.டெக் மற்றும் கல்லூரி மாணவர்களுக்கான முக்கிய அரசு நலத்திட்டங்கள் மற்றும் உரிமைகள்:

1. தேசிய உதவித்தொகை போர்டல் (scholarships.gov.in): தகுதியான மாணவர்களுக்கு கல்விக் கட்டணத்தை 100% வரை திரும்பப் பெறும் போஸ்ட்-மெட்ரிக் உதவித்தொகை.
2. பிஎம்-வித்யாலட்சுமி (PM-Vidyalaxmi): பொறியியல் படிப்புக்கு பிணையற்ற (collateral-free) ₹10 லட்சம் வரை கல்விக் கடன் மற்றும் வட்டி மானியம்.
3. ஏஐசிடிஇ பிரகதி திட்டம்: மாணவிகளுக்கு ஆண்டுக்கு ₹50,000 உதவித்தொகை.
4. மாணவர் உரிமை: எந்தக் கல்லூரியும் மாணவரின் அசல் சான்றிதழ்களை தடுத்து வைக்க அனுமதி இல்லை (UGC உத்தரவு).`;
      }

      if (lang === 'te') {
        return `బీటెక్ మరియు కళాశాల విద్యార్థుల కోసం ప్రభుత్వ పథకాలు & హక్కులు:

1. నేషనల్ స్కాలర్‌షిప్ పోర్టల్ (NSP scholarships.gov.in): పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ ద్వారా కళాశాల ఫీజు రీయింబర్స్‌మెంట్.
2. పీఎం-విద్యాలక్ష్మి (PM-Vidyalaxmi): హామీ లేకుండా ₹7.5 - ₹10 లక్షల వరకు విద్యా రుణాలు మరియు వడ్డీ సబ్సిడీ.
3. ఏఐసీటీఈ ప్రగతి & సక్షమ్: ఇంజనీరింగ్ విద్యార్థినులకు ఏడాదికి ₹50,000 స్కాలర్‌షిప్.
4. విద్యార్థి హక్కులు: కళాశాలలు ఒరిజినల్ సర్టిఫికెట్లను తమ వద్ద ఉంచుకోవడం చట్టవిరుద్ధం (UGC నిబంధన).`;
      }

      return `As a B.Tech / college student, here are the top government schemes, scholarships, and legal rights available to you:

1. National Scholarship Portal (NSP - scholarships.gov.in): Post-Matric & Central Sector Schemes offer up to 100% tuition fee reimbursement and annual maintenance allowances for eligible categories (SC/ST/OBC/EWS/Minorities).
2. PM-Vidyalaxmi Scheme (vidyalakshmi.co.in): Collateral-free education loans up to ₹7.5 to ₹10 Lakhs with full Central Sector Interest Subsidy (CSIS) during the study moratorium.
3. AICTE Pragati & Saksham Schemes: ₹50,000/year technical degree scholarship for girl students and specially-abled engineering students.
4. Statutory Student Rights:
   • UGC & AICTE strictly forbid colleges from retaining your original marksheets and school/diploma certificates.
   • Right to full fee refund (subject to statutory processing deduction) upon timely admission cancellation.
   • National Anti-Ragging Toll-Free Helpline: 1800-180-5522.`;
    }

    // 2. FARMERS & AGRICULTURE (PM-KISAN, KCC, Crop Insurance)
    if (this.matchWord(q, /\b(kisan|farmer|farmers|agriculture|crop|crops|pmkisan|fasal|farming|tractor|khata|khasra)\b/i) ||
        q.includes('किसान') || q.includes('खेती') || q.includes('விவசாயி') || q.includes('రైతు')) {
      if (lang === 'hi') {
        return 'पीएम-किसान योजना में पात्र किसान परिवारों को सालाना ₹6,000 की प्रत्यक्ष सहायता (3 किश्तों में ₹2,000 प्रत्येक) सीधे बैंक खाते में मिलती है। आवेदन हेतु आधार, खतौनी (भूमि रिकॉर्ड) और ई-केवाईसी आवश्यक है। pmkisan.gov.in पर निःशुल्क आवेदन करें या नजदीकी सीएससी केंद्र जाएं। हेल्पलाइन: 155261। इसके अतिरिक्त फसल बीमा हेतु पीएम फसल बीमा योजना (PMFBY) का लाभ उठाएं।';
      }
      return 'Under PM-KISAN, landowning farmer families receive ₹6,000 per year directly in their bank accounts in three 4-monthly installments of ₹2,000 each. Required: Land record (Khata/Khasra), Aadhaar, and e-KYC. Apply 100% free on pmkisan.gov.in or nearest CSC. Helpline: 155261. You can also avail Kisan Credit Card (KCC) at 4% subsidized interest.';
    }

    // 3. SENIOR CITIZENS & HEALTHCARE (Ayushman Bharat 70+, Pensions)
    if (this.matchWord(q, /\b(senior|elderly|70|70\+|old age|ayushman|pmjay|hospital|cashless|treatment|vaya vandana|pensioner)\b/i) ||
        q.includes('बुजुर्ग') || q.includes('आयुष्मान') || q.includes('पेंशन') || q.includes('மூத்த குடிமக்கள்') || q.includes('వృద్ధులు')) {
      if (lang === 'hi') {
        return '70 वर्ष या उससे अधिक आयु के प्रत्येक वरिष्ठ नागरिक के लिए आयुष्मान भारत (AB-PMJAY) के तहत सालाना ₹5 लाख तक का 100% मुफ़्त कैशलेस अस्पताल इलाज उपलब्ध है, चाहे आय कितनी भी हो। इसके लिए कोई वेटिंग पीरियड नहीं है और पुरानी बीमारियां भी कवर हैं। beneficiary.nha.gov.in या "आयुष्मान ऐप" पर आधार ओटीपी से तुरंत "वय वंदना कार्ड" बनाएं। टोल-फ्री हेल्पलाइन: 14555।';
      }
      return 'Under Ayushman Bharat (AB-PMJAY), EVERY citizen aged 70 and above is entitled to ₹5,00,000 annual free cashless hospital treatment in 29,000+ empaneled hospitals, regardless of family income or landholding. Pre-existing diseases are covered from Day 1. Download your "Ayushman Vaya Vandana Card" with Aadhaar on beneficiary.nha.gov.in or Ayushman App. Helpline: 14555.';
    }

    // 4. ROOFTOP SOLAR & ELECTRICITY SUBSIDY (PM Surya Ghar)
    if (this.matchWord(q, /\b(solar|rooftop|surya ghar|electricity bill|free units|bijli|power subsidy)\b/i) ||
        q.includes('सोलर') || q.includes('बिजली') || q.includes('சூரிய சக்தி') || q.includes('సౌర శక్తి')) {
      if (lang === 'hi') {
        return 'पीएम सूर्य घर मुफ्त बिजली योजना के तहत घर की छत पर सोलर पैनल लगाने पर ₹78,000 तक की सीधी बैंक सब्सिडी मिलती है और हर महीने 300 यूनिट तक मुफ्त बिजली मिलती है। 1 kW पर ₹30,000, 2 kW पर ₹60,000 और 3 kW पर ₹78,000 सब्सिडी मिलती है। pmsuryaghar.gov.in पर अपने बिजली बिल नंबर से आवेदन करें। हेल्पलाइन: 15555।';
      }
      return 'Under PM Surya Ghar Muft Bijli Yojana, residential households get up to ₹78,000 in direct bank subsidies for rooftop solar systems (₹30,000 for 1kW, ₹60,000 for 2kW, ₹78,000 for 3kW+), providing up to 300 free electricity units per month. Apply with your electricity bill account number on pmsuryaghar.gov.in. Helpline: 15555.';
    }

    // 5. POLICE, ARREST & CRIMINAL SAFEGUARDS
    if (this.matchWord(q, /\b(police|arrest|arrested|custody|station|detain|detention|fir|handcuff|bail|magistrate|interrogation)\b/i) ||
        q.includes('पुलिस') || q.includes('गिरफ्तार') || q.includes('थाना') || q.includes('காவல்துறை') || q.includes('పోలీస్')) {
      if (lang === 'hi') {
        return 'पुलिस पूछताछ एवं गिरफ्तारी के मुख्य कानूनी अधिकार: 1. पुलिस बिना लिखित अरेस्ट मेमो और बिना ठोस कानूनी आधार के मनमानी गिरफ्तारी नहीं कर सकती (डी.के. बसु दिशानिर्देश)। 2. सूर्यास्त के बाद (शाम 6 बजे से सुबह 6 बजे) किसी भी महिला को मजिस्ट्रेट के विशेष आदेश के बिना गिरफ्तार नहीं किया जा सकता। 3. गिरफ्तारी के 24 घंटे के भीतर नजदीकी न्यायिक मजिस्ट्रेट के सामने पेश करना अनिवार्य है। 4. पूछताछ के दौरान अपने वकील से बात करने का अधिकार है। आपातकाल में 112 या मुफ्त कानूनी सहायता हेतु 15100 डायल करें।';
      }
      return 'Key Police & Arrest Safeguards under D.K. Basu guidelines and CrPC/BNSS: 1. Police MUST state the exact grounds of arrest and prepare a signed Arrest Memo witnessed by a family member or respected citizen. 2. A woman cannot be arrested after sunset (6 PM) and before sunrise (6 AM) without prior written permission from a Judicial Magistrate. 3. You must be produced before the nearest Judicial Magistrate within 24 hours. 4. You have the right to consult an advocate of your choice. Emergency: 112. Free Legal Aid: 15100.';
    }

    // 6. TENANT & HOUSING RIGHTS
    if (this.matchWord(q, /\b(tenant|tenants|tenancy|landlord|landlords|evict|eviction|rent agreement|security deposit|vacate house)\b/i) ||
        q.includes('किराया') || q.includes('मकान मालिक') || q.includes('किरायेदार') || q.includes('வாடகை') || q.includes('అద్దె')) {
      if (lang === 'hi') {
        return 'किरायेदारों के प्रमुख कानूनी अधिकार: 1. मकान मालिक मनमाने ढंग से पानी, बिजली या बुनियादी सुविधाएं नहीं काट सकता; ऐसा करना दंडनीय अपराध है। 2. मॉडल टेनेंसी एक्ट के तहत आवासीय घर के लिए सिक्योरिटी डिपॉजिट अधिकतम 2 महीने के किराए तक सीमित है। 3. घर खाली कराने के लिए मकान मालिक को कम से कम 30 दिन का वैध लिखित कानूनी नोटिस देना अनिवार्य है। बिना अदालती आदेश के जबरन ताला लगाना गैरकानूनी है। विवाद होने पर स्थानीय रेंट अथॉरिटी या एसडीएम कोर्ट में शिकायत करें।';
      }
      return 'Key Tenant Protections under the Model Tenancy Act: 1. Landlords CANNOT disconnect essential utilities (water, electricity) even during rent disputes. 2. Security deposit for residential premises is legally capped at a maximum of 2 months rent. 3. Landlords must give at least 30 days statutory written notice before initiating eviction proceedings. 4. Landlords cannot enter rented premises without 24 hours prior notice. Report unlawful lockouts to the local Rent Authority or SDM Court.';
    }

    // 7. RIGHT TO INFORMATION (RTI)
    if (this.matchWord(q, /\b(rti|right to information|delayed file|tender copy|ration record|government officer delay|first appeal)\b/i) ||
        q.includes('आरटीआई') || q.includes('सूचना का अधिकार') || q.includes('தகவல் அறியும் உரிமை') || q.includes('సమాచార হక్కు')) {
      if (lang === 'hi') {
        return 'सूचना का अधिकार (RTI Act 2005): 1. आप किसी भी सरकारी विभाग से अटकी फाइल, पेंशन स्टेटस, सड़क निर्माण बिल या टेंडर की प्रमाणित प्रतियां मांग सकते हैं। 2. जन सूचना अधिकारी (PIO) को 30 दिन के भीतर जवाब देना अनिवार्य है। 3. आवेदन शुल्क केवल ₹10 है (बीपीएल कार्डधारकों के लिए 100% मुफ़्त)। 4. rtionline.gov.in पर ऑनलाइन आवेदन करें। 30 दिन में उत्तर न मिलने पर विभाग के प्रथम अपीलीय अधिकारी के पास प्रथम अपील दायर करें।';
      }
      return 'Under the Right to Information Act 2005: 1. Every citizen has the right to inspect government records, scheme application status, road construction bills, and work progress. 2. The Public Information Officer (PIO) must furnish information within 30 days (48 hours for life and liberty issues). 3. Application fee is only ₹10 (free for BPL cardholders). 4. File online at rtionline.gov.in. If not answered within 30 days, file a First Appeal at zero extra fee.';
    }

    // 8. WOMEN & CHILD (Sukanya, PMMVY, Domestic Violence)
    if (this.matchWord(q, /\b(women|woman|girl child|sukanya|maternity|pregnant|pregnancy|domestic violence|dowry|single mother|widow)\b/i) ||
        q.includes('महिला') || q.includes('बेटी') || q.includes('सुकन्या') || q.includes('मातृत्व') || q.includes('பெண்கள்') || q.includes('మహిళలు')) {
      if (lang === 'hi') {
        return 'महिलाओं व बेटियों के लिए प्रमुख कल्याणकारी योजनाएं एवं सुरक्षा: 1. सुकन्या समृद्धि योजना (SSY): 10 वर्ष तक की बेटियों के लिए 8.2% कर-मुक्त चक्रवृद्धि ब्याज वाली डाकघर बचत योजना। 2. प्रधानमंत्री मातृ वंदना योजना (PMMVY): पहले व दूसरे बच्चे पर ₹5,000 से ₹6,000 की मातृत्व आर्थिक सहायता। 3. घरेलू हिंसा संरक्षण कानून (PWDVA 2005): ससुराल में रहने का अधिकार और मासिक गुजारा भत्ता। महिला सुरक्षा हेल्पलाइन: 181 या 112।';
      }
      return 'Key Welfare Schemes and Protections for Women: 1. Sukanya Samriddhi Yojana (SSY): 8.2% tax-free compound interest savings for girls under 10 years at Post Offices. 2. Pradhan Mantri Matru Vandana Yojana (PMMVY): ₹5,000 to ₹6,000 maternity cash benefit for first and second childbirth. 3. Protection of Women from Domestic Violence Act 2005: Inviolable right to reside in the shared matrimonial household and monthly maintenance. Emergency Women Helplines: 181 and 112.';
    }

    // 9. UNORGANIZED WORKERS & LABOR (e-Shram, MGNREGA, Minimum Wage)
    if (this.matchWord(q, /\b(shram|eshram|worker|workers|labor|labour|mgnrega|nrega|daily wage|unorganized|minimum wage|overtime)\b/i) ||
        q.includes('मजदूर') || q.includes('श्रमिक') || q.includes('ई-श्रम') || q.includes('मनरेगा') || q.includes('தொழிலாளர்') || q.includes('కార్మికులు')) {
      if (lang === 'hi') {
        return 'असंगठित श्रमिकों और मजदूरों के अधिकार: 1. ई-श्रम कार्ड (eshram.gov.in): मुफ़्त 12-अंकों का UAN कार्ड और दुर्घटना में मृत्यु पर ₹2 लाख का मुफ़्त बीमा। 2. मनरेगा (MGNREGA): ग्रामीण परिवारों को 100 दिन का कानूनी गारंटीशुदा रोज़गार। 15 दिन में काम न मिलने पर बेरोज़गारी भत्ता। 3. न्यूनतम मजदूरी अधिकार: तय सरकारी दर से कम भुगतान अपराध है। 8 घंटे से अधिक काम पर दोगुना ओवरटाइम वेतन अनिवार्य है। श्रम हेल्पलाइन: 14434।';
      }
      return 'Rights & Schemes for Workers: 1. e-Shram Card (eshram.gov.in): Free 12-digit Universal Account Number + ₹2 Lakh free accidental insurance cover. 2. MGNREGA: Legal guarantee of 100 days wage employment per rural household, or statutory unemployment allowance if work is not allotted within 15 days. 3. Minimum Wages & Overtime: Employers cannot pay below state statutory minimum wage rates. Overtime beyond 8 hours/day mandates double the normal wage. Labour helpline: 14434.';
    }

    // 10. CONSUMER PROTECTION & DIGITAL COMMERCE
    if (this.matchWord(q, /\b(consumer|ecommerce|amazon|flipkart|refund|cancellation|dark pattern|fake fee|cheated online)\b/i) ||
        q.includes('उपभोक्ता') || q.includes('रिफंड') || q.includes('धोखाधड़ी') || q.includes('நுகர்வோர்')) {
      if (lang === 'hi') {
        return 'उपभोक्ता संरक्षण कानून 2019: ऑनलाइन शॉपिंग कंपनियां चुपके से कोई छिपा हुआ शुल्क (डार्क पैटर्न) नहीं जोड़ सकतीं और न ही 10% से अधिक कैंसिलेशन शुल्क ले सकती हैं। खराब सामान या रिफंड न मिलने पर राष्ट्रीय उपभोक्ता हेल्पलाइन 1915 पर कॉल करें या व्हाट्सएप (8800001915) करें। edaakhil.nic.in पर बिना वकील घर बैठे निःशुल्क उपभोक्ता कोर्ट में शिकायत दर्ज करें।';
      }
      return 'Consumer Protection Act 2019: Platforms cannot use dark patterns to sneak pre-ticked add-ons into your cart, nor levy unilateral cancellation charges exceeding 10%. If denied a legitimate refund or sent defective items, call the National Consumer Helpline at 1915 or WhatsApp to 8800001915. You can file a case online at edaakhil.nic.in without hiring an advocate.';
    }

    // 11. HOUSING & HOMES (PMAY, Kutcha House)
    if (this.matchWord(q, /\b(pmay|housing|pucca house|kutcha house|awas yojana|homeless)\b/i) ||
        q.includes('आवास') || q.includes('मकान') || q.includes('வீட்டு வசதி')) {
      if (lang === 'hi') {
        return 'प्रधानमंत्री आवास योजना (PMAY): ग्रामीण क्षेत्रों में कच्चे मकानों में रहने वाले या बेघर परिवारों को पक्का मकान बनाने के लिए ₹1.20 लाख से ₹1.30 लाख की सीधी बैंक सहायता + 90 दिन की मनरेगा मजदूरी और शौचालय अनुदान मिलता है। ग्राम पंचायत सचिव या आवास+ सूची में नाम जांचें। pmayg.nic.in या 1800-11-6446।';
      }
      return 'Under Pradhan Mantri Awas Yojana (PMAY-G), homeless families and those living in kutcha/dilapidated houses in rural areas receive ₹1.20 Lakh to ₹1.30 Lakh direct financial assistance in installments, plus 90 days of MGNREGA wages and ₹12,000 for toilet construction. Check priority on the Awaas+ list via your Gram Panchayat or pmayg.nic.in.';
    }

    // 12. GENERAL CONVERSATIONAL FALLBACK
    if (lang === 'hi') {
      return `नमस्ते! जनसेवा एआई (JanSeva AI) में आपका स्वागत है।

आप किसी भी सरकारी योजना या नागरिक अधिकार के बारे में पूछ सकते हैं:
• छात्र व युवा: स्कॉलरशिप (NSP), शिक्षा ऋण (PM-Vidyalaxmi), प्रमाण पत्र अधिकार
• किसान: पीएम-किसान (₹6000), फसल बीमा, केसीसी
• बुजुर्ग: आयुष्मान भारत (70+ वरिष्ठ ₹5 लाख मुफ़्त इलाज), पेंशन
• कामगार: ई-श्रम, मनरेगा, न्यूनतम मजदूरी, पीएफ
• कानूनी अधिकार: पुलिस गिरफ्तारी नियम, मकान मालिक व किराया कानून, आरटीआई (RTI)

कृपया अपनी स्थिति या सवाल बताएं!`;
    }

    return `Namaste! Welcome to JanSeva AI.

You can ask about any government scheme, welfare entitlement, or citizen rights:
• Students & Youth: Scholarships (NSP Post-Matric), Education Loans (PM-Vidyalaxmi), Student Rights
• Farmers: PM-KISAN (₹6,000/yr), Crop Insurance, KCC loan
• Senior Citizens: Universal Ayushman Bharat 70+ (₹5 Lakh free health cover), Pensions
• Workers & Labor: e-Shram Card (₹2 Lakh accident cover), MGNREGA, Minimum Wage laws
• Legal Protections: Police arrest rules, Tenant/Landlord disputes, RTI filing, Consumer refunds

Feel free to speak or type your situation or question!`;
  }
}
