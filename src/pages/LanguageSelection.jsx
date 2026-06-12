import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Card } from "../components/Card";

export const LanguageSelection = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSelectLanguage = (langCode) => {
    setLanguage(langCode);
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-4 text-center h-full animate-fade-in gap-5 sm:gap-8">
      
      {/* Title block - responsive sizes */}
      <div className="flex flex-col gap-1 sm:gap-2">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#000000] tracking-tight uppercase font-sans">
          Choose Your Language
        </h2>
        <h3 className="text-xl sm:text-3xl font-extrabold text-[#000000] tracking-tight font-gujarati">
          તમારી ભાષા પસંદ કરો
        </h3>
      </div>

      {/* Grid of rich cards - responsive layouts: single column compact on mobile, 3 columns rich on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full mt-2 sm:mt-4 max-w-[280px] sm:max-w-none">
        
        {/* English */}
        <Card
          selected={language === "en"}
          onClick={() => handleSelectLanguage("en")}
          className="flex flex-row sm:flex-col items-center justify-start sm:justify-between py-3 sm:py-6 px-4 sm:px-6 text-left sm:text-center gap-3 sm:gap-4 border-2 border-black min-h-[70px] sm:min-h-[180px] rounded-2xl"
          hoverable={true}
        >
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-brand-primary text-white font-extrabold text-sm sm:text-lg border-2 border-black flex-shrink-0">
            EN
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-lg text-black font-sans leading-tight">English</h3>
            <p className="text-xs text-gray-500 font-sans mt-1 hidden sm:block">Simple, plain-English navigation</p>
          </div>
        </Card>

        {/* Gujarati */}
        <Card
          selected={language === "gu"}
          onClick={() => handleSelectLanguage("gu")}
          className="flex flex-row sm:flex-col items-center justify-start sm:justify-between py-3 sm:py-6 px-4 sm:px-6 text-left sm:text-center gap-3 sm:gap-4 border-2 border-black min-h-[70px] sm:min-h-[180px] rounded-2xl"
          hoverable={true}
        >
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-brand-secondary text-white font-extrabold text-sm sm:text-lg border-2 border-black flex-shrink-0">
            ગુ
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-lg text-black font-gujarati leading-tight">ગુજરાતી</h3>
            <p className="text-xs text-gray-500 font-sans mt-1 hidden sm:block">સરળ, શુદ્ધ ગુજરાતી માર્ગદર્શન</p>
          </div>
        </Card>

        {/* Hindi (Coming Soon) */}
        <div
          className="flex flex-row sm:flex-col items-center justify-between sm:justify-between py-3 sm:py-6 px-4 sm:px-6 text-left sm:text-center gap-3 sm:gap-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 text-gray-400 opacity-80 min-h-[70px] sm:min-h-[180px]"
        >
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gray-200 text-gray-400 font-extrabold text-sm sm:text-lg border-2 border-gray-300 flex-shrink-0">
            HI
          </div>
          <div className="flex-1 sm:flex-none">
            <h3 className="font-extrabold text-sm sm:text-lg text-gray-400 font-sans leading-tight">हिंदी</h3>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-accent mt-0.5 sm:mt-1 block">
              COMING SOON
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
