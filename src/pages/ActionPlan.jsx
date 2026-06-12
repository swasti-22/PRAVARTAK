import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useApiState } from "../context/ApiStateContext";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  HelpCircle
} from "lucide-react";

export const ActionPlan = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { simulateLoading, simulateError, simulateEmpty, errorMessage, apiData } = useApiState();

  const [isWhyExpanded, setIsWhyExpanded] = useState(false);

  const plan = apiData.actionPlan;

  if (simulateLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center text-center h-full animate-fade-in py-12">
        <LoaderSpinner message="Loading decision verification plan..." />
      </div>
    );
  }

  if (simulateError) {
    return (
      <div className="w-full p-6 border border-red-100 bg-red-50/50 rounded-xl text-center flex flex-col items-center justify-center gap-3 animate-fade-in">
        <AlertTriangle className="w-8 h-8 text-red-500" />
        <p className="text-sm font-semibold text-red-700 font-sans">{errorMessage}</p>
        <Button onClick={() => navigate("/home")} variant="outline" className="mt-2">
          Back to Home
        </Button>
      </div>
    );
  }

  if (simulateEmpty || !plan) {
    return (
      <div className="w-full p-8 border border-dashed border-gray-200 rounded-xl text-center flex flex-col items-center justify-center gap-3 animate-fade-in">
        <HelpCircle className="w-8 h-8 text-gray-400" />
        <p className="text-sm text-gray-500 font-sans">
          No verification records found. Please start a new process search.
        </p>
        <Button onClick={() => navigate("/home")} variant="primary" className="mt-2">
          Start Search
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-between h-full animate-fade-in py-1 gap-4 overflow-hidden">
      {/* Title */}
      <div className="text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-primary tracking-tight font-sans">
          {t("planTitle")}
        </h2>
        <p className="text-xs text-gray-500 font-sans mt-0.5">
          {t("planSubtitle")}
        </p>
      </div>

      {/* Main Core Dashboard Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 overflow-y-auto pr-1 pb-1">
        {/* Left Column: Summary Metrics (Span 2) */}
        <div className="md:col-span-2 flex flex-col gap-3">
          {/* Trust Score Card */}
          <Card padding="p-4" className="bg-[#f0f4f1] border-[#d2dfd6]">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-primary/60 tracking-wider font-sans">
                  {t("trustScore")}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-brand-primary font-sans">{plan.trustScore}%</span>
                  <span className="text-xs text-brand-secondary font-bold font-sans">/ 100</span>
                </div>
              </div>
              <ShieldCheck className="w-8 h-8 text-brand-secondary" />
            </div>
            <p className="text-[10px] text-brand-primary/80 mt-2 font-sans font-medium leading-normal">
              {t("language") === "en"
                ? "Calculated from official state gazette updates and rule alignments."
                : "રાજ્ય ગેઝેટ અને નિયમ સંરેખણો અનુસાર ગણતરી કરવામાં આવે છે."}
            </p>
          </Card>

          {/* Verification Metrics Card */}
          <div className="grid grid-cols-2 gap-3">
            <Card padding="p-3.5" className="text-center">
              <span className="text-[9px] uppercase font-bold text-brand-primary/50 tracking-wider font-sans block">
                {t("agreementLevel")}
              </span>
              <span className="text-xl font-bold text-brand-primary font-sans mt-1 block">
                {plan.agreementPercentage}%
              </span>
            </Card>

            <Card padding="p-3.5" className="text-center">
              <span className="text-[9px] uppercase font-bold text-brand-primary/50 tracking-wider font-sans block">
                {t("verifiedSources")}
              </span>
              <span className="text-xl font-bold text-brand-primary font-sans mt-1 block">
                {plan.verifiedSourcesCount}
              </span>
            </Card>
          </div>

          {/* Last Verified Timestamp */}
          <div className="text-[10px] text-gray-400 font-bold tracking-wide pl-1 text-left uppercase">
            {t("lastVerified")}: {plan.lastVerificationDate}
          </div>

          {/* Expandable Why Can I Trust This? */}
          <div className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-300">
            <button
              onClick={() => setIsWhyExpanded(!isWhyExpanded)}
              className="w-full flex items-center justify-between p-4 text-xs font-bold text-brand-primary hover:bg-gray-50 focus:outline-none transition-colors"
            >
              <span className="font-sans">{t("whyTrustTitle")}</span>
              {isWhyExpanded ? <ChevronUp className="w-4 h-4 text-brand-accent" /> : <ChevronDown className="w-4 h-4 text-brand-accent" />}
            </button>

            {isWhyExpanded && (
              <div className="p-4 pt-0 border-t border-gray-100 flex flex-col gap-3 text-left animate-fade-in text-[10px] sm:text-xs">
                <p className="text-gray-500 font-sans leading-relaxed">
                  {t("whyTrustDesc")}
                </p>

                <div className="flex flex-col gap-1.5 mt-1">
                  <span className="font-semibold text-brand-primary/80 uppercase text-[9px] tracking-wider font-sans">
                    {t("sourcesConsulted")}:
                  </span>
                  <div className="flex flex-col gap-1">
                    {plan.sources.map((src, index) => (
                      <a
                        key={index}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-brand-secondary hover:text-brand-primary transition-colors hover:underline font-medium text-[10px] leading-tight"
                      >
                        <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="truncate">{src.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Required Documents & Issues & Steps (Span 3) */}
        <div className="md:col-span-3 flex flex-col gap-4">
          {/* Required Documents Section */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-primary/60 text-left pl-1 font-sans">
              {t("requiredDocs")}
            </h3>
            <Card padding="p-3" className="flex flex-col gap-2 max-h-40 overflow-y-auto">
              {plan.requiredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between text-xs pb-1.5 last:pb-0 border-b border-gray-50 last:border-b-0">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-brand-primary/60" />
                    <span className="font-medium text-brand-primary font-sans">
                      {doc.nameKey ? t(doc.nameKey) : doc.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {doc.verified ? (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-2.5 h-2.5" />
                        {t("verifiedText")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        {t("unverifiedText")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Potential Issues Section */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-primary/60 text-left pl-1 font-sans">
              {t("potentialIssues")}
            </h3>
            <div className="flex flex-col gap-2">
              {plan.potentialIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-start gap-2.5 p-3 rounded-xl border border-amber-100 bg-[#fffbeb]/50 text-left"
                >
                  <AlertTriangle className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium text-brand-primary/80 font-sans leading-relaxed">
                    {issue.textKey ? t(issue.textKey) : issue.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Steps Section */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-primary/60 text-left pl-1 font-sans">
              {t("nextSteps")}
            </h3>
            <Card padding="p-3" className="flex flex-col gap-2 text-left">
              {plan.nextSteps.map((step, index) => (
                <div key={step.id} className="flex gap-2.5 text-xs">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-brand-accent text-brand-primary font-bold text-[10px] mt-0.5 flex-shrink-0 font-sans">
                    {index + 1}
                  </span>
                  <span className="font-medium text-brand-primary font-sans leading-relaxed">
                    {step.textKey ? t(step.textKey) : step.text}
                  </span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>

      {/* Viewport CTA Navigation */}
      <div className="flex items-center justify-between border-t border-gray-100/80 pt-3 flex-none mt-auto">
        <Button
          onClick={() => navigate("/home")}
          variant="outline"
          className="text-xs font-semibold py-2.5"
        >
          {t("language") === "en" ? "Start New Search" : "નવી શોધ શરૂ કરો"}
        </Button>

        <Button
          onClick={() => navigate("/tracker")}
          variant="accent"
          className="text-xs font-semibold py-2.5 flex items-center gap-1.5"
        >
          <span>{t("language") === "en" ? "Track Progress" : "પ્રગતિ ટ્રૅક કરો"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};

// Internal loading helper
const LoaderSpinner = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-12">
    <RefreshCw className="w-8 h-8 text-brand-secondary animate-spin" />
    <span className="text-xs text-gray-500 font-semibold font-sans">{message}</span>
  </div>
);
