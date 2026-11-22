import { CitizenRight } from '../types';

export const CITIZEN_RIGHTS: CitizenRight[] = [
  {
    id: 'police-arrest-rights',
    title: 'Police Interrogation & Arrest Safeguards',
    category: 'Police & Arrest',
    legalBasis: 'D.K. Basu Guidelines, Article 21 & 22 of Constitution, Section 41 & 50 CrPC (Sec 35 BNSS)',
    summary: 'A police officer cannot arbitrarily arrest anyone for offences with less than 7 years imprisonment without reasoned notice. You have the fundamental right to know grounds of arrest, speak to an advocate, and inform a family member.',
    keyProtections: [
      'Right to Know Reasons: Police must inform you the exact grounds of arrest immediately and show a written arrest memo.',
      'Arrest Memo Requirement: The arresting officer must prepare an Arrest Memo signed by at least one family member or respectable local witness and counter-signed by you.',
      'Right to Legal Counsel: You have the right to meet and consult an advocate of your choice during interrogation.',
      'Protection of Women: A woman cannot be arrested after sunset (6 PM) and before sunrise (6 AM) without special written order from a Judicial Magistrate. Arrest of women must be done in the presence of a female police officer.',
      '24-Hour Magistrate Rule: You MUST be produced before the nearest Judicial Magistrate within 24 hours of arrest (excluding travel time).'
    ],
    whatToDoIfViolated: [
      'Ask politely: "Officer, am I under arrest or am I free to go? Under what section?"',
      'Demand to inform a family member immediately under DK Basu guideline #2.',
      'Never sign blank papers or undated statements.',
      'When produced before the Magistrate within 24 hours, inform the judge directly about any physical assault, detention beyond 24 hours, or extortion.',
      'Call 112 (National Emergency) or file a complaint with the State Police Complaints Authority.'
    ],
    emergencyHelplines: [
      { name: 'National Emergency Response System', number: '112' },
      { name: 'National Free Legal Aid Helpline', number: '15100' },
      { name: 'National Human Rights Commission (NHRC)', number: '14433' }
    ],
    draftTemplate: {
      type: 'complaint',
      title: 'Formal Complaint for Illegal Police Detention / Harassment',
      instructions: 'Fill details and submit to the Superintendent of Police (SP) or State Human Rights Commission.',
      templateBody: `To,\nThe Superintendent of Police / Police Complaints Authority,\nDistrict: [Your District, State]\n\nSubject: Formal Complaint regarding Illegal Detention and Violation of DK Basu Guidelines by [Police Station Name].\n\nRespected Sir/Madam,\n\nI, [Your Full Name], residing at [Your Full Address], Aadhaar No. [Optional], state as follows:\n\n1. On [Date] at approximately [Time], I was summoned/detained by officers attached to [Police Station Name].\n2. I was detained without being informed of any specific grounds of arrest or being provided an Arrest Memo as mandated by the Hon'ble Supreme Court in D.K. Basu vs State of West Bengal.\n3. [State what happened: denial of advocate, physical mistreatment, or unlawful detention beyond 24 hours].\n\nI request you to kindly call for CCTV footage of the police station from [Date & Time Range] and initiate appropriate departmental inquiry against the erring personnel under relevant provisions of law.\n\nYours faithfully,\n[Your Signature / Name]\nPhone: [Your Phone]\nDate: [Current Date]`
    },
    translations: {
      hi: {
        title: 'पुलिस पूछताछ एवं गिरफ्तारी के दौरान नागरिक अधिकार',
        summary: 'पुलिस किसी भी नागरिक को बिना ठोस कारण या बिना नोटिस के मनमाने ढंग से गिरफ्तार नहीं कर सकती। गिरफ्तारी का कारण जानने, वकील से मिलने और 24 घंटे में जज के सामने पेश होने का आपका मौलिक अधिकार है।',
        keyProtections: [
          'गिरफ्तारी का कारण जानने का अधिकार (धारा 50 सीआरपीसी)।',
          'अरेस्ट मेमो बनवाना अनिवार्य: इस पर परिवार के सदस्य के हस्ताक्षर होने चाहिए।',
          'पूछताछ के दौरान अपने वकील से मिलने का अधिकार।',
          'महिलाओं की सुरक्षा: सूर्यास्त (शाम 6 बजे) के बाद और सूर्योदय से पहले किसी महिला को गिरफ्तार नहीं किया जा सकता (विशेष मजिस्ट्रेट आदेश के बिना)।',
          '24 घंटे के अंदर मजिस्ट्रेट के समक्ष पेशी अनिवार्य।'
        ],
        whatToDoIfViolated: [
          'शांत रहकर पूछें: "क्या मुझे गिरफ्तार किया जा रहा है? किस धारा के तहत?"',
          'तुरंत अपने परिवार या वकील को सूचित करने की मांग करें।',
          'किसी सादे कागज पर कभी दस्तखत न करें।',
          'मजिस्ट्रेट के सामने पेश होने पर किसी भी ज्यादती की शिकायत सीधे जज से करें।'
        ]
      }
    }
  },
  {
    id: 'tenant-rights',
    title: 'Tenant Protection & Rent Control Laws',
    category: 'Tenancy & Housing',
    legalBasis: 'Model Tenancy Act & State Rent Control Regulations',
    summary: 'Landlords cannot arbitrarily hike rent mid-tenure, disconnect basic utilities (water/power), or enter your home without notice. Eviction requires statutory due process.',
    keyProtections: [
      'Written Agreement: Every tenancy must have a valid written and registered rent agreement specifying rent, tenure, and deposit.',
      'Security Deposit Cap: Under the Model Tenancy Act, security deposit for residential premises is capped at a maximum of 2 months rent.',
      'Protection from Unlawful Disconnection: A landlord cannot cut electricity, water, or municipal amenities to force eviction even if rent is delayed.',
      '24-Hour Entry Notice: Landlord cannot enter rented premises without giving at least 24 hours prior notice (electronic or written).',
      'Statutory Eviction Notice: A landlord cannot evict a tenant without giving statutory 30-day written notice specifying valid legal grounds.'
    ],
    whatToDoIfViolated: [
      'If landlord disconnects water or power, file an immediate petition before the local Rent Authority / SDM Court; reconnection orders are issued within 24 hours.',
      'Do not vacate under oral intimidation or unauthorized lockouts; police cannot assist illegal landlord evictions without court order.',
      'Keep written payment proof (UPI transactions, bank transfers, or signed receipts).',
      'Send a formal legal notice through a civil advocate before vacating or filing for deposit recovery.'
    ],
    emergencyHelplines: [
      { name: 'National Free Legal Aid Helpline', number: '15100' },
      { name: 'Police Control Room (for illegal locks/force)', number: '112' }
    ],
    draftTemplate: {
      type: 'legal_notice',
      title: 'Legal Notice to Landlord for Unlawful Utility Disconnection / Eviction Threat',
      instructions: 'Send via Registered Post or WhatsApp/Email to the Landlord.',
      templateBody: `To,\n[Landlord Full Name],\nAddress: [Landlord Address]\n\nSubject: Legal Notice regarding Unlawful Disconnection of Essential Amenities / Arbitrary Eviction Threat.\n\nSir/Madam,\n\nI am the lawful tenant of premises [Rented House Address] under the Rent Agreement dated [Date of Agreement], paying monthly rent of ₹[Amount].\n\n1. On [Date], you wrongfully and arbitrarily [disconnected electricity / water supply / threatened eviction without statutory notice].\n2. Section of the Tenancy Act strictly prohibits withholding essential services to a tenant under any circumstances.\n3. You are hereby called upon to restore the essential supply immediately within 24 hours of receipt of this notice, failing which I shall be constrained to approach the Rent Authority and Court of Judicial Magistrate for punitive damages.\n\n[Tenant Name]\nDate: [Current Date]`
    },
    translations: {
      hi: {
        title: 'किरायेदारों के अधिकार एवं बेदखली से सुरक्षा कानून',
        summary: 'मकान मालिक मनमाने ढंग से किराया नहीं बढ़ा सकता, न ही पानी या बिजली काट सकता है। कानूनी नोटिस दिए बिना घर खाली कराने का प्रयास गैरकानूनी है।',
        keyProtections: [
          'सिक्योरिटी डिपॉजिट अधिकतम 2 महीने के किराए तक सीमित।',
          'बिजली, पानी जैसी बुनियादी सुविधाएं काटना गैरकानूनी अपराध है।',
          'मकान मालिक को घर में आने से पहले 24 घंटे पूर्व सूचना देना अनिवार्य।',
          'घर खाली कराने के लिए न्यूनतम 30 दिन का लिखित कानूनी नोटिस आवश्यक।'
        ],
        whatToDoIfViolated: [
          'बिजली-पानी कटने पर तुरंत रेंट अथॉरिटी या एसडीएम कोर्ट में शिकायत करें।',
          'बिना अदालती आदेश के मकान मालिक ताला नहीं लगा सकता; 112 पर कॉल करें।'
        ]
      }
    }
  },
  {
    id: 'right-to-information',
    title: 'Right to Information (RTI Act 2005)',
    category: 'Transparency & RTI',
    legalBasis: 'Right to Information Act, 2005 (Central Act 22 of 2005)',
    summary: 'Every citizen has the legal right to inspect government records, tenders, road construction bills, ration records, fund allocations, and scheme application statuses within a strict 30-day deadline.',
    keyProtections: [
      'Mandatory 30-Day Response: Public Information Officer (PIO) must provide requested information within 30 days of receiving the RTI application.',
      'Life & Liberty (48 Hours): If information concerns an individual’s life or liberty, it must be provided within 48 hours.',
      'Nominal Fee (₹10): RTI application fee is only ₹10 (cash, court fee stamp, IPO, or online payment). BPL cardholders pay ₹0 (100% free).',
      'No Reason Required: Citizen is NOT required to give any reason for asking for public information.',
      'Penalty on Corrupt Officers: Failure to provide information attracts a fine of ₹250 per day up to ₹25,000 on the PIO.'
    ],
    whatToDoIfViolated: [
      'If no reply is received in 30 days, file a "First Appeal" before the First Appellate Authority (FAA) of the department within 30 days (Free).',
      'If the First Appeal is rejected or ignored within 45 days, file a "Second Appeal" before the State Information Commission (SIC) or Central Information Commission (CIC).',
      'The Information Commission has statutory powers of a civil court to penalize the officer and award compensation to you.'
    ],
    emergencyHelplines: [
      { name: 'Central RTI Portal Support', number: '011-24660300' },
      { name: 'RTI Helpline (DoPT)', number: '1800-11-2005' }
    ],
    draftTemplate: {
      type: 'rti_application',
      title: 'Official RTI Application Form (Ready to File)',
      instructions: 'Pay ₹10 fee via postal order / online at rtionline.gov.in. BPL cardholders attach BPL card copy for zero fee.',
      templateBody: `To,\nThe Public Information Officer (PIO),\nName of Public Authority / Department: [e.g. Municipal Corporation / Health Dept / Gram Panchayat]\nAddress: [Office Address]\n\n1. Full Name of Applicant: [Your Name]\n2. Address for Correspondence: [Your Address with PIN Code]\n3. Contact Mobile & Email: [Your Phone & Email]\n4. Particulars of Information Sought:\n   a) Please provide the certified status of my application dated [Date], Application Ref No. [Ref Number].\n   b) Please provide the certified copies of the file notings and daily progress sheet regarding the work/scheme.\n   c) Please provide the names, designations, and contact numbers of officials who were assigned to process this file and the reason for delay beyond statutory citizen charter timelines.\n5. Period to which information relates: [e.g. 2025 - 2026]\n6. Fee Details: ₹10 paid via Postal Order No. [Number] / Online Transaction Ref [Ref] / Free (BPL Card Attached).\n\nDeclaration: I am a citizen of India and seek information under Section 6(1) of RTI Act 2005.\n\nDate: [Date]\nPlace: [City]\nApplicant Signature: ______________`
    },
    translations: {
      hi: {
        title: 'सूचना का अधिकार (RTI कानून 2005)',
        summary: 'प्रत्येक नागरिक को सरकारी कामकाज, फाइलों, राशन रिकॉर्ड, सड़क निर्माण बिल और योजना के अटके आवेदनों की आधिकारिक जानकारी 30 दिन में पाने का कानूनी अधिकार है।',
        keyProtections: [
          '30 दिन के भीतर सूचना देना अनिवार्य।',
          'जीवन और स्वतंत्रता से जुड़े मामलों में 48 घंटे के भीतर सूचना।',
          'आवेदन शुल्क केवल ₹10 (बीपीएल कार्डधारकों के लिए 100% मुफ़्त)।',
          'सूचना मांगने का कारण बताना ज़रूरी नहीं है।',
          'अधिकारी द्वारा देरी करने पर ₹250 प्रतिदिन (अधिकतम ₹25,000) जुर्माना।'
        ],
        whatToDoIfViolated: [
          '30 दिन में जवाब न मिलने पर प्रथम अपीलीय अधिकारी के पास प्रथम अपील दायर करें।',
          'राज्य या केंद्रीय सूचना आयोग में दूसरी अपील करें।'
        ]
      }
    }
  },
  {
    id: 'consumer-protection',
    title: 'Consumer Rights & E-Commerce Safeguards',
    category: 'Consumer & Digital',
    legalBasis: 'Consumer Protection Act 2019 & E-Commerce Rules 2020',
    summary: 'Consumers are protected against defective products, deficiency in services, unfair delivery/cancellation fees, misleading advertisements, and dark patterns.',
    keyProtections: [
      'Right to Refund & Replacement: Defective goods or sub-standard services must be refunded or replaced without unreasonable delay.',
      'Ban on Dark Patterns: Platforms cannot automatically add optional add-ons, flight insurance, or trick checkboxes into your cart without affirmative consent.',
      'Prohibition on Unilateral Cancellation Fees: E-commerce companies cannot charge cancellation fees unless equal charges are borne by them for merchant cancellations.',
      'Direct Digital Filing (e-Daakhil): Consumers can file complaints online from home at edaakhil.nic.in without hiring an advocate.',
      'Product Liability: Manufacturer or service provider is legally liable to pay compensation for harm caused by defective product or deficient service.'
    ],
    whatToDoIfViolated: [
      'Call National Consumer Helpline toll-free at 1915 or WhatsApp to 8800001915.',
      'File an online grievance at consumerhelpline.gov.in (NCH handles over 85% resolutions informally within 30 days).',
      'If not resolved, file formal consumer case at District Consumer Commission through edaakhil.nic.in for claim up to ₹50 Lakhs.'
    ],
    emergencyHelplines: [
      { name: 'National Consumer Helpline (NCH)', number: '1915' },
      { name: 'NCH WhatsApp Support', number: '+91-8800001915' }
    ],
    draftTemplate: {
      type: 'consumer_complaint',
      title: 'Formal Notice to Merchant / E-Commerce Platform before Consumer Court',
      instructions: 'Send to merchant customer grievance officer via email.',
      templateBody: `To,\nGrievance Officer / Legal Department,\nCompany: [Merchant / Platform Name]\nAddress: [Company Address / Email]\n\nSubject: Formal Demand Notice regarding Deficient Service / Refusal of Refund for Order #[Order Number].\n\nSir/Madam,\n\nI purchased [Product/Service Name] on [Date] for ₹[Amount], Order ID #[Order ID].\n\n1. The product delivered was [defective / damaged / not as described / service was cancelled unilaterally].\n2. Despite multiple communications to your customer support on [Dates], my legitimate refund of ₹[Amount] has been arbitrarily denied/delayed.\n3. This constitutes "Deficiency in Service" and "Unfair Trade Practice" under Section 2(11) and 2(47) of the Consumer Protection Act, 2019.\n\nYou are hereby requested to process the full refund of ₹[Amount] along with statutory interest within 7 days, failing which I shall initiate proceedings on e-Daakhil seeking damages and litigation costs.\n\nSincerely,\n[Your Name]\nPhone: [Phone Number]`
    },
    translations: {
      hi: {
        title: 'उपभोक्ता अधिकार एवं ई-कॉमर्स धोखाधड़ी से बचाव',
        summary: 'खराब सामान मिलने, मनमाने कैंसिलेशन शुल्क या रिफंड न मिलने पर उपभोक्ता को पूरा रिफंड और हर्जाना पाने का कानूनी अधिकार है।',
        keyProtections: [
          'खराब सामान की वापसी व रिफंड पाने का अधिकार।',
          'ई-कॉमर्स पर जबरन बीमा या छिपा हुआ शुल्क जोड़ना प्रतिबंधित।',
          'घर बैठे ऑनलाइन ई-दाखिल (edaakhil.nic.in) पर बिना वकील केस दर्ज करने की सुविधा।',
          'नुकसान होने पर कंपनी से हर्जाना पाने का अधिकार।'
        ],
        whatToDoIfViolated: [
          'राष्ट्रीय उपभोक्ता हेल्पलाइन 1915 पर शिकायत दर्ज कराएं या व्हाट्सएप (8800001915) करें।',
          'edaakhil.nic.in पर बिना किसी वकील के सीधे ऑनलाइन शिकायत करें।'
        ]
      }
    }
  },
  {
    id: 'women-domestic-protection',
    title: 'Women’s Protection Against Domestic Violence',
    category: 'Women & Family',
    legalBasis: 'Protection of Women from Domestic Violence Act, 2005 (PWDVA)',
    summary: 'Comprehensive legal shield for any woman living in a shared household against physical, verbal, emotional, economic, or sexual abuse. Guarantees right to residence, maintenance, and emergency protection orders.',
    keyProtections: [
      'Right to Reside in Shared Household: A woman CANNOT be thrown out of her matrimonial or shared home, regardless of whether she holds legal title or ownership.',
      'Protection Orders: Magistrate can issue immediate orders barring the abuser from entering the woman’s workplace, communicating with her, or disposing shared assets.',
      'Monetary Relief & Maintenance: Court can direct monthly maintenance for food, shelter, clothes, and children’s education.',
      '100% Free Government Legal Assistance: Assistance from government Protection Officers (PO) and Service Providers at zero cost.'
    ],
    whatToDoIfViolated: [
      'Dial 181 (Women Helpline) or 112 immediately in case of physical threat or emergency.',
      'Approach the nearest Protection Officer located in every District Magistrate / Women & Child Development office.',
      'Call National Free Legal Aid Helpline at 15100 to get a free lady advocate appointed for Magistrate court filing.'
    ],
    emergencyHelplines: [
      { name: 'Women Helpline (Domestic Abuse & Distress)', number: '181' },
      { name: 'National Emergency Response', number: '112' },
      { name: 'National Commission for Women (NCW)', number: '7827-170-170' }
    ],
    translations: {
      hi: {
        title: 'घरेलू हिंसा से महिलाओं का संरक्षण कानून',
        summary: 'ससुराल या साझे घर में रहने वाली किसी भी महिला को शारीरिक, मानसिक या आर्थिक प्रताड़ना से पूर्ण कानूनी सुरक्षा। घर में रहने का अधिकार और मासिक गुजारा भत्ता पाने की गारंटी।',
        keyProtections: [
          'साझे घर में रहने का कानूनी अधिकार (महिला को घर से नहीं निकाला जा सकता)।',
          'मजिस्ट्रेट द्वारा सुरक्षा आदेश और संपर्क पर रोक।',
          'महिला और बच्चों के लिए मासिक गुजारा भत्ता।',
          'मुफ्त कानूनी सहायता और संरक्षण अधिकारी की मदद।'
        ],
        whatToDoIfViolated: [
          'तुरंत 181 (महिला हेल्पलाइन) या 112 पर फोन करें।',
          '15100 पर कॉल करके मुफ्त सरकारी महिला वकील प्राप्त करें।'
        ]
      }
    }
  },
  {
    id: 'labor-minimum-wage',
    title: 'Fair Wages, Overtime & Gig Worker Rights',
    category: 'Labor & Wages',
    legalBasis: 'Code on Wages 2019, Minimum Wages Act & Contract Labour Act',
    summary: 'No employer or contractor can pay less than statutory state minimum wages, withhold earned wages, or force overtime without double pay. Equal wages mandated for equal work without gender bias.',
    keyProtections: [
      'Statutory Minimum Wage Floor: Every worker, whether regular, contract, or casual, is entitled to state minimum wages notified for their skill level.',
      'Overtime at Double Rate: Any work beyond 8 hours a day or 48 hours a week must be compensated at double the normal rate of wages.',
      'Timely Payment of Wages: Wages must be paid by the 7th or 10th day of the succeeding month into bank accounts.',
      'Equal Remuneration: Men and women doing identical or similar work must receive equal wages; gender discrimination is illegal.'
    ],
    whatToDoIfViolated: [
      'File an online grievance on Samadhan portal (samadhan.labour.gov.in) under Ministry of Labour.',
      'Approach the local Labour Commissioner or Inspector of Minimum Wages in your district.',
      'Unorganized workers can register on e-Shram portal to access state welfare board legal dispute relief.'
    ],
    emergencyHelplines: [
      { name: 'Shram Suvidha & Labour Helpdesk', number: '14434' },
      { name: 'National Legal Aid for Workers', number: '15100' }
    ],
    translations: {
      hi: {
        title: 'उचित मजदूरी, ओवरटाइम और श्रमिक अधिकार',
        summary: 'किसी भी मजदूर या कर्मचारी को तय न्यूनतम मजदूरी से कम देना कानूनन अपराध है। 8 घंटे से ज्यादा काम करने पर दोगुना ओवरटाइम वेतन और समान काम के लिए महिला-पुरुष को समान वेतन का अधिकार है।',
        keyProtections: [
          'न्यूनतम मजदूरी पाने का कानूनी अधिकार।',
          '8 घंटे से अधिक काम पर दोगुना ओवरटाइम भत्ता।',
          'महीने की 7 से 10 तारीख तक वेतन का भुगतान अनिवार्य।',
          'समान काम के लिए महिला और पुरुष को समान वेतन।'
        ],
        whatToDoIfViolated: [
          'श्रम समाधान पोर्टल (samadhan.labour.gov.in) पर शिकायत दर्ज कराएं।',
          'जिले के सहायक श्रम आयुक्त कार्यालय में शिकायत दें।'
        ]
      }
    }
  }
];
