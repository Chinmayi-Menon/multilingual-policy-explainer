import { Scheme } from '../types';

export const SCHEMES_DATABASE: Scheme[] = [
  {
    id: 'pm-kisan',
    title: 'PM-KISAN Samman Nidhi',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Agriculture',
    shortDesc: 'Direct income support of ₹6,000 per year in 3 equal installments to small and landholding farmer families.',
    benefitsSummary: '₹6,000 annually deposited directly into bank account via DBT in three four-monthly installments of ₹2,000 each.',
    benefitAmount: '₹6,000 / year (Direct Bank Transfer)',
    officialPortal: 'https://pmkisan.gov.in',
    helpline: '155261 / 1800-115-526',
    scamWarning: 'Beware of fake SMS or agents asking for OTP or ₹500 fee for e-KYC. PM-KISAN registration is 100% free on the official portal or ₹15 at CSCs.',
    requiredDocuments: [
      'Aadhaar Card linked with Active Mobile Number',
      'Land Ownership Record (Khata / Khasra / RoR document)',
      'Bank Account details (DBT / NPCI enabled with Aadhaar)',
      'Citizenship / Domicile proof'
    ],
    applicationSteps: [
      'Visit pmkisan.gov.in and click on "New Farmer Registration"',
      'Enter your Aadhaar number, state, and rural/urban classification',
      'Fill in land parcel details (survey number, area, ownership share)',
      'Complete biometric or OTP-based e-KYC authentication',
      'Track status anytime using "Know Your Status" with Aadhaar'
    ],
    criteria: {
      minAge: 18,
      allowedOccupations: ['farmer'],
      maxLand: ['marginal', 'small', 'large'],
      maxIncomeRange: '5L_8L'
    },
    translations: {
      hi: {
        title: 'पीएम किसान सम्मान निधि',
        shortDesc: 'भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आर्थिक सहायता।',
        benefitsSummary: 'प्रति वर्ष ₹6,000 तीन किश्तों (प्रत्येक ₹2,000) में सीधे आपके बैंक खाते में।',
        benefitAmount: '₹6,000 प्रति वर्ष (सीधे बैंक खाते में)',
        howToApply: 'pmkisan.gov.in पर जाएं या नजदीकी CSC केंद्र पर आधार कार्ड और खतौनी के साथ आवेदन करें।',
        scamWarning: 'सावधान: किसी दलाल को पैसा न दें। पीएम-किसान पर पंजीकरण निःशुल्क है।'
      },
      ta: {
        title: 'பிரதமர் கிசான் சம்மான் நிதி (PM-KISAN)',
        shortDesc: 'விவசாய குடும்பங்களுக்கு ஆண்டுக்கு ₹6,000 நேரடி வங்கி நிதி உதவி.',
        benefitsSummary: 'ஆண்டுதோறும் ₹6,000 (மூன்று தவணைகளில் ₹2,000 வீதம்) நேரடியாக வங்கிக் கணக்கில் வரும்.',
        benefitAmount: '₹6,000 / ஆண்டு (நேரடி பணப்பரிமாற்றம்)',
        howToApply: 'pmkisan.gov.in தளத்தில் புதிய விவசாயி பதிவில் ஆதார் மற்றும் பட்டா விவரங்களை சமர்ப்பிக்கவும்.',
        scamWarning: 'எச்சரிக்கை: பதிவுக்கு எவருக்கும் கட்டணம் செலுத்த வேண்டாம்.'
      },
      te: {
        title: 'పీఎం కిసాన్ సమ్మాన్ నిధి (PM-KISAN)',
        shortDesc: 'రైతు కుటుంబాలకు సంవత్సరానికి ₹6,000 ప్రత్యక్ష ఆర్థిక సాయం.',
        benefitsSummary: 'ఏడాదికి ₹6,000 చొప్పున మూడు విడతల్లో నేరుగా బ్యాంక్ ఖాతాలో జమ.',
        benefitAmount: '₹6,000 / ఏడాది (DBT ద్వారా)',
        howToApply: 'pmkisan.gov.in లో మీ ఆధార్ మరియు పట్టాదారు పాస్ పుస్తకం వివరాలతో దరఖాస్తు చేసుకోండి.',
        scamWarning: 'హెచ్చరిక: రిజిస్ట్రేషన్ కోసం ఎవరికీ డబ్బులు ఇవ్వకండి, ఇది ఉచితం.'
      },
      bn: {
        title: 'পিএম কিষাণ সম্মান নিধি (PM-KISAN)',
        shortDesc: 'কৃষক পরিবারগুলিকে বছরে ₹৬,০০০ টাকার আর্থিক সাহায্য।',
        benefitsSummary: 'প্রতি বছর ₹৬,০০০ টাকা তিনটি কিস্তিতে সরাসরি ব্যাংক অ্যাকাউন্টে জমা হয়।',
        benefitAmount: '₹৬,০০০ / বছর',
        howToApply: 'pmkisan.gov.in-এ গিয়ে নতুন কৃষক নিবন্ধনে আধার ও জমির নথি দিয়ে আবেদন করুন।',
        scamWarning: 'দালালদের থেকে দূরে থাকুন, আবেদন সম্পূর্ণ বিনামূল্যে।'
      },
      mr: {
        title: 'पीएम किसान सन्मान निधी',
        shortDesc: 'शेतकरी कुटुंबांना वर्षाला ₹६,००० ची थेट आर्थिक मदत.',
        benefitsSummary: 'वर्षाला ₹६,००० तीन हप्त्यांमध्ये थेट बँक खात्यात जमा.',
        benefitAmount: '₹६,००० / वर्ष',
        howToApply: 'pmkisan.gov.in पोर्टलवर जाऊन आधार व ७/१२ उताऱ्यासह अर्ज करा.',
        scamWarning: 'सावध राहा: कोणत्याही मध्यस्थाला पैसे देऊ नका.'
      }
    }
  },
  {
    id: 'ayushman-bharat-70plus',
    title: 'Ayushman Bharat PM-JAY (Senior Citizens 70+ Universal Cover)',
    ministry: 'Ministry of Health and Family Welfare / NHA',
    category: 'Healthcare',
    shortDesc: 'Free cashless health insurance cover up to ₹5,00,000 per year for EVERY senior citizen aged 70 and above, regardless of income.',
    benefitsSummary: 'Cashless hospital treatment up to ₹5 Lakhs per family per year in over 29,000 empaneled hospitals across India. Covers pre-existing conditions from Day 1.',
    benefitAmount: '₹5,00,000 / year (Cashless Health Cover)',
    officialPortal: 'https://beneficiary.nha.gov.in',
    helpline: '14555',
    scamWarning: 'Ayushman Vaya Vandana Card (for 70+) does NOT charge any fee. Beware of fake download links sent on WhatsApp requesting bank details.',
    requiredDocuments: [
      'Aadhaar Card with correct Date of Birth showing age 70 or above',
      'Aadhaar-linked active mobile number for e-KYC',
      'Ration Card / Family ID (optional, for existing PMJAY families)'
    ],
    applicationSteps: [
      'Download Ayushman App or visit beneficiary.nha.gov.in',
      'Login as "Beneficiary" with mobile OTP',
      'Select "Senior 70+ Registration" and enter Aadhaar number',
      'Complete face-auth or Aadhaar OTP verification',
      'Download instant "Ayushman Vaya Vandana Card" with unique AB-PMJAY ID'
    ],
    criteria: {
      minAge: 70
    },
    translations: {
      hi: {
        title: 'आयुष्मान भारत 70+ वरिष्ठ नागरिक योजना',
        shortDesc: '70 वर्ष या उससे अधिक आयु के प्रत्येक वरिष्ठ नागरिक के लिए ₹5 लाख तक का मुफ़्त स्वास्थ्य बीमा, चाहे आय कितनी भी हो।',
        benefitsSummary: 'सालाना ₹5 लाख तक का कैशलेस इलाज देश के 29,000 से अधिक सरकारी और प्राइवेट अस्पतालों में।',
        benefitAmount: '₹5,00,000 प्रति वर्ष (मुफ़्त कैशलेस इलाज)',
        howToApply: 'beneficiary.nha.gov.in पोर्टल या आयुष्मान ऐप से आधार ई-केवाईसी करके तुरंत कार्ड डाउनलोड करें।',
        scamWarning: 'यह कार्ड पूरी तरह मुफ़्त है। व्हाट्सएप पर आने वाले फर्जी लिंक पर कभी बैंक विवरण न दें।'
      },
      ta: {
        title: 'ஆயுஷ்மான் பாரத் 70+ மூத்த குடிமக்கள் திட்டம்',
        shortDesc: '70 வயதுக்கு மேற்பட்ட அனைத்து மூத்த குடிமக்களுக்கும் ஆண்டுக்கு ₹5 லட்சம் வரை இலவச மருத்துவ சிகிச்சை.',
        benefitsSummary: 'ஆண்டுக்கு ₹5 லட்சம் வரை கட்டணமில்லா மருத்துவமனை சிகிச்சை. வருமான வரம்பு இல்லை.',
        benefitAmount: '₹5,00,000 / ஆண்டு (இலவச சிகிச்சை)',
        howToApply: 'beneficiary.nha.gov.in இணையதளத்தில் ஆதார் OTP மூலம் உடனடி அட்டை பெறலாம்.',
        scamWarning: 'அட்டை பெறுவதற்கு பணம் வசூலிக்கும் நபர்களிடம் எச்சரிக்கையாக இருங்கள்.'
      },
      te: {
        title: 'ఆయుష్మాన్ భారత్ 70+ వయోవృద్ధుల పథకం',
        shortDesc: '70 ఏళ్లు పైబడిన ప్రతి వృద్ధుడికి ఉచితంగా ₹5 లక్షల వరకు నగదు రహిత ఆరోగ్య బీమా.',
        benefitsSummary: 'ఆదాయ పరిమితి లేకుండా ఉచితంగా ఏటా ₹5 లక్షల వరకు ఆసుపత్రి చికిత్స.',
        benefitAmount: '₹5,00,000 / ఏడాది',
        howToApply: 'beneficiary.nha.gov.in లేదా ఆయుష్మాన్ యాప్ ద్వారా ఆధార్‌తో నమోదు చేసుకోండి.',
        scamWarning: 'ఈ పథకం పూర్తిగా ఉచితం. నకిలీ లింకులను నమ్మవద్దు.'
      }
    }
  },
  {
    id: 'pm-surya-ghar',
    title: 'PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar)',
    ministry: 'Ministry of New and Renewable Energy',
    category: 'Energy & Utilities',
    shortDesc: 'Up to 300 units of free electricity every month with a direct government subsidy up to ₹78,000 for installing rooftop solar panels.',
    benefitsSummary: 'Direct subsidy: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW and above systems. Save ₹15,000+ per year on electricity bills.',
    benefitAmount: 'Up to ₹78,000 Direct Subsidy + 300 Free Units/Month',
    officialPortal: 'https://pmsuryaghar.gov.in',
    helpline: '15555',
    scamWarning: 'Only install panels via registered DISCOM vendors listed on pmsuryaghar.gov.in. Never pay full advance without verifying vendor credential on portal.',
    requiredDocuments: [
      'Latest Electricity Bill (Consumer Account Number)',
      'Electricity Connection Address Proof',
      'Aadhaar Card of Electricity Account Holder',
      'Cancelled Cheque / Bank Passbook for direct subsidy transfer',
      'Roof ownership / tenancy agreement'
    ],
    applicationSteps: [
      'Register on pmsuryaghar.gov.in with Electricity Consumer Account Number & Mobile',
      'Apply for rooftop solar installation & submit DISCOM feasibility request',
      'Select registered vendor from portal to install solar equipment',
      'DISCOM inspects and installs net meter',
      'Subsidy credited to your bank account within 30 days of net-meter commissioning'
    ],
    criteria: {
      minAge: 18,
      requiresNoPuccaHouse: false
    },
    translations: {
      hi: {
        title: 'पीएम सूर्य घर: मुफ्त बिजली योजना',
        shortDesc: 'छत पर सोलर पैनल लगाने पर ₹78,000 तक की सरकारी सब्सिडी और हर महीने 300 यूनिट तक मुफ्त बिजली।',
        benefitsSummary: '1 किलोवाट पर ₹30,000, 2 किलोवाट पर ₹60,000, और 3 किलोवाट पर ₹78,000 की सीधी बैंक सब्सिडी।',
        benefitAmount: '₹78,000 तक सब्सिडी + 300 यूनिट मुफ़्त बिजली',
        howToApply: 'pmsuryaghar.gov.in पर बिजली बिल के उपभोक्ता नंबर के साथ आवेदन करें।',
        scamWarning: 'केवल पोर्टल पर सूचीबद्ध पंजीकृत वेंडरों से ही सोलर लगवाएं। पूरा अग्रिम भुगतान न करें।'
      }
    }
  },
  {
    id: 'pm-awas-gramin',
    title: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
    ministry: 'Ministry of Rural Development',
    category: 'Housing',
    shortDesc: 'Financial assistance of ₹1.20 Lakh to ₹1.30 Lakh to homeless and families living in kutcha/dilapidated houses in rural areas.',
    benefitsSummary: 'Direct grant of ₹1,20,000 (plain areas) or ₹1,30,000 (hilly/difficult areas) in instalments + 90 days MGNREGA wages (approx ₹20,000) + ₹12,000 for toilet construction.',
    benefitAmount: '₹1,20,000 to ₹1,30,000 + Labor & Toilet Support',
    officialPortal: 'https://pmayg.nic.in',
    helpline: '1800-11-6446',
    scamWarning: 'PMAY-G selection is based on SECC 2011/Awaas+ verified survey. Gram Pradhan or agents have no authority to charge money for adding names.',
    requiredDocuments: [
      'Aadhaar Card of all adult family members',
      'Bank Account details (DBT linked)',
      'MGNREGA Job Card (if held)',
      'Affidavit of not owning a pucca house in India',
      'Photograph of applicant in front of existing kutcha house'
    ],
    applicationSteps: [
      'Check name in Gram Panchayat Awaas+ priority list',
      'If not listed, approach Gram Rozgar Sevak or Panchayat Secretary with kutcha house geotagged photo',
      'Geo-tagging verification by block officer at construction stages',
      'Grant disbursed in 3 direct installments linked to foundation, lintel, and roof completion'
    ],
    criteria: {
      minAge: 18,
      requiresNoPuccaHouse: true,
      maxIncomeRange: '1L_2.5L'
    },
    translations: {
      hi: {
        title: 'प्रधानमंत्री आवास योजना - ग्रामीण (PMAY-G)',
        shortDesc: 'ग्रामीण क्षेत्रों में कच्चे मकानों में रहने वाले या बेघर परिवारों को पक्का मकान बनाने के लिए ₹1.20 लाख से ₹1.30 लाख की सहायता।',
        benefitsSummary: '₹1,20,000 (मैदानी क्षेत्र) या ₹1,30,000 (पहाड़ी क्षेत्र) सीधे बैंक खाते में + 90 दिन की मनरेगा मजदूरी + ₹12,000 शौचालय सहायता।',
        benefitAmount: '₹1,20,000 - ₹1,30,000 सहायता',
        howToApply: 'ग्राम पंचायत सचिव या ब्लॉक कार्यालय से संपर्क करें और आवास+ सूची में नाम जांचें।',
        scamWarning: 'सावधान: किसी बिचौलिए को रिश्वत न दें। चयन सरकारी सर्वे के आधार पर होता है।'
      }
    }
  },
  {
    id: 'sukanya-samriddhi',
    title: 'Sukanya Samriddhi Yojana (SSY)',
    ministry: 'Ministry of Finance / Dept of Posts',
    category: 'Women & Child',
    shortDesc: 'High-interest tax-free government savings scheme for girl children with 8.2% annual interest and full maturity at age 21.',
    benefitsSummary: 'Government-guaranteed 8.2% annual compounding interest. Minimum deposit ₹250/year up to ₹1.5 Lakhs. 100% tax-free interest and maturity under Section 80C.',
    benefitAmount: '8.2% Guaranteed Tax-Free Compound Interest',
    officialPortal: 'https://indiapost.gov.in',
    helpline: '1800-266-6868',
    scamWarning: 'SSY accounts can ONLY be opened at official Post Offices or authorized commercial banks (SBI, PNB, etc.). Never use third-party apps.',
    requiredDocuments: [
      'Birth Certificate of Girl Child (mandatory)',
      'Aadhaar / ID Proof of Parent / Legal Guardian',
      'Address Proof of Guardian (Voter ID / Utility Bill)',
      'Passport size photos of child and guardian'
    ],
    applicationSteps: [
      'Collect Form 1 from any Post Office or public bank branch',
      'Fill child and guardian details, attach birth certificate & Aadhaar',
      'Submit initial deposit (minimum ₹250) in cash or cheque',
      'Collect SSY Passbook with account number'
    ],
    criteria: {
      minAge: 0,
      maxAge: 10,
      genders: ['female']
    },
    translations: {
      hi: {
        title: 'सुकन्या समृद्धि योजना (SSY)',
        shortDesc: 'बेटियों के सुरक्षित भविष्य के लिए 8.2% ब्याज वाली सरकारी बचत योजना।',
        benefitsSummary: '8.2% वार्षिक चक्रवृद्धि ब्याज, ₹250 न्यूनतम वार्षिक जमा, धारा 80C के तहत पूरी तरह टैक्स-फ्री।',
        benefitAmount: '8.2% कर-मुक्त चक्रवृद्धि ब्याज',
        howToApply: 'नजदीकी डाकघर या सरकारी बैंक में बेटी के जन्म प्रमाण पत्र और आधार के साथ खाता खुलवाएं।',
        scamWarning: 'यह खाता केवल अधिकृत डाकघर या बैंक शाखा में ही खुलता है।'
      }
    }
  },
  {
    id: 'e-shram',
    title: 'e-Shram Card (Unorganized Workers Social Security)',
    ministry: 'Ministry of Labour & Employment',
    category: 'Labor & Employment',
    shortDesc: 'National database of unorganized and gig workers providing unique 12-digit UAN, ₹2 Lakh free accident insurance, and social security benefits.',
    benefitsSummary: 'Free accidental death/permanent disability cover of ₹2,00,000 (and ₹1,00,000 for partial disability) under PMSBY. Direct access to pension & welfare schemes.',
    benefitAmount: '₹2,00,000 Accidental Cover + Universal ID',
    officialPortal: 'https://eshram.gov.in',
    helpline: '14434',
    scamWarning: 'e-Shram registration is completely FREE on eshram.gov.in. No renewal fee or yearly maintenance charge exists.',
    requiredDocuments: [
      'Aadhaar Card linked with active mobile number',
      'Bank Account details (with IFSC)',
      'Occupation category self-declaration'
    ],
    applicationSteps: [
      'Visit eshram.gov.in and click "Register on e-Shram"',
      'Enter Aadhaar linked mobile and verify OTP',
      'Enter personal details, address, educational qualification, and occupation skill',
      'Enter bank account details for direct benefit transfers',
      'Download and print your 12-digit e-Shram Universal Account Number (UAN) Card'
    ],
    criteria: {
      minAge: 16,
      maxAge: 59,
      allowedOccupations: ['daily_wage', 'farmer', 'artisan', 'gig_worker', 'unemployed', 'small_business'],
      maxIncomeRange: '2.5L_5L'
    },
    translations: {
      hi: {
        title: 'ई-श्रम कार्ड (असंगठित कामगार सुरक्षा)',
        shortDesc: 'असंगठित व गिग कामगारों के लिए 12-अंकों का यूनिवर्सल पहचान पत्र और ₹2 लाख का मुफ़्त दुर्घटना बीमा।',
        benefitsSummary: 'दुर्घटना में मृत्यु/पूर्ण दिव्यांगता पर ₹2 लाख एवं आंशिक दिव्यांगता पर ₹1 लाख का मुफ़्त कवर।',
        benefitAmount: '₹2,00,000 दुर्घटना बीमा + कल्याणकारी योजनाएं',
        howToApply: 'eshram.gov.in पर आधार और मोबाइल नंबर से मुफ़्त में खुद रजिस्टर करें।',
        scamWarning: 'पंजीकरण बिल्कुल मुफ़्त है। किसी को पैसे न दें।'
      }
    }
  },
  {
    id: 'mgnrega',
    title: 'Mahatma Gandhi NREGA (100 Days Guaranteed Wage Employment)',
    ministry: 'Ministry of Rural Development',
    category: 'Labor & Employment',
    shortDesc: 'Legal right to 100 days of guaranteed wage employment in a financial year to every rural household whose adult members volunteer for unskilled manual work.',
    benefitsSummary: 'Guaranteed 100 days wage employment per rural household at statutory state wage rates (₹240 - ₹374/day). Unemployment allowance payable if work not given within 15 days.',
    benefitAmount: '100 Days Guaranteed Wage (₹240 - ₹374 / day)',
    officialPortal: 'https://nrega.nic.in',
    helpline: '1800-345-6527',
    scamWarning: 'Wages must be credited directly into your Aadhaar-seeded bank account. Demanding cash cuts or retaining job cards by contractors is an offence.',
    requiredDocuments: [
      'Aadhaar Cards of adult household members',
      'Residence proof in the Gram Panchayat',
      'Passport size photographs',
      'Aadhaar-seeded Bank / Post office account passbook'
    ],
    applicationSteps: [
      'Submit written application or oral request to Gram Panchayat for Job Card',
      'Gram Panchayat issues Job Card free within 15 days of application',
      'Submit dated application for work to Panchayat or Program Officer',
      'Panchayat must provide employment within 5 km within 15 days, or pay unemployment allowance'
    ],
    criteria: {
      minAge: 18,
      allowedOccupations: ['daily_wage', 'farmer', 'artisan', 'unemployed', 'homemaker']
    },
    translations: {
      hi: {
        title: 'मनरेगा (100 दिन का कानूनी रोज़गार अधिकार)',
        shortDesc: 'प्रत्येक ग्रामीण परिवार को एक वित्तीय वर्ष में 100 दिन की गारंटीशुदा अकुशल मजदूरी का कानूनी अधिकार।',
        benefitsSummary: 'प्रतिदिन राज्य तय मजदूरी (₹240 से ₹374)। 15 दिन में काम न मिलने पर बेरोज़गारी भत्ता पाने का अधिकार।',
        benefitAmount: '100 दिन गारंटीशुदा मजदूरी (कानूनी अधिकार)',
        howToApply: 'ग्राम पंचायत कार्यालय में जाकर निःशुल्क जॉब कार्ड बनवाएं और काम की मांग की रसीद लें।',
        scamWarning: 'जॉब कार्ड अपने पास रखें, किसी ठेकेदार या मेट को जमा न करने दें।'
      }
    }
  },
  {
    id: 'pm-vishwakarma',
    title: 'PM Vishwakarma Kaushal Samman',
    ministry: 'Ministry of Micro, Small and Medium Enterprises',
    category: 'Labor & Employment',
    shortDesc: 'Holistic support for 18 traditional artisan trades (carpenters, blacksmiths, potters, cobblers, tailors) with collateral-free loans up to ₹3 Lakhs at 5% interest.',
    benefitsSummary: 'Recognition via Vishwakarma Certificate & ID, ₹15,000 modern toolkit incentive, basic & advanced training with ₹500/day stipend, and up to ₹3 Lakhs loan in 2 tranches at 5% interest.',
    benefitAmount: '₹15,000 Toolkit + ₹3,00,000 Loan at 5% + ₹500/day Stipend',
    officialPortal: 'https://pmvishwakarma.gov.in',
    helpline: '1800-267-7777',
    scamWarning: 'Loans under PM Vishwakarma require NO collateral or guarantor. Beware of private loan brokers claiming fast approval.',
    requiredDocuments: [
      'Aadhaar Card & mobile linked',
      'Bank Account passbook',
      'Declaration of engaging in one of the 18 specified artisan trades',
      'Ration Card / Family details'
    ],
    applicationSteps: [
      'Visit nearest Common Services Center (CSC) with Aadhaar and bank details',
      'Biometric verification and trade selection from 18 artisan categories',
      'Gram Panchayat / Urban Local Body verification of traditional craft practice',
      'Receive Vishwakarma Digital Certificate and attend 5-7 days skill training'
    ],
    criteria: {
      minAge: 18,
      allowedOccupations: ['artisan', 'daily_wage', 'small_business']
    },
    translations: {
      hi: {
        title: 'पीएम विश्वकर्मा कौशल सम्मान योजना',
        shortDesc: '18 पारंपरिक कारीगरों (बढ़ई, लोहार, कुम्हार, दर्जी आदि) को ₹15,000 टूलकिट और 5% ब्याज पर ₹3 लाख तक का लोन।',
        benefitsSummary: 'पहचान पत्र, ₹15,000 टूलकिट अनुदान, ट्रेनिंग के दौरान ₹500/दिन स्टाइपेंड और बिना गारंटी ₹3 लाख तक का सस्ता ऋण।',
        benefitAmount: '₹15,000 टूलकिट + ₹3 लाख आसान ऋण (5% ब्याज)',
        howToApply: 'नजदीकी सीएससी (CSC) केंद्र पर जाकर बायोमेट्रिक सत्यापन के साथ आवेदन करें।',
        scamWarning: 'ऋण के लिए किसी गारंटर की आवश्यकता नहीं है। दलालों से दूर रहें।'
      }
    }
  },
  {
    id: 'pm-ujjwala',
    title: 'Pradhan Mantri Ujjwala Yojana 2.0 (Free LPG Gas)',
    ministry: 'Ministry of Petroleum and Natural Gas',
    category: 'Energy & Utilities',
    shortDesc: 'Free deposit-free LPG connection, first refill and gas stove to adult women from poor and underprivileged households.',
    benefitsSummary: '100% free LPG connection with zero security deposit for cylinder, free pressure regulator, safety hose, first filled 14.2 kg cylinder, and free gas stove (hotplate) + ₹300 subsidy per cylinder.',
    benefitAmount: 'Free Gas Connection + Free Stove & Cylinder + ₹300 Subsidy',
    officialPortal: 'https://pmuy.gov.in',
    helpline: '1906 / 1800-266-6696',
    scamWarning: 'Ujjwala 2.0 application forms are distributed 100% free at all gas agencies (Indane, BharatGas, HP Gas). Do not pay form fees.',
    requiredDocuments: [
      'Aadhaar Card of adult female applicant',
      'Ration card / Family composition document',
      'Bank Account (Aadhaar linked for DBT subsidy)',
      '14-point declaration for migrant families (if no local ration card)'
    ],
    applicationSteps: [
      'Download form from pmuy.gov.in or collect free from nearest LPG distributor',
      'Submit filled form with Aadhaar and Ration Card to LPG distributor',
      'Distributor verifies de-duplication to ensure no existing connection in household',
      'Distributor delivers installed cylinder, regulator and stove at home'
    ],
    criteria: {
      minAge: 18,
      genders: ['female'],
      maxIncomeRange: '1L_2.5L'
    },
    translations: {
      hi: {
        title: 'प्रधानमंत्री उज्ज्वला योजना 2.0 (मुफ्त गैस कनेक्शन)',
        shortDesc: 'गरीब परिवारों की वयस्क महिलाओं के लिए निःशुल्क एलपीजी गैस कनेक्शन, पहला भरा हुआ सिलेंडर और चूल्हा।',
        benefitsSummary: 'शून्य डिपाजिट पर गैस कनेक्शन + पहला सिलेंडर मुफ्त + गैस चूल्हा मुफ्त + प्रत्येक रिफिल पर ₹300 की सब्सिडी।',
        benefitAmount: 'मुफ़्त गैस कनेक्शन + चूल्हा + ₹300 रिफिल सब्सिडी',
        howToApply: 'नजदीकी गैस एजेंसी (इंडेन, भारत गैस, एचपी) में महिला के आधार व राशन कार्ड के साथ आवेदन करें।',
        scamWarning: 'आवेदन फॉर्म बिल्कुल मुफ्त है, किसी को पैसे न दें।'
      }
    }
  },
  {
    id: 'free-legal-aid',
    title: 'Free Legal Aid (NALSA / Legal Services Authorities)',
    ministry: 'Ministry of Law and Justice & Supreme Court of India',
    category: 'Labor & Employment',
    shortDesc: 'Constitutional guarantee under Article 39A providing 100% free advocates, court fees, and appeal drafting for women, SC/ST, custody detainees, and low-income citizens.',
    benefitsSummary: 'Free government-paid lawyer for civil, criminal, revenue, or matrimonial disputes in High Courts, District Courts, or Taluk courts. All court fees and drafting expenses borne by government.',
    benefitAmount: '100% Free Court Lawyer, Bail & Legal Defence',
    officialPortal: 'https://nalsa.gov.in',
    helpline: '15100 (National Legal Aid Toll-Free)',
    scamWarning: 'Legal Aid lawyers assigned by DLSA/TLSC are prohibited from taking ANY fee or tips from the client. Report immediately to District Judge if asked.',
    requiredDocuments: [
      'Identity Proof (Aadhaar / Voter ID / Ration Card)',
      'Income Certificate (if applying under low income quota - not required for Women, SC/ST, or children)',
      'Case papers / Court notice / Police FIR copy'
    ],
    applicationSteps: [
      'Call national toll-free helpline 15100 or visit District Legal Services Authority (DLSA) at the local District Court',
      'Fill a simple one-page legal aid application form',
      'Legal Aid Committee reviews and assigns an advocate within 7 working days',
      'The assigned advocate represents you in court at zero expense to you'
    ],
    criteria: {
      minAge: 18,
      maxIncomeRange: '2.5L_5L'
    },
    translations: {
      hi: {
        title: 'मुफ्त कानूनी सहायता (नालसा - NALSA)',
        shortDesc: 'महिलाओं, एससी/एसटी, विचाराधीन कैदियों और कमजोर आय वर्ग के लिए 100% मुफ्त सरकारी वकील और अदालती खर्च।',
        benefitsSummary: 'अदालती मुकदमों, जमानत, पारिवारिक विवाद में मुफ़्त वकील। कोर्ट फीस और टाइपिंग का खर्च सरकार वहन करती है।',
        benefitAmount: '100% मुफ़्त वकील व कानूनी सुरक्षा (अनुच्छेद 39A)',
        howToApply: 'टोल-फ्री नंबर 15100 पर कॉल करें या जिला अदालत के विधिक सेवा प्राधिकरण (DLSA) कार्यालय जाएं।',
        scamWarning: 'सरकारी विधिक सहायता वकील को एक भी रुपया देना अपराध है।'
      }
    }
  },
  {
    id: 'post-matric-scholarship',
    title: 'Post-Matric Scholarship for SC/ST/OBC/EWS Students',
    ministry: 'Ministry of Social Justice and Empowerment',
    category: 'Education & Youth',
    shortDesc: 'Full reimbursement of compulsory tuition fees and monthly maintenance allowance for Class 11, 12, ITI, Diploma, Undergraduate, and Postgraduate studies.',
    benefitsSummary: '100% non-refundable fees covered + ₹3,000 to ₹13,500 annual maintenance allowance depending on course group, directly into student bank account.',
    benefitAmount: 'Full Tuition Fee Paid + Up to ₹13,500/year Allowance',
    officialPortal: 'https://scholarships.gov.in (NSP)',
    helpline: '0120-6619540',
    scamWarning: 'Do not share your National Scholarship Portal login ID and password with cyber cafe owners. Check official bank credit alerts directly.',
    requiredDocuments: [
      'Aadhaar Card of student linked with Bank DBT',
      'Valid Caste Certificate issued by competent authority',
      'Income Certificate (Family income < ₹2.5 Lakhs/year)',
      'Previous year marksheet & Current Institution Bonafide Certificate',
      'Fee receipt of current academic year'
    ],
    applicationSteps: [
      'Register with Aadhaar on National Scholarship Portal (scholarships.gov.in) with OTR (One Time Registration)',
      'Select Post-Matric Scholarship scheme under your state / ministry',
      'Upload caste, income, and educational certificates',
      'Submit form online; institution verifies student bonafide',
      'Disbursed through PFMS / DBT directly into student bank account'
    ],
    criteria: {
      minAge: 15,
      maxAge: 35,
      isStudent: true,
      allowedCategories: ['SC', 'ST', 'OBC', 'EWS'],
      maxIncomeRange: '1L_2.5L'
    },
    translations: {
      hi: {
        title: 'पोस्ट-मैट्रिक छात्रवृत्ति (SC/ST/OBC/EWS)',
        shortDesc: '11वीं, 12वीं, कॉलेज, आईटीआई और उच्च शिक्षा के लिए पूरी ट्यूशन फीस वापसी और मासिक गुजारा भत्ता।',
        benefitsSummary: 'कॉलेज फीस की 100% वापसी + ₹13,500 तक वार्षिक रखरखाव भत्ता सीधे छात्र के बैंक खाते में।',
        benefitAmount: '100% कॉलेज फीस वापसी + ₹13,500 तक भत्ता',
        howToApply: 'scholarships.gov.in (नेशनल स्कॉलरशिप पोर्टल) पर आधार और जाति/आय प्रमाण पत्र के साथ आवेदन करें।',
        scamWarning: 'पोर्टल का पासवर्ड किसी कैफे वाले को न दें। आवेदन बिल्कुल निःशुल्क है।'
      }
    }
  },
  {
    id: 'atal-pension',
    title: 'Atal Pension Yojana (APY - Guaranteed Retirement Income)',
    ministry: 'Ministry of Finance / PFRDA',
    category: 'Pensions & Elderly',
    shortDesc: 'Government-guaranteed pension of ₹1,000 to ₹5,000 per month from age 60 for unorganized sector workers with lifetime spouse cover and corpus return to nominee.',
    benefitsSummary: 'Fixed lifetime pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month after age 60. Same pension continues to spouse upon subscriber death. Full corpus refunded to nominee thereafter.',
    benefitAmount: 'Guaranteed ₹1,000 to ₹5,000 / month from age 60',
    officialPortal: 'https://enps.nsdl.com',
    helpline: '1800-110-069',
    scamWarning: 'Any bank or post office savings account holder between 18-40 years (not an income tax payer) can enroll. Do not buy pension products with high agent commissions without comparing APY.',
    requiredDocuments: [
      'Savings Bank / Post Office Account details',
      'Aadhaar Card',
      'Nominee details (Spouse Aadhaar)',
      'Auto-debit mandate authorization'
    ],
    applicationSteps: [
      'Visit your bank branch or use net banking / mobile banking app',
      'Select Atal Pension Yojana section and choose desired monthly pension (₹1,000 to ₹5,000)',
      'Contribution is auto-debited monthly (starts as low as ₹42/month at age 18)',
      'Receive instant PRAN (Permanent Retirement Account Number) card'
    ],
    criteria: {
      minAge: 18,
      maxAge: 40,
      maxIncomeRange: '2.5L_5L'
    },
    translations: {
      hi: {
        title: 'अटल पेंशन योजना (APY - आजीवन गारंटीकृत पेंशन)',
        shortDesc: '60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 प्रति माह की सरकारी गारंटीड पेंशन।',
        benefitsSummary: 'आजीवन निश्चित पेंशन + पति/पत्नी को पेंशन + नॉमिनी को पूरी मूल राशि की वापसी।',
        benefitAmount: '₹1,000 से ₹5,000 प्रति माह गारंटीड पेंशन',
        howToApply: 'अपने बैंक या डाकघर में बचत खाते से ऑटो-डेबिट शुरू करवाएं।',
        scamWarning: 'यह भारत सरकार द्वारा गारंटीकृत योजना है। निजी एजेंटों के झांसे में न आएं।'
      }
    }
  }
];
