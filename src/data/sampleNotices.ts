import { NoticeAnalysis } from '../types';

export const SAMPLE_NOTICES: NoticeAnalysis[] = [
  {
    id: 'notice-pm-surya-ghar',
    title: 'Gazette Notification: PM Surya Ghar Muft Bijli Scheme Operational Guidelines',
    authority: 'Ministry of New and Renewable Energy (MNRE), Govt. of India',
    date: '2026-02-15',
    rawText: `THE GAZETTE OF INDIA: EXTRAORDINARY [PART I—SEC. 1]
MINISTRY OF NEW AND RENEWABLE ENERGY
NOTIFICATION
New Delhi, the 15th February, 2026

No. 32/2026/Rooftop-Solar.—In supersession of previous notifications and in furtherance of the National Green Hydrogen & Clean Energy Mission, the Central Government hereby promulgates the Operational Guidelines for the implementation of the "PM Surya Ghar: Muft Bijli Yojana" for residential households across all States and Union Territories.

1. Applicability & Financial Influx:
(a) Central Financial Assistance (CFA) shall be admissible strictly for individual residential grid-connected rooftop solar photovoltaic (RTS) systems commissioned via the National Portal.
(b) Subsidy quantum is restructured as follows:
    (i) For benchmark capacity of 1 kW: ₹30,000/- (Rupees Thirty Thousand only).
    (ii) For additional capacity between 1 kW and 2 kW: @ ₹30,000/- per kW.
    (iii) For systems above 2 kW up to 3 kW: Additional CFA @ ₹18,000/- per kW, aggregating to a ceiling subsidy of ₹78,000/-.
    (iv) Systems exceeding 3 kW capacity shall receive CFA capped at the 3 kW threshold, viz. ₹78,000/-.

2. Mandatory Technical & Commercial Provisos:
(a) The domestic content requirement (DCR) shall strictly apply. Solar modules must be ALMM (Approved List of Models and Manufacturers) compliant.
(b) Beneficiary must possess an active domestic low-tension (LT) electricity connection in their own name or produce an irrevocable leasehold consent from the lawful owner.
(c) The installation must be executed exclusively through DISCOM-empaneled vendors registered on the National Portal. Unregistered bilateral contracts shall stand summarily disqualified from subsidy disbursement.
(d) Disbursement of subsidy shall be directly credited via PFMS/DBT mechanism into the Aadhaar-seeded bank account of the registered consumer within thirty (30) days following joint inspection and net-meter commissioning by the concerned distribution licensee.`,
    summary: 'The government will pay you a direct subsidy of up to ₹78,000 into your bank account to install solar panels on your roof, allowing you to generate up to 300 units of free electricity every month.',
    whoIsAffected: 'Any homeowner or long-term tenant in India who pays a regular residential electricity bill.',
    keyBenefits: [
      'Up to ₹78,000 direct bank cash subsidy from the central government.',
      'Up to 300 free units of electricity every month (saves ₹15,000 to ₹30,000 every year).',
      'Surplus electricity generated during the day can be fed back into the grid to lower your monthly bill.'
    ],
    criticalConditions: [
      'Must have an active domestic electricity connection in your name.',
      'Solar panels MUST be made in India (DCR certified) and installed by a registered DISCOM vendor from the official portal.',
      'DIY or unregistered local electrician installations will NOT receive any government subsidy.'
    ],
    documentsNeeded: [
      'Latest Electricity Bill (with Consumer Account Number)',
      'Aadhaar Card of the electricity bill holder',
      'Cancelled Cheque or Bank Passbook (Aadhaar linked for DBT)',
      'Proof of roof possession (property tax receipt or tenancy agreement)'
    ],
    actionSteps: [
      '1. Open pmsuryaghar.gov.in and register using your state, electricity provider (DISCOM), and Consumer Account Number.',
      '2. Submit an online application for solar roof approval.',
      '3. Pick an approved vendor from the portal list to install the panels.',
      '4. Electricity board (DISCOM) installs a net meter to measure power flow.',
      '5. Subsidy of up to ₹78,000 is transferred directly into your bank account within 30 days.'
    ],
    deadlines: [
      'Rolling scheme active through 2026-2027.',
      'Subsidy guaranteed within 30 days of net-meter commissioning.'
    ],
    jargonList: [
      {
        term: 'Central Financial Assistance (CFA)',
        explanation: 'Direct cash subsidy paid by the central government into your bank account.',
        simpleAnalogy: 'A discount where the government pays part of the bill directly for you.'
      },
      {
        term: 'Domestic Content Requirement (DCR)',
        explanation: 'Rules mandating that the solar panels and cells must be manufactured in India.',
        simpleAnalogy: 'Made in India guarantee.'
      },
      {
        term: 'Net-Meter Commissioning',
        explanation: 'A special two-way electricity meter that spins forward when you use power and backward when your solar panels send power back to the grid.',
        simpleAnalogy: 'A two-way cash register for electricity.'
      },
      {
        term: 'In Supersession of',
        explanation: 'Replaces and cancels all older rules that were issued before this date.',
        simpleAnalogy: 'New updated rules.'
      }
    ],
    scamAlert: 'DO NOT pay any local agent or middleman full cash upfront. Only select vendors registered on pmsuryaghar.gov.in. Registration on the government website is completely free.',
    officialLinks: [
      { name: 'PM Surya Ghar Official Portal', url: 'https://pmsuryaghar.gov.in', phone: '15555' },
      { name: 'Ministry of New & Renewable Energy', url: 'https://mnre.gov.in', phone: '1800-180-3333' }
    ],
    simplifiedTranslations: {
      hi: {
        title: 'पीएम सूर्य घर मुफ्त बिजली योजना सरकारी अधिसूचना',
        summary: 'सरकार आपके घर की छत पर सोलर पैनल लगाने के लिए ₹78,000 तक की सीधी बैंक सब्सिडी दे रही है, जिससे हर महीने 300 यूनिट तक बिजली मुफ्त मिलेगी।',
        keyBenefits: [
          '₹78,000 तक की सीधी सरकारी सब्सिडी बैंक खाते में।',
          'हर महीने 300 यूनिट तक मुफ्त बिजली (सालाना ₹15,000+ की बचत)।',
          'अतिरिक्त बिजली ग्रिड को बेचकर बिजली बिल शून्य करने की सुविधा।'
        ],
        actionSteps: [
          '1. pmsuryaghar.gov.in पर बिजली बिल के उपभोक्ता नंबर से पंजीकरण करें।',
          '2. पोर्टल पर सूचीबद्ध पंजीकृत सोलर वेंडर चुनें।',
          '3. नेट मीटर लगने के 30 दिनों के भीतर सब्सिडी सीधे बैंक खाते में आएगी।'
        ],
        scamAlert: 'दलालों को अग्रिम नकद न दें। केवल सरकारी पोर्टल पर पंजीकृत वेंडरों से ही सोलर लगवाएं।'
      }
    }
  },
  {
    id: 'notice-ayushman-70plus',
    title: 'Public Circular: Universal Health Coverage for All Citizens Aged 70 and Above',
    authority: 'National Health Authority (NHA), Ministry of Health & Family Welfare',
    date: '2026-01-10',
    rawText: `NATIONAL HEALTH AUTHORITY
GOVERNMENT OF INDIA
CIRCULAR NO: NHA/AB-PMJAY/SENIOR-70/2026/01

Subject: Operational Guidelines for Expansion of Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY) to All Senior Citizens Aged 70 Years and Above.

In pursuance of the Union Cabinet decision dated 11th September 2024 and Gazette notification subsequent thereto, the National Health Authority hereby notifies the operational protocols governing the universal health coverage for all elderly persons who have attained seventy (70) completed years of age, without distinction based on socioeconomic status, income criteria, or familial landholding.

Key Directives:
1. Eligibility Criterion: Every citizen aged 70 years and above, verified through Aadhaar authenticated biometric or OTP protocols, shall be entitled to an independent health top-up or fresh universal cover of ₹5,00,000/- (Rupees Five Lakhs only) annually on a family floater basis.
2. Distinct Card Issuance: Beneficiaries shall be issued an exclusive "Ayushman Vaya Vandana Card".
3. Treatment of Pre-existing Schemes:
   (i) Seniors already covered under private commercial health insurance or employees state insurance schemes (ESIS) remain eligible to avail this distinct top-up.
   (ii) Seniors covered under CGHS/ECHS/CAPF may elect to exercise a one-time irrevocable option between continuing their existing healthcare framework or transitioning to AB-PMJAY.
4. Pre-existing Morbidities: There shall be zero moratorium or waiting period for pre-existing medical conditions; coverage commences immediately upon card generation.
5. Embezzlement Prohibition: Empaneled Health Care Providers (EHCPs) are strictly cautioned against demanding out-of-pocket deposits, consumables fees, or registration surcharges. Violations shall incur immediate de-empanelment and penal prosecution under relevant statutes.`,
    summary: 'Every single Indian citizen aged 70 or older now gets ₹5 Lakhs worth of 100% free hospital treatment every year, no matter how rich or poor they are, with no waiting period for illnesses they already have.',
    whoIsAffected: 'All citizens of India who have reached 70 years of age, and their families.',
    keyBenefits: [
      '₹5 Lakhs free hospital treatment every year in 29,000+ government and private empaneled hospitals.',
      'Covers pre-existing diseases like heart conditions, diabetes, arthritis, eye surgery, cancer from day one.',
      'No income limit: Whether you are poor, middle class, or wealthy, you are 100% eligible if age is 70+.'
    ],
    criticalConditions: [
      'Age must be 70 or above as per your Aadhaar card.',
      'Beneficiaries under CGHS or defense ex-servicemen (ECHS) can choose between their existing scheme or Ayushman Bharat.',
      'Hospitals CANNOT ask you to pay any registration fee or advance money.'
    ],
    documentsNeeded: [
      'Aadhaar Card (with accurate Date of Birth)',
      'Mobile Phone linked with Aadhaar for OTP verification'
    ],
    actionSteps: [
      '1. Open beneficiary.nha.gov.in or download the "Ayushman App" on any smartphone.',
      '2. Select "Senior 70+ Enrollment" and enter the 70+ senior citizen’s Aadhaar number.',
      '3. Complete the OTP or face verification.',
      '4. Download the "Ayushman Vaya Vandana Card" immediately on your phone.',
      '5. Show this card at any empaneled hospital for free cashless treatment.'
    ],
    deadlines: [
      'Scheme is permanently open with immediate validity upon registration.'
    ],
    jargonList: [
      {
        term: 'Family Floater Basis',
        explanation: 'The ₹5 Lakh coverage can be used by the senior citizen, or shared between senior spouses.',
        simpleAnalogy: 'A shared wallet for medical bills.'
      },
      {
        term: 'Empaneled Health Care Providers (EHCPs)',
        explanation: 'Hospitals that have signed an agreement with the government to provide free treatment under Ayushman Bharat.',
        simpleAnalogy: 'Government-approved network hospitals.'
      },
      {
        term: 'Out-of-Pocket Deposits',
        explanation: 'Cash that hospitals ask patients to pay before admitting them.',
        simpleAnalogy: 'Illegal advance payment.'
      },
      {
        term: 'Pre-existing Morbidities',
        explanation: 'Diseases or health issues you already had before applying for the card.',
        simpleAnalogy: 'Old health conditions.'
      }
    ],
    scamAlert: 'Creating and downloading the Ayushman Vaya Vandana Card is 100% FREE. Never pay anyone on WhatsApp or Telegram who claims they will make the card for a fee.',
    officialLinks: [
      { name: 'NHA Beneficiary Portal', url: 'https://beneficiary.nha.gov.in', phone: '14555' },
      { name: 'Ayushman Bharat Toll Free', url: 'https://pmjay.gov.in', phone: '1800-111-565' }
    ],
    simplifiedTranslations: {
      hi: {
        title: '70 वर्ष से अधिक उम्र के सभी नागरिकों के लिए मुफ्त स्वास्थ्य बीमा परिपत्र',
        summary: '70 वर्ष या उससे अधिक आयु के प्रत्येक बुजुर्ग को सालाना ₹5 लाख तक का मुफ़्त अस्पताल इलाज मिलेगा। इसमें आय की कोई सीमा नहीं है।',
        keyBenefits: [
          'सालाना ₹5 लाख का कैशलेस अस्पताल इलाज।',
          'पहले से मौजूद पुरानी बीमारियों (डायबिटीज, बीपी, मोतियाबिंद आदि) का भी पहले दिन से मुफ़्त इलाज।',
          'अमीर या गरीब, 70 वर्ष से ऊपर का हर नागरिक पात्र।'
        ],
        actionSteps: [
          '1. beneficiary.nha.gov.in या आयुष्मान ऐप खोलें।',
          '2. 70+ वरिष्ठ नागरिक का आधार नंबर दर्ज करें।',
          '3. मोबाइल पर आए ओटीपी से सत्यापन कर तुरंत "आयुष्मान वय वंदना कार्ड" डाउनलोड करें।'
        ],
        scamAlert: 'यह कार्ड पूरी तरह निःशुल्क है। किसी एजेंट को पैसे न दें।'
      }
    }
  },
  {
    id: 'notice-consumer-dark-patterns',
    title: 'Advisory on E-Commerce Hidden Cancellation Fees & Coercive Add-ons',
    authority: 'Central Consumer Protection Authority (CCPA), Ministry of Consumer Affairs',
    date: '2026-03-01',
    rawText: `CENTRAL CONSUMER PROTECTION AUTHORITY
NOTIFICATION NO. CCPA/E-COMM/2026/04
New Delhi, the 1st March, 2026

SUBJECT: REGULATION AGAINST DECEPTIVE INTERFACES (DARK PATTERNS), UNILATERAL CANCELLATION PENALTIES, AND COERCED ANCILLARY PURCHASE BUNDLING.

WHEREAS it has been observed that numerous digital marketplace entities, travel aggregators, and quick-commerce operators have been engaging in deceptive design architectures, specifically:
1. Basket Sneaking & Coerced Opt-ins: Pre-ticking checkboxes for donations, insurance premiums, expedited handling charges, or convenience fees without affirmative, unambiguous consent from the consumer.
2. Unilateral Asymmetric Cancellation Charges: Imposing penal cancellation charges of up to 100% on the consumer for order retraction, whereas the platform reserves unilateral rights to cancel transactions due to logistical convenience without paying reciprocal liquidated damages.
3. False Urgency & Scarcity Fabrications: Displaying deceptive count-down timers and fake inventory counters (e.g., "Only 1 item left in stock, 14 other users viewing").

THE AUTHORITY HEREBY ORDERS:
(a) Immediate excision of all pre-selected purchase add-ons. Every surcharge must mandate an opt-in checkbox rather than opt-out.
(b) Cancellation charges levied on consumers shall under no circumstances exceed the actual administrative expenditure incurred, capped at a ceiling of 10% of total transactional consideration.
(c) Consumers aggrieved by contraventions may lodge immediate summary complaints via the National Consumer Helpline (NCH) or e-Daakhil without recourse to legal representation.`,
    summary: 'Shopping and travel apps can no longer secretly add extra charges, fake countdown timers, or charge high cancellation fees. If a company cancels on you or refuses your legitimate refund, you have the right to get 100% money back and file a complaint for free without a lawyer.',
    whoIsAffected: 'All consumers who buy goods, flight/train tickets, or food online in India.',
    keyBenefits: [
      'Websites can never automatically tick boxes to add insurance, tips, or donation fees to your cart without your active click.',
      'Cancellation fees are capped at a maximum of 10% of order value.',
      'You can file a formal complaint from your mobile on e-Daakhil or call 1915 to get your money back within 30 days.'
    ],
    criticalConditions: [
      'Take a screenshot of the order invoice showing hidden add-on fees or unfair cancellation penalties.',
      'Save customer care chats and emails refusing refund.'
    ],
    documentsNeeded: [
      'Order Invoice / Booking Receipt',
      'Bank / UPI transaction SMS showing money debited',
      'Screenshots of rejection message or misleading charges'
    ],
    actionSteps: [
      '1. Call National Consumer Helpline at 1915 or WhatsApp to 8800001915.',
      '2. Mention your order ID and the illegal charge or denied refund.',
      '3. If the merchant fails to resolve in 15 days, lodge an online case at edaakhil.nic.in for compensation.'
    ],
    deadlines: [
      'File consumer complaints within 2 years of the transaction date.'
    ],
    jargonList: [
      {
        term: 'Basket Sneaking',
        explanation: 'When an app secretly adds extra paid items or fees to your shopping cart without you clicking them.',
        simpleAnalogy: 'A shopkeeper sneaking an extra item into your bag and charging you for it.'
      },
      {
        term: 'Dark Patterns',
        explanation: 'Tricky or deceptive website designs built to trick you into spending more money or making unintentional purchases.',
        simpleAnalogy: 'Tricks in website design.'
      },
      {
        term: 'Liquidated Damages',
        explanation: 'Pre-agreed financial compensation paid when one party cancels or breaks an agreement.',
        simpleAnalogy: 'Penalty payment.'
      }
    ],
    scamAlert: 'Beware of fake customer care numbers found on Google search. Always contact companies only through their official app or dial the National Consumer Helpline at 1915.',
    officialLinks: [
      { name: 'National Consumer Helpline', url: 'https://consumerhelpline.gov.in', phone: '1915' },
      { name: 'e-Daakhil Consumer Court Portal', url: 'https://edaakhil.nic.in' }
    ],
    simplifiedTranslations: {
      hi: {
        title: 'ई-कॉमर्स धोखाधड़ी और अनुचित कैंसिलेशन शुल्क पर सरकारी आदेश',
        summary: 'शॉपिंग और ट्रैवल ऐप्स अब चुपके से कोई अतिरिक्त शुल्क (जैसे जबरन बीमा या सुविधा शुल्क) नहीं जोड़ सकते और न ही भारी कैंसिलेशन फीस वसूल सकते हैं।',
        keyBenefits: [
          'कोई भी ऐप आपकी मर्जी के बिना कार्ट में अतिरिक्त शुल्क नहीं जोड़ सकता।',
          'कैंसिलेशन फीस अधिकतम 10% से ज्यादा नहीं हो सकती।',
          'रिफंड न मिलने पर राष्ट्रीय उपभोक्ता हेल्पलाइन 1915 पर कॉल करके पैसा वापस पाएं।'
        ],
        actionSteps: [
          '1. बिल या चैट का स्क्रीनशॉट लें।',
          '2. हेल्पलाइन 1915 पर शिकायत दर्ज कराएं या व्हाट्सएप (8800001915) करें।',
          '3. 15 दिन में समाधान न होने पर edaakhil.nic.in पर बिना वकील मुफ़्त केस करें।'
        ],
        scamAlert: 'गूगल से कस्टमर केयर नंबर न खोजें, केवल 1915 पर कॉल करें।'
      }
    }
  }
];
