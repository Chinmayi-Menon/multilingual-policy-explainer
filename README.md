# JanSeva AI — Multilingual Policy, Rights & Scheme Explainer 🏛️

> **Democratizing Government Notices, Welfare Schemes & Citizen Rights in Simple Language and Regional Voices.**

JanSeva AI is an intelligent civic-tech application built to empower citizens by translating convoluted government circulars, legal acts, and welfare schemes into plain, accessible language and 12 regional languages. It features an interactive eligibility screener, everyday legal safeguards guide with an RTI letter drafter, and a full voice assistant ("Bolti Sahayata") that speaks and listens.

---

## 🌟 Key Capabilities

### 1. 📄 Policy & Notice Decoder (Official Document Simplifier)
- **Plain Language Breakdown**: Translates bureaucratic legalese into a 5th-grade reading level.
- **Pre-loaded Authentic Samples**:
  - *PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar Subsidy Gazette)*
  - *Universal Healthcare for All Citizens Aged 70+ (Ayushman Bharat NHA Notification)*
  - *CCPA Advisory on E-Commerce Hidden Cancellation Fees & Dark Patterns*
- **Custom Upload & Paste**: Accepts any official gazette, court order, circular, or tenancy rule text.
- **Bureaucratic Jargon Buster**: Detects and translates difficult terms (*suo motu, ex-gratia, proviso, DBT, e-KYC, encumbrance*) into everyday analogies.
- **5-Part Structured Analysis**: Plain summary, key entitlements/cash amounts, disqualifying conditions, step-by-step checklist, and verified official portals.
- **Anti-Scam Alert**: Highlights common broker traps, fake download links, and unauthorized fees.

### 2. 🎯 Smart Scheme Eligibility Screener
- **Citizen Profiler**: Captures age, gender, occupation, family income bracket, agricultural land holding, social category, rural/urban classification, and special statuses (PwD, senior citizen, widow/single mother, kutcha house).
- **Instant Multi-Scheme Matching**: Real-time evaluation against 15+ central and state schemes:
  - *PM-KISAN Samman Nidhi* (₹6,000 / year DBT)
  - *Ayushman Bharat 70+ Universal Cover* (₹5,00,000 cashless health insurance)
  - *PM Surya Ghar* (Up to ₹78,000 rooftop solar subsidy)
  - *PM Awas Yojana Gramin* (₹1.20L - ₹1.30L housing grant)
  - *Sukanya Samriddhi Yojana* (8.2% tax-free girl child savings)
  - *e-Shram Social Security* (₹2,00,000 accident cover & universal ID)
  - *MGNREGA* (100 days statutory wage employment guarantee)
  - *PM Vishwakarma* (₹15,000 toolkits + 5% subsidized credit for artisans)
  - *PM Ujjwala 2.0* (Free gas connection & stove)
  - *Free Legal Aid NALSA* (100% free lawyer and court expenses)
  - *Atal Pension Yojana* (Guaranteed lifetime retirement pension)
  - *Post-Matric Scholarship* (100% tuition reimbursement for SC/ST/OBC/EWS)
- **Status Badges**: 🟢 Eligible, 🟡 Likely Eligible, 🔴 Ineligible (with clear reasons).

### 3. ⚖️ Citizen Rights & Legal Shield (Adhikar Kendra)
- Plain-language guides for everyday citizen rights:
  - **Police & Arrest Safeguards**: DK Basu guidelines, right to know grounds of arrest, mandatory arrest memo, ban on arresting women after sunset (6 PM to 6 AM) without magistrate order, 24-hour presentation before a magistrate.
  - **Tenant & Housing Protection**: Security deposit cap (max 2 months under Model Tenancy Act), protection against unlawful power/water disconnections, 30-day statutory eviction notice.
  - **Right to Information (RTI Act 2005)**: Mandatory 30-day response, 48-hour life & liberty rule, ₹10 fee (free for BPL cardholders).
  - **Consumer & Digital Rights**: Protection against dark patterns, refund refusal, and unilateral cancellation charges; filing on e-Daakhil without a lawyer.
  - **Women’s Legal Protection**: Right to reside in matrimonial home under Domestic Violence Act 2005, maintenance, 181 emergency helpline.
  - **Fair Wages & Gig Workers**: Minimum wages floor, double overtime pay, equal pay for equal work.
- **Interactive RTI Application Builder**: Generates a legally valid RTI application ready to copy, print, or download as a PDF!

### 4. 🎙️ Voice Assistant ("Bolti Sahayata")
- **Speech-to-Text (STT)**: Tap the microphone to ask questions in your natural regional tongue.
- **Speech Synthesis (TTS)**: Listens and answers by voice with natural pacing and pronunciation.
- **12 Supported Languages**:
  - English (`en-IN`)
  - Hindi (`hi-IN`) — हिन्दी
  - Tamil (`ta-IN`) — தமிழ்
  - Telugu (`te-IN`) — తెలుగు
  - Bengali (`bn-IN`) — বাংলা
  - Marathi (`mr-IN`) — मराठी
  - Gujarati (`gu-IN`) — ગુજરાતી
  - Kannada (`kn-IN`) — ಕನ್ನಡ
  - Malayalam (`ml-IN`) — മലയാളം
  - Punjabi (`pa-IN`) — ਪੰਜਾਬੀ
  - Odia (`or-IN`) — ଓଡ଼ିଆ
  - Urdu (`ur-IN`) — اردو
- **Quick Voice Prompts**: Instant chips for common questions on police rights, tenant issues, senior citizen health insurance, and welfare grants.

### 5. ♿ Accessibility Suite
- **Elderly-Friendly Text Scaling**: One-click toggles for Standard (A), Large (A+), and Extra Large (A++) fonts.
- **High Contrast Mode**: Instant high-contrast black-and-amber theme for visually impaired users.
- **Audio-First Controls**: Prominent "Read Aloud" buttons on every notice, scheme, and legal guide.
- **Printable Citizen Dossier**: Clean export view for taking printed document checklists and entitlement guides to government offices.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4
- **Icons**: Lucide React
- **Voice / Speech**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) with regional language fallback
- **AI Processing**: Built-in Neural & Heuristic Rule Engine + Optional Google Gemini API integration (configurable in Settings)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+) & npm

### 2. Run the Development Server
```bash
# Navigate to the project directory
cd C:\Users\HP\.gemini\antigravity\scratch\multilingual-policy-explainer

# Start the Vite development server
npm run dev
```

Open your browser at `http://localhost:5173` to start using JanSeva AI.

### 3. Production Build
```bash
npm run build
```
The optimized production bundle will be created in the `dist/` directory.

---

## 🔑 Optional Gemini API Integration
JanSeva AI works completely out-of-the-box with a comprehensive built-in knowledge base and heuristic parser. If you want live, multi-turn LLM reasoning on arbitrary custom notices:
1. Click the ⚙️ **Settings** icon in the header.
2. Enter your free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3. The key is stored strictly inside your browser's `localStorage` and never uploaded anywhere.
