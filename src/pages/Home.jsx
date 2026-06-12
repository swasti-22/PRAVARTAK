import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useApiState } from "../context/ApiStateContext";
import { Card } from "../components/Card";
import { Search, FileUp, Camera, Mic, RefreshCw, AlertTriangle, HelpCircle } from "lucide-react";

export const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { simulateLoading, simulateError, simulateEmpty, errorMessage, apiData } = useApiState();

  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // "uploading", "done", ""
  
  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);

  // Handle voice search simulation
  const handleVoiceSearch = () => {
    setIsListening(true);
    setSearchQuery("");
    
    // Simulate speech recognition
    setTimeout(() => {
      setSearchQuery(
        t("language") === "en"
          ? "How do I apply for PM Kisan and register land records?"
          : "પીએમ કિસાન માટે કેવી રીતે અરજી કરવી અને જમીન રેકોર્ડ કેવી રીતે નોંધાવવો?"
      );
      setIsListening(false);
      
      // Auto transition to context after a short pause
      setTimeout(() => {
        navigate("/context");
      }, 1200);
    }, 2500);
  };

  // Handle document upload simulation
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadStatus("uploading");
      setTimeout(() => {
        setUploadStatus("done");
        setTimeout(() => {
          setUploadStatus("");
          navigate("/context");
        }, 1000);
      }, 1500);
    }
  };

  // Handle home search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/context");
    }
  };

  return (
    <div className="w-full flex flex-col justify-between h-full animate-fade-in py-2 gap-6">
      {/* Title / Intro */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-primary tracking-tight font-sans">
          {t("language") === "en" ? "How can we help you today?" : "આજે અમે તમને કેવી રીતે મદદ કરી શકીએ?"}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-sans">
          {t("language") === "en"
            ? "Access verified government procedures, check timelines, and generate trusted action plans."
            : "ચકાસાયેલ સરકારી પ્રક્રિયાઓ ઍક્સેસ કરો, સમયમર્યાદા તપાસો અને વિશ્વસનીય કાર્ય યોજનાઓ બનાવો."}
        </p>
      </div>

      {/* Main Search Bar */}
      <form onSubmit={handleSearchSubmit} className="w-full relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("homePlaceholder")}
            disabled={isListening}
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent bg-white shadow-sm text-brand-text placeholder-gray-400 focus:outline-none transition-all text-sm sm:text-base font-sans"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/50" />
          {searchQuery && (
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold px-3 py-1.5 rounded-md bg-brand-primary text-white hover:bg-opacity-90 transition-all cursor-pointer active:scale-95"
            >
              {t("next")}
            </button>
          )}
        </div>
      </form>

      {/* Voice Recognition Pulsing Overlay */}
      {isListening && (
        <div className="w-full p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center justify-center gap-3 animate-pulse">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-accent"></span>
          </span>
          <span className="text-xs font-semibold text-brand-primary font-sans">
            {t("language") === "en" ? "Listening for your question..." : "તમારો પ્રશ્ન સાંભળી રહ્યા છીએ..."}
          </span>
        </div>
      )}

      {/* Document Uploading Progress bar */}
      {uploadStatus && (
        <div className="w-full p-4 bg-brand-secondary/10 border border-brand-secondary/20 rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-primary font-sans">
            <span>
              {uploadStatus === "uploading" 
                ? (t("language") === "en" ? "Extracting official requirements from document..." : "દસ્તાવેજમાંથી સત્તાવાર જરૂરિયાતો કાઢી રહ્યા છીએ...")
                : (t("language") === "en" ? "Analysis complete! Starting guide..." : "વિશ્લેષણ પૂર્ણ! માર્ગદર્શિકા શરૂ થઈ રહી છે...")}
            </span>
            <RefreshCw className={`w-3.5 h-3.5 ${uploadStatus === "uploading" ? "animate-spin" : ""}`} />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full bg-brand-secondary transition-all duration-[1500ms] ${uploadStatus === "uploading" ? "w-4/5" : "w-full"}`}
            />
          </div>
        </div>
      )}

      {/* Hidden File Inputs for Quick Actions */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />
      <input
        type="file"
        ref={photoInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Quick Actions Row */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-primary/60 text-left font-sans pl-1">
          {t("quickActions")}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {/* Upload Document */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isListening || !!uploadStatus}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 bg-white hover:border-brand-secondary hover:bg-brand-secondary/5 transition-all text-center gap-1.5 focus:ring-1 focus:ring-brand-accent focus:outline-none cursor-pointer group active:scale-95 disabled:opacity-50"
          >
            <FileUp className="w-4 h-4 text-brand-primary/70 group-hover:text-brand-secondary transition-colors" />
            <span className="text-[10px] sm:text-xs font-semibold text-brand-primary leading-tight font-sans">
              {t("uploadDoc")}
            </span>
          </button>

          {/* Upload Photo */}
          <button
            onClick={() => photoInputRef.current?.click()}
            disabled={isListening || !!uploadStatus}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 bg-white hover:border-brand-secondary hover:bg-brand-secondary/5 transition-all text-center gap-1.5 focus:ring-1 focus:ring-brand-accent focus:outline-none cursor-pointer group active:scale-95 disabled:opacity-50"
          >
            <Camera className="w-4 h-4 text-brand-primary/70 group-hover:text-brand-secondary transition-colors" />
            <span className="text-[10px] sm:text-xs font-semibold text-brand-primary leading-tight font-sans">
              {t("uploadPhoto")}
            </span>
          </button>

          {/* Speak Question */}
          <button
            onClick={handleVoiceSearch}
            disabled={isListening || !!uploadStatus}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 bg-white hover:border-brand-secondary hover:bg-brand-secondary/5 transition-all text-center gap-1.5 focus:ring-1 focus:ring-brand-accent focus:outline-none cursor-pointer group active:scale-95 disabled:opacity-50"
          >
            <Mic className="w-4 h-4 text-brand-primary/70 group-hover:text-brand-secondary transition-colors" />
            <span className="text-[10px] sm:text-xs font-semibold text-brand-primary leading-tight font-sans">
              {t("speakQuestion")}
            </span>
          </button>
        </div>
      </div>

      {/* Popular Services Section (Responds to API States) */}
      <div className="flex flex-col gap-2 flex-1 overflow-hidden min-h-[160px]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-primary/60 text-left font-sans pl-1">
          {t("popularServices")}
        </h3>

        {/* API Simulated States wrapper */}
        <div className="flex-1 overflow-y-auto pr-1">
          {simulateLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 4, 6].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-gray-200/50 animate-pulse border border-gray-100 flex items-center p-4">
                  <div className="h-8 min-w-[36px] px-2 rounded-lg bg-gray-200 mr-3 flex-shrink-0"></div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="h-3 w-3/4 rounded bg-gray-200"></div>
                    <div className="h-2 w-1/2 rounded bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {simulateError && !simulateLoading && (
            <div className="p-6 border border-red-100 bg-red-50/50 rounded-xl text-center flex flex-col items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500 animate-bounce" />
              <p className="text-xs font-semibold text-red-700 font-sans">{errorMessage}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-[10px] font-bold uppercase tracking-wider text-brand-primary hover:text-brand-accent mt-1 border-b border-brand-primary hover:border-brand-accent transition-colors"
              >
                Try Reconnecting
              </button>
            </div>
          )}

          {simulateEmpty && !simulateLoading && !simulateError && (
            <div className="p-8 border border-dashed border-gray-200 rounded-xl text-center flex flex-col items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-gray-400" />
              <p className="text-xs text-gray-500 font-sans">
                {t("language") === "en"
                  ? "No official guides are catalogued at the moment."
                  : "હાલમાં કોઈ સત્તાવાર માર્ગદર્શિકાઓ સૂચિબદ્ધ નથી."}
              </p>
            </div>
          )}

          {/* Success / Real Render State */}
          {!simulateLoading && !simulateError && !simulateEmpty && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {apiData.popularServices.map((service) => (
                <Card
                  key={service.id}
                  onClick={() => navigate("/context")}
                  className="flex items-center gap-3 py-3 px-4"
                  hoverable={true}
                >
                  <div className="flex h-8 min-w-[42px] px-2 flex-shrink-0 items-center justify-center rounded-lg bg-brand-primary/5 text-brand-primary font-extrabold text-[9px] tracking-wider uppercase border border-brand-primary/10">
                    {service.code}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-brand-primary font-sans leading-tight">
                      {t(service.nameKey)}
                    </h4>
                    <span className="text-[10px] text-brand-secondary font-semibold font-sans mt-0.5 inline-block">
                      {t("language") === "en" ? "Official Navigator Verified" : "સત્તાવાર નેવિગેટર ચકાસાયેલ"}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
