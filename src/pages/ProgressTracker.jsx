import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useApiState } from "../context/ApiStateContext";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  ArrowRight,
  PlusCircle, 
  RotateCcw,
  AlertTriangle,
  RefreshCw,
  HelpCircle
} from "lucide-react";

export const ProgressTracker = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { simulateLoading, simulateError, simulateEmpty, errorMessage, apiData } = useApiState();

  const [activeProgress, setActiveProgress] = useState(null);

  useEffect(() => {
    // If not simulating empty, load mock tracker details
    if (!simulateEmpty) {
      const savedProgress = localStorage.getItem("pravartak_application_progress");
      if (savedProgress) {
        setActiveProgress(JSON.parse(savedProgress));
      } else {
        // Fallback to API default mockup
        setActiveProgress(apiData.tracker);
      }
    } else {
      setActiveProgress(null);
    }
  }, [simulateEmpty, apiData.tracker]);

  const handleStartNew = () => {
    localStorage.removeItem("pravartak_application_progress");
    navigate("/home");
  };

  const handleContinuePrevious = () => {
    // Reload default data if cleared
    const defaultTracker = apiData.tracker;
    localStorage.setItem("pravartak_application_progress", JSON.stringify(defaultTracker));
    setActiveProgress(defaultTracker);
  };

  if (simulateLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center text-center h-full py-12">
        <RefreshCw className="w-8 h-8 text-brand-secondary animate-spin mb-3" />
        <span className="text-xs text-gray-500 font-semibold font-sans">Fetching tracking logs...</span>
      </div>
    );
  }

  if (simulateError) {
    return (
      <div className="w-full p-6 border border-red-100 bg-red-50/50 rounded-xl text-center flex flex-col items-center justify-center gap-3">
        <AlertTriangle className="w-8 h-8 text-red-500" />
        <p className="text-sm font-semibold text-red-700 font-sans">{errorMessage}</p>
        <Button onClick={() => navigate("/home")} variant="outline" className="mt-2">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-between h-full animate-fade-in py-1 gap-4 overflow-hidden">
      {/* Header */}
      <div className="text-left flex items-start justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-primary tracking-tight font-sans">
            {t("trackerTitle")}
          </h2>
          <p className="text-xs text-gray-500 font-sans mt-0.5">
            {t("trackerSubtitle")}
          </p>
        </div>
        
        {activeProgress && (
          <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/5 px-2.5 py-1.5 border border-brand-primary/10 rounded-md font-mono">
            ID: {activeProgress.applicationId}
          </span>
        )}
      </div>

      {/* Main Timeline Display */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
        {!activeProgress ? (
          /* Empty / Inactive state layout */
          <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-xl p-8 text-center gap-3">
            <HelpCircle className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-xs font-semibold text-brand-primary font-sans">
                {t("language") === "en" ? "No active application tracking found" : "કોઈ સક્રિય અરજી ટ્રેકિંગ મળ્યું નથી"}
              </p>
              <p className="text-[10px] text-gray-400 mt-1 max-w-xs font-sans">
                {t("language") === "en"
                  ? "Start a navigator session on the home dashboard to generate a tracker checklist."
                  : "ટ્રેકર ચેકલિસ્ટ બનાવવા માટે હોમ ડેશબોર્ડ પર નેવિગેટર સત્ર શરૂ કરો."}
              </p>
            </div>
            
            <Button
              onClick={handleContinuePrevious}
              variant="outline"
              className="text-xs py-2 px-4 flex items-center gap-1.5 mt-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("continuePrev")}</span>
            </Button>
          </div>
        ) : (
          /* Active Timeline Layout */
          <div className="flex flex-col gap-4 text-left">
            {/* Completed Steps */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold text-brand-secondary tracking-wider font-sans">
                {t("completedSteps")}
              </span>
              <div className="flex flex-col gap-2">
                {activeProgress.completedSteps.map((step) => (
                  <Card key={step.id} padding="p-3" className="border-brand-secondary/30 bg-[#f9fbf9]">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-brand-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-brand-primary font-sans leading-tight">
                          {step.titleKey ? t(step.titleKey) : step.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-medium font-sans mt-0.5">
                          {step.dateKey ? t(step.dateKey) : step.date}
                        </p>
                        <p className="text-[10px] text-gray-500 font-sans mt-1 leading-relaxed">
                          {step.detailsKey ? t(step.detailsKey) : step.details}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pending Steps */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold text-brand-accent tracking-wider font-sans">
                {t("pendingSteps")}
              </span>
              <div className="flex flex-col gap-2">
                {activeProgress.pendingSteps.map((step) => (
                  <Card key={step.id} padding="p-3" className="border-brand-accent/30 bg-[#fffdfa]">
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-brand-primary font-sans leading-tight">
                          {step.titleKey ? t(step.titleKey) : step.title}
                        </h4>
                        <p className="text-[10px] text-brand-accent font-semibold font-sans mt-0.5">
                          {step.statusKey ? t(step.statusKey) : step.status}
                        </p>
                        <p className="text-[10px] text-gray-500 font-sans mt-1">
                          {t("dates.officeLabel")}: <span className="font-semibold">{step.assignedToKey ? t(step.assignedToKey) : step.assignedTo}</span>
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Steps */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold text-brand-primary/40 tracking-wider font-sans">
                {t("upcomingSteps")}
              </span>
              <div className="flex flex-col gap-1.5 pl-1.5">
                {activeProgress.upcomingSteps.map((step) => (
                  <div key={step.id} className="flex items-center gap-3 py-1">
                    <Circle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                    <span className="text-xs font-medium text-brand-primary/60 font-sans">
                      {step.titleKey ? t(step.titleKey) : step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav Controller */}
      <div className="flex items-center justify-between border-t border-gray-100/80 pt-3 flex-none mt-auto">
        <div className="flex items-center gap-2">
          {activeProgress ? (
            <button
              onClick={handleStartNew}
              className="flex items-center gap-1 px-3 py-2 border border-gray-200 hover:border-red-200 text-gray-500 hover:text-red-500 rounded-lg text-xs font-semibold transition-colors focus:outline-none cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t("startNew")}</span>
            </button>
          ) : (
            <button
              onClick={handleContinuePrevious}
              className="flex items-center gap-1 px-3 py-2 border border-gray-200 hover:border-brand-primary text-gray-500 hover:text-brand-primary rounded-lg text-xs font-semibold transition-colors focus:outline-none cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("continuePrev")}</span>
            </button>
          )}
        </div>

        <Button
          onClick={() => navigate("/feedback")}
          variant="primary"
          className="text-xs font-semibold py-2.5 flex items-center gap-1.5"
        >
          <span>{t("language") === "en" ? "Review Experiences" : "અનુભવોની સમીક્ષા કરો"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};
