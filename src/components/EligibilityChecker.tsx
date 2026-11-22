import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, AlertCircle, XCircle, ChevronDown, ChevronUp, 
  Sparkles, ExternalLink, Volume2, VolumeX, ShieldAlert, 
  Printer, User, Filter, ArrowRight
} from 'lucide-react';
import { CitizenProfile, Language, Scheme, OccupationType, IncomeRange, LandHolding, SocialCategory } from '../types';
import { SCHEMES_DATABASE } from '../data/schemes';
import { UI_TRANSLATIONS } from '../data/languages';
import { VoiceAssistantService } from '../services/voiceAssistant';

interface EligibilityCheckerProps {
  currentLang: Language;
  speechRate: number;
  onPrintDossier: (content: { title: string; summary: string; benefits: string[]; documents: string[]; steps: string[]; warning: string }) => void;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({
  currentLang,
  speechRate,
  onPrintDossier
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  // Citizen Profile Form State
  const [profile, setProfile] = useState<CitizenProfile>({
    age: 45,
    gender: 'female',
    state: 'Pan-India',
    areaType: 'rural',
    occupation: 'farmer',
    incomeRange: '1L_2.5L',
    landHolding: 'marginal',
    category: 'OBC',
    isPwD: false,
    isSeniorCitizen: false,
    isWidowOrSingleMother: false,
    hasPuccaHouse: false,
    isStudent: false,
    hasBPLCard: true
  });

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(null);
  const [speakingSchemeId, setSpeakingSchemeId] = useState<string | null>(null);

  // Income order map for comparison
  const incomeOrder: Record<IncomeRange, number> = {
    'below_1L': 1,
    '1L_2.5L': 2,
    '2.5L_5L': 3,
    '5L_8L': 4,
    'above_8L': 5
  };

  // Eligibility evaluation function
  const evaluateScheme = (scheme: Scheme, p: CitizenProfile): { status: 'eligible' | 'likely' | 'ineligible'; reasons: string[] } => {
    const reasons: string[] = [];
    const crit = scheme.criteria;

    // Age checks
    if (crit.minAge !== undefined && p.age < crit.minAge) {
      return { status: 'ineligible', reasons: [`Requires minimum age of ${crit.minAge} (current: ${p.age})`] };
    }
    if (crit.maxAge !== undefined && p.age > crit.maxAge) {
      return { status: 'ineligible', reasons: [`Exceeds maximum age limit of ${crit.maxAge} (current: ${p.age})`] };
    }

    // Gender checks
    if (crit.genders && crit.genders.length > 0 && !crit.genders.includes(p.gender as any)) {
      return { status: 'ineligible', reasons: [`Exclusively intended for ${crit.genders.join(' / ')} applicants.`] };
    }

    // Occupation checks
    if (crit.allowedOccupations && crit.allowedOccupations.length > 0 && !crit.allowedOccupations.includes(p.occupation)) {
      // Some schemes are occupation specific
      if (scheme.id === 'pm-kisan' && p.occupation !== 'farmer') {
        return { status: 'ineligible', reasons: ['Exclusively for agricultural landowning farmers.'] };
      }
      if (scheme.id === 'pm-vishwakarma' && !['artisan', 'daily_wage', 'small_business'].includes(p.occupation)) {
        return { status: 'ineligible', reasons: ['Targeted at traditional artisans and craftspersons.'] };
      }
    }

    // Income limit check
    if (crit.maxIncomeRange) {
      const allowedLevel = incomeOrder[crit.maxIncomeRange];
      const currentLevel = incomeOrder[p.incomeRange];
      if (currentLevel > allowedLevel) {
        return { status: 'ineligible', reasons: [`Annual family income exceeds the threshold (Max allowed: ${crit.maxIncomeRange.replace('_', ' to ')}).`] };
      }
    }

    // Category / Caste check
    if (crit.allowedCategories && crit.allowedCategories.length > 0 && !crit.allowedCategories.includes(p.category)) {
      return { status: 'ineligible', reasons: [`Reserved for ${crit.allowedCategories.join(', ')} categories.`] };
    }

    // Student check
    if (crit.isStudent && !p.isStudent) {
      return { status: 'ineligible', reasons: ['Requires current enrollment in school/college/university.'] };
    }

    // Special qualifiers for 'likely' eligible
    if (crit.requiresNoPuccaHouse && p.hasPuccaHouse) {
      return { status: 'ineligible', reasons: ['Family already possesses a pucca house in India.'] };
    }

    if (crit.requiresNoPuccaHouse && !p.hasPuccaHouse) {
      reasons.push('Meets housing criteria: Living in kutcha/dilapidated house.');
      return { status: 'likely', reasons };
    }

    if (scheme.id === 'ayushman-bharat-70plus' && p.age >= 70) {
      reasons.push('Universal benefit: Guaranteed 100% free ₹5 Lakh cover for age 70+ regardless of income!');
      return { status: 'eligible', reasons };
    }

    reasons.push('Profile matches age, income, and category eligibility parameters.');
    return { status: 'eligible', reasons };
  };

  // Evaluated schemes list
  const evaluatedSchemes = useMemo(() => {
    return SCHEMES_DATABASE.map(scheme => {
      const evalResult = evaluateScheme(scheme, profile);
      return {
        scheme,
        status: evalResult.status,
        reasons: evalResult.reasons
      };
    });
  }, [profile]);

  // Filtered by selected category
  const filteredSchemes = useMemo(() => {
    let list = evaluatedSchemes;
    if (selectedCategoryFilter !== 'All') {
      list = list.filter(item => item.scheme.category === selectedCategoryFilter);
    }
    // Sort: Eligible first, then Likely, then Ineligible
    return list.sort((a, b) => {
      const order = { eligible: 1, likely: 2, ineligible: 3 };
      return order[a.status] - order[b.status];
    });
  }, [evaluatedSchemes, selectedCategoryFilter]);

  // Summary counts
  const eligibleCount = evaluatedSchemes.filter(s => s.status === 'eligible').length;
  const likelyCount = evaluatedSchemes.filter(s => s.status === 'likely').length;

  const categories = ['All', 'Agriculture', 'Healthcare', 'Housing', 'Women & Child', 'Labor & Employment', 'Energy & Utilities', 'Education & Youth', 'Pensions & Elderly'];

  const toggleSpeech = (scheme: Scheme) => {
    if (speakingSchemeId === scheme.id) {
      VoiceAssistantService.stopSpeaking();
      setSpeakingSchemeId(null);
    } else {
      const translation = scheme.translations[currentLang];
      const title = translation?.title || scheme.title;
      const desc = translation?.shortDesc || scheme.shortDesc;
      const benefit = translation?.benefitsSummary || scheme.benefitsSummary;
      const speech = `${title}. ${desc}. Benefits: ${benefit}. Required documents: ${scheme.requiredDocuments.join(', ')}. Official portal: ${scheme.officialPortal}`;

      setSpeakingSchemeId(scheme.id);
      VoiceAssistantService.speak(
        speech,
        currentLang,
        () => setSpeakingSchemeId(scheme.id),
        () => setSpeakingSchemeId(null),
        speechRate
      );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-emerald-700 via-teal-700 to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-500/10 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            Instant Welfare Screener
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Check Your Government Scheme Eligibility
          </h2>
          <p className="text-sm sm:text-base text-emerald-50/90 font-medium leading-relaxed">
            Answer a few simple citizen profile questions. JanSeva AI checks 15+ central and state schemes instantly and shows you where you qualify, what benefits you receive, and how to apply.
          </p>
        </div>
      </div>

      {/* Citizen Profile Input Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Citizen Profile Parameters
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Updates matching results instantly
          </span>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Age */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Age (Years): <span className="text-emerald-700 font-extrabold">{profile.age}</span>
            </label>
            <input
              type="range"
              min="10"
              max="90"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 18 })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>10 yrs</span>
              <span>45 yrs</span>
              <span>90 yrs</span>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Gender</label>
            <select
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="female">Female (महिला)</option>
              <option value="male">Male (पुरुष)</option>
              <option value="transgender">Transgender (तृतीय लिंग)</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Occupation</label>
            <select
              value={profile.occupation}
              onChange={(e) => setProfile({ ...profile, occupation: e.target.value as OccupationType })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="farmer">Farmer (किसान)</option>
              <option value="daily_wage">Daily Wage / Labor (मजदूर)</option>
              <option value="artisan">Artisan / Craftsman (कारीगर)</option>
              <option value="gig_worker">Gig / Platform Worker (ड्राइवर/डिलीवरी)</option>
              <option value="student">Student (विद्यार्थी)</option>
              <option value="small_business">Small Shop / Business (छोटा व्यापारी)</option>
              <option value="homemaker">Homemaker (गृहणी)</option>
              <option value="senior_retired">Senior Citizen / Retired (बुजुर्ग)</option>
              <option value="unemployed">Unemployed (बेरोज़गार)</option>
              <option value="salaried">Salaried (नौकरीपेशा)</option>
            </select>
          </div>

          {/* Annual Family Income */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Annual Family Income</label>
            <select
              value={profile.incomeRange}
              onChange={(e) => setProfile({ ...profile, incomeRange: e.target.value as IncomeRange })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="below_1L">Below ₹1 Lakh (गरीबी रेखा से नीचे)</option>
              <option value="1L_2.5L">₹1 Lakh to ₹2.5 Lakhs</option>
              <option value="2.5L_5L">₹2.5 Lakhs to ₹5 Lakhs</option>
              <option value="5L_8L">₹5 Lakhs to ₹8 Lakhs</option>
              <option value="above_8L">Above ₹8 Lakhs</option>
            </select>
          </div>

          {/* Agricultural Land */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Agricultural Land</label>
            <select
              value={profile.landHolding}
              onChange={(e) => setProfile({ ...profile, landHolding: e.target.value as LandHolding })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="none">Landless (भूमिहीन)</option>
              <option value="marginal">Marginal (&lt; 2.5 acres / 1 hectare)</option>
              <option value="small">Small (2.5 to 5 acres / 1-2 hectares)</option>
              <option value="large">Large (&gt; 5 acres / &gt; 2 hectares)</option>
            </select>
          </div>

          {/* Social Category */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Social Category</label>
            <select
              value={profile.category}
              onChange={(e) => setProfile({ ...profile, category: e.target.value as SocialCategory })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="General">General (सामान्य)</option>
              <option value="OBC">OBC (अन्य पिछड़ा वर्ग)</option>
              <option value="SC">SC (अनुसूचित जाति)</option>
              <option value="ST">ST (अनुसूचित जनजाति)</option>
              <option value="EWS">EWS (आर्थिक रूप से कमजोर)</option>
            </select>
          </div>

          {/* Area Type */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Area Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProfile({ ...profile, areaType: 'rural' })}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  profile.areaType === 'rural'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Rural (गांव)
              </button>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, areaType: 'urban' })}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  profile.areaType === 'urban'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Urban (शहर)
              </button>
            </div>
          </div>

          {/* Student Status */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Enrolled Student?</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProfile({ ...profile, isStudent: true })}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  profile.isStudent
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, isStudent: false })}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  !profile.isStudent
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* Special Status Toggles */}
        <div className="pt-2">
          <label className="text-xs font-bold text-slate-600 block mb-2">Special Circumstances</label>
          <div className="flex flex-wrap gap-2.5">
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold text-slate-700 hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={profile.isPwD}
                onChange={(e) => setProfile({ ...profile, isPwD: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Person with Disability (दिव्यांग)</span>
            </label>

            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold text-slate-700 hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={profile.isWidowOrSingleMother}
                onChange={(e) => setProfile({ ...profile, isWidowOrSingleMother: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Widow / Single Mother (विधवा/एकल माता)</span>
            </label>

            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold text-slate-700 hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={profile.hasBPLCard}
                onChange={(e) => setProfile({ ...profile, hasBPLCard: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Holds BPL / Ration Card (राशन कार्डधारक)</span>
            </label>

            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold text-slate-700 hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={!profile.hasPuccaHouse}
                onChange={(e) => setProfile({ ...profile, hasPuccaHouse: !e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Lives in Kutcha House / Homeless (कच्चा मकान)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Header & Summary Scorecard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50 border border-emerald-200 rounded-3xl p-6">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            Matching Analysis
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            You Qualify for <span className="text-emerald-700">{eligibleCount} Schemes</span> Directly
            {likelyCount > 0 && <span className="text-amber-700 font-bold text-lg"> (+{likelyCount} Likely)</span>}
          </h3>
          <p className="text-xs text-slate-600 font-medium">
            Based on your age ({profile.age}y), {profile.occupation}, and {profile.incomeRange.replace('_', '-')} income bracket.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-2xl bg-white border border-emerald-200 text-center shadow-xs">
            <span className="block text-xl font-black text-emerald-600">{eligibleCount}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Eligible</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white border border-amber-200 text-center shadow-xs">
            <span className="block text-xl font-black text-amber-600">{likelyCount}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Likely</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategoryFilter === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scheme Cards List */}
      <div className="space-y-4">
        {filteredSchemes.map(({ scheme, status, reasons }) => {
          const isExpanded = expandedSchemeId === scheme.id;
          const isSpeaking = speakingSchemeId === scheme.id;
          const translation = scheme.translations[currentLang];
          const displayTitle = translation?.title || scheme.title;
          const displayDesc = translation?.shortDesc || scheme.shortDesc;
          const displayBenefits = translation?.benefitsSummary || scheme.benefitsSummary;
          const displayAmount = translation?.benefitAmount || scheme.benefitAmount;
          const displayApply = translation?.howToApply || scheme.applicationSteps.join('. ');
          const displayWarning = translation?.scamWarning || scheme.scamWarning;

          return (
            <div
              key={scheme.id}
              className={`bg-white rounded-3xl border transition-all shadow-xs ${
                status === 'eligible'
                  ? 'border-emerald-300 ring-1 ring-emerald-500/10'
                  : status === 'likely'
                  ? 'border-amber-300 ring-1 ring-amber-500/10'
                  : 'border-slate-200 opacity-70'
              }`}
            >
              {/* Card Summary Header */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                      {scheme.category}
                    </span>

                    {/* Eligibility Status Badge */}
                    {status === 'eligible' && (
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {t.eligible}
                      </span>
                    )}
                    {status === 'likely' && (
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {t.likelyEligible}
                      </span>
                    )}
                    {status === 'ineligible' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500">
                        <XCircle className="w-3.5 h-3.5" />
                        {t.ineligible}
                      </span>
                    )}
                  </div>

                  {/* Benefit Amount Pill */}
                  <div className="text-xs font-black px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl inline-block self-start sm:self-auto">
                    {displayAmount}
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {displayTitle}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold">
                    {scheme.ministry}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed pt-1">
                    {displayDesc}
                  </p>
                </div>

                {/* Match Evaluation Reasons */}
                <div className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
                  <span className="font-bold text-slate-800 block mb-0.5">Evaluation for your profile:</span>
                  {reasons.map((r, idx) => (
                    <span key={idx} className="block text-slate-700">• {r}</span>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSpeech(scheme)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        isSpeaking
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title={t.readAloud}
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isSpeaking ? t.stopAudio : t.readAloud}</span>
                    </button>

                    <button
                      onClick={() => {
                        onPrintDossier({
                          title: displayTitle,
                          summary: displayDesc,
                          benefits: [displayBenefits],
                          documents: scheme.requiredDocuments,
                          steps: scheme.applicationSteps,
                          warning: displayWarning
                        });
                      }}
                      className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                      title={t.print}
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 py-1.5 px-3 rounded-xl hover:bg-emerald-50 transition"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Application Checklist'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Expanded Details */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 bg-slate-50/60 rounded-b-3xl space-y-4">
                  {/* Benefits Detail */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                    <span className="text-xs font-bold text-slate-800 block mb-1">
                      Exact Entitlement Breakdown:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      {displayBenefits}
                    </p>
                  </div>

                  {/* Documents & Application Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Required Documents */}
                    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                      <span className="text-xs font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
                        <span>📋</span> {t.documentsRequired}
                      </span>
                      <ul className="space-y-1.5">
                        {scheme.requiredDocuments.map((doc, idx) => (
                          <li key={idx} className="text-xs text-slate-700 font-medium flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* How to Apply */}
                    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                      <span className="text-xs font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
                        <span>🚀</span> {t.howToApply}
                      </span>
                      <ol className="space-y-1.5">
                        {scheme.applicationSteps.map((step, idx) => (
                          <li key={idx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                            <span className="font-bold text-emerald-700 shrink-0">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Fraud / Middleman Warning */}
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-rose-800 block mb-0.5">{t.scamWarning}</span>
                      <p className="text-rose-900 font-medium">{displayWarning}</p>
                    </div>
                  </div>

                  {/* Official Portal & Helpline */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                    <span className="text-slate-500 font-medium">
                      Helpline: <strong className="text-slate-800">{scheme.helpline}</strong>
                    </span>
                    <a
                      href={scheme.officialPortal}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition shadow-xs"
                    >
                      <span>Apply on Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
