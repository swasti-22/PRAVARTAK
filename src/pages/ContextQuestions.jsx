import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useApiState } from "../context/ApiStateContext";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const ContextQuestions = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { apiData } = useApiState();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = apiData.flowQuestions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (value) => {
    // Save answer
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    // Auto proceed to next question after brief delay for smooth interaction
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Save overall questions profile locally for downstream reference
        localStorage.setItem("pravartak_questions_profile", JSON.stringify(newAnswers));
        navigate("/processing");
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      navigate("/home");
    }
  };

  // Progress percentage calculation
  const progressPercent = Math.round(
    ((currentQuestionIndex) / questions.length) * 100
  );

  return (
    <div className="w-full flex flex-col justify-between h-full animate-fade-in py-4 gap-6">
      {/* Top Navigation & Simple Progress Bar */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-primary/60 hover:text-brand-primary transition-all focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("back")}</span>
          </button>
          <span className="text-xs font-bold text-brand-primary/60 font-sans">
            {t("language") === "en"
              ? `Step ${currentQuestionIndex + 1} of ${questions.length}`
              : `પગલું ${currentQuestionIndex + 1} માંથી ${questions.length}`}
          </span>
        </div>

        {/* Progress bar container */}
        <div className="w-full h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-accent transition-all duration-300 ease-out"
            style={{ width: `${progressPercent === 0 ? 5 : progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Block */}
      <div className="flex-1 flex flex-col justify-center gap-6 my-auto">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-primary tracking-tight font-sans leading-tight">
            {t(currentQuestion.questionKey)}
          </h2>
        </div>

        {/* Big Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.value;
            const isDisabled = option.disabled;
            
            return (
              <Card
                key={option.value}
                selected={isSelected}
                onClick={() => !isDisabled && handleSelectOption(option.value)}
                padding="p-4"
                className={`flex items-center justify-between transition-all duration-200
                  ${isDisabled ? "opacity-50 cursor-not-allowed hover:translate-y-0 active:translate-y-0" : ""}`}
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-semibold text-brand-primary font-sans">
                    {t(option.labelKey)}
                  </span>
                  {option.active && (
                    <span className="text-[9px] font-black text-brand-secondary uppercase tracking-wider mt-0.5">
                      {t("activeTag")}
                    </span>
                  )}
                  {option.disabled && (
                    <span className="text-[9px] font-black text-brand-accent uppercase tracking-wider mt-0.5">
                      {t("comingSoonTag")}
                    </span>
                  )}
                </div>
                {!isDisabled ? (
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200
                      ${isSelected ? "border-brand-accent bg-brand-accent" : "border-gray-300"}`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
                    <span className="text-[9px]">🔒</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer hint */}
      <div className="text-center text-[10px] text-gray-400 font-semibold tracking-wide flex items-center justify-center gap-1.5">
        <span>●</span>
        <span>
          {t("language") === "en"
            ? "Your choice dynamically adjusts official documents criteria"
            : "તમારી પસંદગી ગતિશીલ રીતે સત્તાવાર દસ્તાવેજોના માપદંડને સંતુલિત કરે છે"}
        </span>
      </div>
    </div>
  );
};
