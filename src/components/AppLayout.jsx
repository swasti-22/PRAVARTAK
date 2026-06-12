import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Globe, LogOut } from "lucide-react";

export const AppLayout = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isLanguageScreen = location.pathname === "/language";

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "en" ? "gu" : "en"));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    /* Desktop-friendly responsive container, centers on screen with a maximum width of 5xl */
    <div className="w-full max-w-5xl h-screen md:h-[90vh] bg-white flex flex-col justify-between overflow-hidden border-2 border-brand-primary md:rounded-3xl relative shadow-2xl text-brand-text font-sans">
      
      {/* Quiet, Clean Header (only visible on pages after language choice) */}
      {!isLanguageScreen && (
        <header className="flex-none w-full px-6 py-4 flex items-center justify-between border-b-2 border-brand-primary bg-white">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => isAuthenticated ? navigate("/home") : navigate("/language")}
          >
            <span className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-black text-sm border border-brand-primary">
              પ્ર
            </span>
            <div className="text-left">
              <h1 className="text-base font-black text-brand-primary tracking-tight leading-none m-0 p-0 font-sans">
                {t("appName")}
              </h1>
              <p className="text-[10px] text-brand-primary/60 tracking-wider font-bold leading-none mt-1 uppercase">
                {t("appTagline")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Minimal Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-brand-primary border-2 border-brand-primary hover:bg-brand-primary/5 transition-all focus:outline-none cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-brand-primary" />
              <span>{language === "en" ? "ગુજરાતી" : "English"}</span>
            </button>

            {/* Logout actions */}
            {isAuthenticated && user && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-md text-gray-400 hover:text-red-500 border border-transparent hover:border-red-200 transition-all focus:outline-none cursor-pointer"
                title={t("logout")}
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>
      )}

      {/* Main Viewport Content area */}
      <main className="flex-1 w-full px-6 py-6 overflow-hidden flex flex-col justify-center items-center bg-white">
        <div className="w-full h-full flex flex-col justify-center animate-fade-in">
          {children}
        </div>
      </main>

      {/* Signature Footer */}
      <footer className="flex-none py-3 text-center text-xs text-brand-primary/45 font-bold tracking-wider uppercase bg-white border-t border-brand-primary/10">
        {language === "en"
          ? "Pravartak — Citizen Trust Navigator"
          : "પ્રવર્તક — નાગરિક સેવા માર્ગદર્શક"}
      </footer>
    </div>
  );
};
