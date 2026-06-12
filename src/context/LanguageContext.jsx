import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    appName: "Pravartak",
    language: "en",
    appTagline: "Government Trust Navigator",
    comingSoon: "Coming Soon",
    activeTag: "⚡ Active",
    comingSoonTag: "🔒 Coming Soon",
    next: "Next",
    back: "Back",
    submit: "Submit",
    loading: "Loading...",
    error: "Error",
    empty: "No items found",
    logout: "Log Out",
    continue: "Continue",
    
    // Language Selection Screen
    langSelectTitle: "Choose your preferred language",
    langSelectSubtitle: "તમારી પસંદગીની ભાષા પસંદ કરો",
    langEnglish: "English",
    langGujarati: "ગુજરાતી",
    langHindi: "हिन्दी",
    
    // Sign Up Screen
    signUpTitle: "Create your citizen account",
    signUpSubtitle: "Join Pravartak to navigate public services with verified confidence.",
    fullName: "Full Name",
    emailAddress: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account? Log In",
    
    // Login Screen
    loginTitle: "Welcome back",
    loginSubtitle: "Access your personalized trust dashboard.",
    createNewAccount: "Create New Account",
    forgotPassword: "Forgot password?",
    loginCTA: "Continue",
    
    // Home Screen
    homePlaceholder: "What do you need help with today?",
    quickActions: "Quick Actions",
    uploadDoc: "Upload Document",
    uploadPhoto: "Upload Photo",
    speakQuestion: "Speak Question",
    popularServices: "Popular Services",
    services: {
      pmKisan: "PM Kisan Samman Nidhi",
      scholarships: "State Scholarships Portal",
      aadhaar: "Aadhaar Services",
      gst: "GST Registration & Filing",
      pension: "National Pension System",
      ration: "Ration Card Application"
    },
    docs: {
      aadhaar: "Aadhaar Card",
      income: "Income Certificate (Guj. Form 16)",
      land: "Land Possession Certificate (RoR 8-A / 7-12)",
      bank: "Bank Passbook Front Page Copy"
    },
    issues: {
      landMatch: "Land record name must match Aadhaar card spelling exactly. If it differs, a sub-registrar affidavit is required.",
      activeMobile: "Make sure the linked mobile number on Aadhaar is active for OTP verification."
    },
    steps: {
      formA1: "Download and print application Form A-1 from rural development portal.",
      landSign: "Get the 7-12 land records signed by Talati-cum-Mantri.",
      submitJanSeva: "Submit details via the online digital portal or visit your nearest Jan Seva Kendra."
    },
    trackerSteps: {
      t1Title: "Identity Verification (Aadhaar)",
      t1Details: "Verified successfully using biometric OTP.",
      t2Title: "Income Certificate Upload",
      t2Details: "Scanned and matched with revenue registry.",
      t3Title: "Land Records Matching (Talati Verification)",
      t3Assigned: "Revenue Inspector Office",
      t3Status: "Awaiting local signature validation",
      t4Title: "Direct Benefit Transfer (DBT) Activation",
      t5Title: "First instalment credit notification"
    },
    dates: {
      june08: "June 08, 2026",
      june09: "June 09, 2026",
      officeLabel: "Office"
    },
    
    // Context Questions Screen
    contextTitle: "Let's personalize your guide",
    contextIntro: "Answer a few questions to help us identify exact requirements.",
    qState: "Which state are you from?",
    qAadhaar: "Do you already have an Aadhaar card?",
    qDocs: "Do you have physical copies of required identity proofs?",
    states: {
      gujarat: "Gujarat",
      maharashtra: "Maharashtra",
      delhi: "Delhi",
      other: "Other State"
    },
    yes: "Yes, I have it",
    no: "No, I don't",
    haveSome: "I have some, not all",
    
    // Processing Screen
    procStatus1: "Checking official sources...",
    procStatus2: "Verifying eligibility rules...",
    procStatus3: "Building your personalized action plan...",
    
    // Action Plan Screen
    planTitle: "Your Verified Action Plan",
    planSubtitle: "A decision-support checklist built from official sources.",
    trustScore: "Trust Score",
    agreementLevel: "Agreement Percentage",
    verifiedSources: "Verified Sources",
    lastVerified: "Last Verification Date",
    requiredDocs: "Required Documents",
    potentialIssues: "Potential Bottlenecks",
    nextSteps: "Recommended Next Steps",
    whyTrustTitle: "Why Can I Trust This?",
    whyTrustDesc: "This navigator dynamically scrapes and cross-references official gazettes, government portals, and legal API feeds to ensure no outdated instructions are shown.",
    sourcesConsulted: "Sources Consulted",
    agreementText: "Agreement Level",
    verificationStatusText: "Verification Status",
    verifiedText: "Verified Official",
    unverifiedText: "Needs Verification",
    
    // Progress Tracker Screen
    trackerTitle: "Application Tracker",
    trackerSubtitle: "Track your milestones and active submissions.",
    completedSteps: "Completed Milestones",
    pendingSteps: "Pending Verification",
    upcomingSteps: "Upcoming Actions",
    continuePrev: "Continue Previous Application",
    startNew: "Start New Guide",
    
    // Feedback Screen
    feedbackTitle: "Community Trust Board",
    feedbackSubtitle: "Share your experience to help fellow citizens.",
    feedbackName: "Your Name",
    feedbackText: "Your Feedback",
    feedbackRating: "How helpful was this navigation?",
    feedbackSuccess: "Thank you! Your feedback has been shared with the community.",
    recentFeedback: "Recent Citizen Reviews",
  },
  gu: {
    appName: "પ્રવર્તક",
    language: "gu",
    appTagline: "સરકારી સરલ સેવા માર્ગદર્શક",
    comingSoon: "ટૂંક સમયમાં આવશે",
    activeTag: "⚡ સક્રિય",
    comingSoonTag: "🔒 ટૂંક સમયમાં",
    next: "આગળ",
    back: "પાછળ",
    submit: "સબમિટ કરો",
    loading: "લોડ થઈ રહ્યું છે...",
    error: "ભૂલ",
    empty: "કોઈ વસ્તુ મળી નથી",
    logout: "લૉગ આઉટ",
    continue: "ચાલુ રાખો",
    
    // Language Selection Screen
    langSelectTitle: "તમારી પસંદગીની ભાષા પસંદ કરો",
    langSelectSubtitle: "Choose your preferred language",
    langEnglish: "English / ઇંગ્લિશ",
    langGujarati: "ગુજરાતી",
    langHindi: "हिन्दी / હિન્દી",
    
    // Sign Up Screen
    signUpTitle: "તમારું નાગરિક ખાતું બનાવો",
    signUpSubtitle: "ચકાસાયેલ આત્મવિશ્વાસ સાથે જાહેર સેવાઓ નેવિગેટ કરવા માટે પ્રવર્તક સાથે જોડાઓ.",
    fullName: "પૂરું નામ",
    emailAddress: "ઈમેલ સરનામું",
    password: "પાસવર્ડ",
    confirmPassword: "પાસવર્ડની ખાતરી કરો",
    createAccount: "ખાતું બનાવો",
    alreadyHaveAccount: "પહેલેથી જ ખાતું છે? લૉગ ઇન કરો",
    
    // Login Screen
    loginTitle: "સ્વાગત છે",
    loginSubtitle: "તમારા વ્યક્તિગત કરેલ ટ્રસ્ટ ડેશબોર્ડને ઍક્સેસ કરો.",
    createNewAccount: "નવું ખાતું બનાવો",
    forgotPassword: "પાસવર્ડ ભૂલી ગયા છો?",
    loginCTA: "ચાલુ રાખો",
    
    // Home Screen
    homePlaceholder: "આજે તમને શેમાં મદદ જોઈએ છે?",
    quickActions: "ઝડપી ક્રિયાઓ",
    uploadDoc: "દસ્તાવેજ અપલોડ કરો",
    uploadPhoto: "ફોટો અપલોડ કરો",
    speakQuestion: "પ્રશ્ન બોલો",
    popularServices: "લોકપ્રિય સેવાઓ",
    services: {
      pmKisan: "પીએમ કિસાન સન્માન નિધિ",
      scholarships: "રાજ્ય સ્કોલરશિપ પોર્ટલ",
      aadhaar: "આધાર સેવાઓ",
      gst: "GST નોંધણી અને ફાઇલિંગ",
      pension: "રાષ્ટ્રીય પેન્શન યોજના",
      ration: "રેશન કાર્ડ અરજી"
    },
    docs: {
      aadhaar: "આધાર કાર્ડ",
      income: "આવકનું પ્રમાણપત્ર (ગુજરાત ફોર્મ ૧૬)",
      land: "જમીન કબજા પ્રમાણપત્ર (આઠ-અ / ૭-૧૨ નો નકલ)",
      bank: "બેંક પાસબુક પ્રથમ પાનાની નકલ"
    },
    issues: {
      landMatch: "જમીન રેકોર્ડનું નામ આધાર કાર્ડની જોડણી સાથે બરાબર મેળ ખાતું હોવું જોઈએ. જો તેમાં તફાવત હોય, તો સબ-રજિસ્ટ્રાર સોગંદનામું જરૂરી છે.",
      activeMobile: "અહીં લિંક કરેલો મોબાઇલ નંબર સક્રિય હોવો જરૂરી છે જેથી આધાર OTP ચકાસણી મેળવી શકાય."
    },
    steps: {
      formA1: "ગ્રામીણ વિકાસ પોર્ટલ પરથી અરજી ફોર્મ એ-૧ ડાઉનલોડ કરો અને પ્રિન્ટ કરો.",
      landSign: "તલાટી-કમ-મંત્રી દ્વારા સહી કરેલા ૭-૧૨ ના જમીન રેકોર્ડ મેળવો.",
      submitJanSeva: "ઓનલાઇન ડિજિટલ પોર્ટલ દ્વારા વિગતો સબમિટ કરો અથવા તમારા નજીકના જન સેવા કેન્દ્રની મુલાકાત લો."
    },
    trackerSteps: {
      t1Title: "ઓળખ ચકાસણી (આધાર)",
      t1Details: "બાયોમેટ્રિક OTP નો ઉપયોગ કરીને સફળતાપૂર્વક ચકાસવામાં આવ્યું.",
      t2Title: "આવક પ્રમાણપત્ર અપલોડ",
      t2Details: "સ્કેન કરવામાં આવ્યું અને મહેસૂલ રજિસ્ટ્રી સાથે મેળ ખાધું.",
      t3Title: "જમીન રેકોર્ડ્સ મેળવણી (તલાટી ચકાસણી)",
      t3Assigned: "મહેસૂલ નિરીક્ષક કચેરી",
      t3Status: "સ્થાનિક સહી માન્યતાની રાહ જોવાઈ રહી છે",
      t4Title: "ડાયરેક્ટ બેનિફિટ ટ્રાન્સફર (DBT) સક્રિયકરણ",
      t5Title: "પ્રથમ હપ્તાની જમા રકમની સૂચના"
    },
    dates: {
      june08: "જૂન ૦૮, ૨૦૨૬",
      june09: "જૂન ૦૯, ૨૦૨૬",
      officeLabel: "કચેરી"
    },
    
    // Context Questions Screen
    contextTitle: "ચાલો તમારી માર્ગદર્શિકાને વ્યક્તિગત કરીએ",
    contextIntro: "ચોક્કસ જરૂરિયાતો ઓળખવામાં અમારી સહાય કરવા માટે થોડા પ્રશ્નોના જવાબો આપો.",
    qState: "તમે કયા રાજ્યના છો?",
    qAadhaar: "શું તમારી પાસે પહેલેથી જ આધાર કાર્ડ છે?",
    qDocs: "શું તમારી પાસે જરૂરી ઓળખ પુરાવાઓની ભૌતિક નકલો છે?",
    states: {
      gujarat: "ગુજરાત",
      maharashtra: "મહારાષ્ટ્ર",
      delhi: "દિલ્હી",
      other: "બીજું રાજ્ય"
    },
    yes: "હા, મારી પાસે છે",
    no: "ના, મારી પાસે નથી",
    haveSome: "મારી પાસે થોડા છે, બધા નથી",
    
    // Processing Screen
    procStatus1: "સત્તાવાર સ્રોતોની તપાસ કરી રહ્યા છીએ...",
    procStatus2: "પાત્રતા નિયમોની ચકાસણી કરી રહ્યા છીએ...",
    procStatus3: "તમારી વ્યક્તિગત કાર્ય યોજના બનાવી રહ્યા છીએ...",
    
    // Action Plan Screen
    planTitle: "તમારી ચકાસાયેલ કાર્ય યોજના",
    planSubtitle: "સત્તાવાર સ્રોતોમાંથી બનેલી નિર્ણય-સપોર્ટ ચેકલિસ્ટ.",
    trustScore: "વિશ્વાસ સ્કોર",
    agreementLevel: "સંમતિ ટકાવારી",
    verifiedSources: "ચકાસાયેલ સ્રોતો",
    lastVerified: "છેલ્લી ચકાસણી તારીખ",
    requiredDocs: "જરૂરી દસ્તાવેજો",
    potentialIssues: "સંભવિત અડચણો",
    nextSteps: "ભલામણ કરેલ આગલા પગલાં",
    whyTrustTitle: "હું આના પર શા માટે વિશ્વાસ કરી શકું?",
    whyTrustDesc: "આ નેવિગેટર કોઈપણ જૂની સૂચનાઓ ન બતાવવામાં આવે તે સુનિશ્ચિત કરવા માટે સત્તાવાર ગેઝેટ્સ, સરકારી પોર્ટલ અને કાનૂની API ફીડ્સને ગતિશીલ રીતે ચકાસે છે.",
    sourcesConsulted: "સ્રોતોની સલાહ લીધી",
    agreementText: "સંમતિ સ્તર",
    verificationStatusText: "ચકાસણી સ્થિતિ",
    verifiedText: "સત્તાવાર ચકાસાયેલ",
    unverifiedText: "ચકાસણી જરૂરી છે",
    
    // Progress Tracker Screen
    trackerTitle: "અરજી ટ્રેકર",
    trackerSubtitle: "તમારા લક્ષ્યો અને સક્રિય સબમિશનને ટ્રૅક કરો.",
    completedSteps: "પૂર્ણ કરેલા લક્ષ્યો",
    pendingSteps: "બાકી ચકાસણી",
    upcomingSteps: "આગામી ક્રિયાઓ",
    continuePrev: "અગાઉની અરજી ચાલુ રાખો",
    startNew: "નવી માર્ગદર્શિકા શરૂ કરો",
    
    // Feedback Screen
    feedbackTitle: "નાગરિક પ્રતિસાદ બોર્ડ",
    feedbackSubtitle: "સાથી નાગરિકોને મદદ કરવા માટે તમારો અનુભવ શેર કરો.",
    feedbackName: "તમારું નામ",
    feedbackText: "તમારો પ્રતિસાદ",
    feedbackRating: "આ નેવિગેશન કેટલું મદદરૂપ હતું?",
    feedbackSuccess: "આભાર! તમારો પ્રતિસાદ સમુદાય સાથે શેર કરવામાં આવ્યો છે.",
    recentFeedback: "તાજેતરના નાગરિક પ્રતિસાદ",
  }
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("pravartak_lang") || "gu";
  });

  useEffect(() => {
    localStorage.setItem("pravartak_lang", language);
  }, [language]);

  const t = (path) => {
    const keys = path.split(".");
    let current = translations[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if not found in current language
        let fallback = translations["en"];
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            return path; // Return key path if fully missing
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
