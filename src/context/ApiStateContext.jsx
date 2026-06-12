import React, { createContext, useContext, useState } from "react";

const ApiStateContext = createContext(null);

// Default API responses structure to be served to screens
const defaultMockData = {
  // Mock search results/popular services list
  popularServices: [
    { id: "pm_kisan", nameKey: "services.pmKisan", code: "PM-KISAN" },
    { id: "scholarships", nameKey: "services.scholarships", code: "SCHOLS" },
    { id: "aadhaar", nameKey: "services.aadhaar", code: "UIDAI" },
    { id: "gst", nameKey: "services.gst", code: "GSTIN" },
    { id: "pension", nameKey: "services.pension", code: "NPS" },
    { id: "ration", nameKey: "services.ration", code: "RCARD" }
  ],
  
  // Custom Flow Questions depending on search selection
  flowQuestions: [
    {
      id: "state",
      questionKey: "qState",
      options: [
        { labelKey: "states.gujarat", value: "GJ", active: true },
        { labelKey: "states.maharashtra", value: "MH", disabled: true },
        { labelKey: "states.delhi", value: "DL", disabled: true },
        { labelKey: "states.other", value: "OT", disabled: true }
      ]
    },
    {
      id: "aadhaar",
      questionKey: "qAadhaar",
      options: [
        { labelKey: "yes", value: "has_aadhaar" },
        { labelKey: "no", value: "no_aadhaar" }
      ]
    },
    {
      id: "documents",
      questionKey: "qDocs",
      options: [
        { labelKey: "yes", value: "all_docs" },
        { labelKey: "haveSome", value: "some_docs" },
        { labelKey: "no", value: "no_docs" }
      ]
    }
  ],

  // Verification results generated from flow questions
  actionPlan: {
    trustScore: 94,
    agreementPercentage: 98,
    verifiedSourcesCount: 4,
    lastVerificationDate: "2026-06-10",
    requiredDocuments: [
      { id: "doc1", nameKey: "docs.aadhaar", name: "Aadhaar Card", verified: true },
      { id: "doc2", nameKey: "docs.income", name: "Income Certificate (Guj. Form 16)", verified: true },
      { id: "doc3", nameKey: "docs.land", name: "Land Possession Certificate (RoR 8-A / 7-12)", verified: false },
      { id: "doc4", nameKey: "docs.bank", name: "Bank Passbook Front Page Copy", verified: true }
    ],
    potentialIssues: [
      { id: "issue1", severity: "medium", textKey: "issues.landMatch", text: "Land record name must match Aadhaar card spelling exactly. If it differs, a sub-registrar affidavit is required." },
      { id: "issue2", severity: "low", textKey: "issues.activeMobile", text: "Make sure the linked mobile number on Aadhaar is active for OTP verification." }
    ],
    nextSteps: [
      { id: "step1", textKey: "steps.formA1", text: "Download and print application Form A-1 from rural development portal." },
      { id: "step2", textKey: "steps.landSign", text: "Get the 7-12 land records signed by Talati-cum-Mantri." },
      { id: "step3", textKey: "steps.submitJanSeva", text: "Submit details via the online digital portal or visit your nearest Jan Seva Kendra." }
    ],
    sources: [
      { name: "Ministry of Agriculture & Farmers Welfare", url: "https://pmkisan.gov.in" },
      { name: "Gujarat Revenue Department", url: "https://anyror.gujarat.gov.in" },
      { name: "UIDAI Aadhaar API Portal", url: "https://uidai.gov.in" },
      { name: "National Informatics Centre Gazette Feed", url: "https://egazette.gov.in" }
    ]
  },

  // Active tracker state
  tracker: {
    applicationId: "PR-2026-8809",
    serviceNameKey: "services.pmKisan",
    completedSteps: [
      { id: "t1", titleKey: "trackerSteps.t1Title", title: "Identity Verification (Aadhaar)", dateKey: "dates.june08", date: "June 08, 2026", detailsKey: "trackerSteps.t1Details", details: "Verified successfully using biometric OTP." },
      { id: "t2", titleKey: "trackerSteps.t2Title", title: "Income Certificate upload", dateKey: "dates.june09", date: "June 09, 2026", detailsKey: "trackerSteps.t2Details", details: "Scanned and matched with revenue registry." }
    ],
    pendingSteps: [
      { id: "t3", titleKey: "trackerSteps.t3Title", title: "Land Records Matching (Talati Verification)", assignedToKey: "trackerSteps.t3Assigned", assignedTo: "Revenue Inspector Office", statusKey: "trackerSteps.t3Status", status: "Awaiting local signature validation" }
    ],
    upcomingSteps: [
      { id: "t4", titleKey: "trackerSteps.t4Title", title: "Direct Benefit Transfer (DBT) Activation" },
      { id: "t5", titleKey: "trackerSteps.t5Title", title: "First instalment credit notification" }
    ]
  },

  // Citizen-driven feedback cards (Genuine & Trustworthy style, not sales/marketing)
  feedbackList: [
    {
      id: "f1",
      name: "Riya Patel",
      rating: 5,
      feedback: "The step-by-step guidance made the process much easier to understand. I knew exactly which documents my Talati needed to sign.",
      date: "June 08, 2026"
    },
    {
      id: "f2",
      name: "Devang Shah",
      rating: 4,
      feedback: "Very helpful for GST registration. It highlighted that my electricity bill proof needs to be within the last 3 months, which saved me an extra trip.",
      date: "June 07, 2026"
    },
    {
      id: "f3",
      name: "Manjula Vaghela",
      rating: 5,
      feedback: "ગુજરાતીમાં હોવાથી મને સમજવામાં કોઈ મુશ્કેલી ન પડી. વિધવા પેન્શન માટે કયા કાગળો જોઈશે તે સ્પષ્ટ દેખાયું.",
      date: "June 05, 2026"
    }
  ]
};

export const ApiStateProvider = ({ children }) => {
  const [simulateLoading, setSimulateLoading] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);
  const [errorMessage, setErrorMessage] = useState("API connection failed. Retrying in seconds...");
  const [apiData, setApiData] = useState(defaultMockData);

  // Helper function to dynamically add feedback
  const addFeedback = (name, text, rating) => {
    const newFeedback = {
      id: `f-${Date.now()}`,
      name,
      rating,
      feedback: text,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    };
    
    setApiData(prev => ({
      ...prev,
      feedbackList: [newFeedback, ...prev.feedbackList]
    }));
  };

  return (
    <ApiStateContext.Provider
      value={{
        simulateLoading,
        setSimulateLoading,
        simulateError,
        setSimulateError,
        simulateEmpty,
        setSimulateEmpty,
        errorMessage,
        setErrorMessage,
        apiData,
        setApiData,
        addFeedback
      }}
    >
      {children}
    </ApiStateContext.Provider>
  );
};

export const useApiState = () => {
  const context = useContext(ApiStateContext);
  if (!context) {
    throw new Error("useApiState must be used within an ApiStateProvider");
  }
  return context;
};
