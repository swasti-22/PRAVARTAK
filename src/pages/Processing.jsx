import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useApiState } from "../context/ApiStateContext";
import { Loader2 } from "lucide-react";

export const Processing = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { simulateLoading } = useApiState();

  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "procStatus1", // Checking official sources
    "procStatus2", // Verifying eligibility rules
    "procStatus3"  // Building your action plan
  ];

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    // Navigate to action-plan after completion
    const redirectTimeout = setTimeout(() => {
      // If developer wants to simulate loading indefinitely, freeze redirect
      if (!simulateLoading) {
        navigate("/action-plan");
      }
    }, 4800);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(redirectTimeout);
    };
  }, [navigate, simulateLoading, messages.length]);

  return (
    <div className="w-full flex flex-col items-center justify-center text-center h-full animate-fade-in py-12">
      {/* Quiet, Human Loader Icon */}
      <div className="relative flex items-center justify-center w-16 h-16 mb-8">
        <Loader2 className="w-10 h-10 text-brand-secondary animate-spin" />
        <span className="absolute w-14 h-14 rounded-full border-2 border-brand-primary/5" />
      </div>

      {/* Progressing Message */}
      <div className="h-16 flex items-center justify-center">
        <p className="text-sm font-semibold text-brand-primary tracking-wide animate-pulse font-sans">
          {t(messages[messageIndex])}
        </p>
      </div>

      {/* Accessibe description text */}
      <p className="text-[11px] text-gray-400 mt-6 max-w-xs font-sans">
        {t("language") === "en" 
          ? "We scan active databases including PM-Kisan, AnyROR and central gazettes dynamically." 
          : "અમે પીએમ-કિસાન, AnyROR અને સેન્ટ્રલ ગેઝેટ સહિતના સક્રિય ડેટાબેઝને ગતિશીલ રીતે તપાસીએ છીએ."}
      </p>
    </div>
  );
};
