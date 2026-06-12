import React, { useState } from "react";
import { useApiState } from "../context/ApiStateContext";
import { useNavigate } from "react-router-dom";
import { Settings, RefreshCw, AlertTriangle, Database, ArrowRight } from "lucide-react";

export const DeveloperConsole = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
    simulateLoading,
    setSimulateLoading,
    simulateError,
    setSimulateError,
    simulateEmpty,
    setSimulateEmpty,
    errorMessage,
    setErrorMessage
  } = useApiState();

  const routes = [
    { name: "Language Selection", path: "/language" },
    { name: "Sign Up", path: "/signup" },
    { name: "Login", path: "/login" },
    { name: "Home Dashboard", path: "/home" },
    { name: "Context Questions", path: "/context" },
    { name: "Processing", path: "/processing" },
    { name: "Action Plan", path: "/action-plan" },
    { name: "Progress Tracker", path: "/tracker" },
    { name: "Feedback Portal", path: "/feedback" }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans text-xs">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-brand-primary text-white hover:bg-opacity-90 shadow-lg active:scale-95 transition-all focus:outline-none cursor-pointer"
      >
        <Settings className={`w-3.5 h-3.5 ${isOpen ? "animate-spin" : ""}`} />
        <span className="font-semibold">Developer Console</span>
      </button>

      {/* Console Panel */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 bg-white border border-gray-200 rounded-xl p-4 shadow-2xl animate-fade-in text-left">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="font-bold text-brand-primary uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-brand-accent" />
              API Sandbox Controls
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 font-bold px-1"
            >
              ✕
            </button>
          </div>

          {/* Simulated API States */}
          <div className="py-3 flex flex-col gap-2.5 border-b border-gray-100">
            <span className="font-semibold text-brand-primary/80">Simulate Response States</span>
            
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
              <input
                type="checkbox"
                checked={simulateLoading}
                onChange={(e) => setSimulateLoading(e.target.checked)}
                className="rounded text-brand-primary focus:ring-brand-accent"
              />
              <span className="flex items-center gap-1.5 text-gray-700">
                <RefreshCw className={`w-3 h-3 ${simulateLoading ? "animate-spin" : ""}`} />
                API Loading State
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
              <input
                type="checkbox"
                checked={simulateError}
                onChange={(e) => setSimulateError(e.target.checked)}
                className="rounded text-brand-primary focus:ring-brand-accent"
              />
              <span className="flex items-center gap-1.5 text-gray-700">
                <AlertTriangle className="w-3 h-3 text-red-500" />
                API Error State
              </span>
            </label>

            {simulateError && (
              <input
                type="text"
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
                placeholder="Error message..."
                className="w-full px-2 py-1 border border-red-200 rounded bg-red-50/50 text-[11px] focus:outline-none focus:border-red-400"
              />
            )}

            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
              <input
                type="checkbox"
                checked={simulateEmpty}
                onChange={(e) => setSimulateEmpty(e.target.checked)}
                className="rounded text-brand-primary focus:ring-brand-accent"
              />
              <span className="text-gray-700">API Empty/No-results State</span>
            </label>
          </div>

          {/* Quick Nav Overrides */}
          <div className="pt-3">
            <span className="font-semibold text-brand-primary/80 block mb-2">Audit Screens (Router Bypass)</span>
            <div className="grid grid-cols-1 gap-1 max-h-40 overflow-y-auto pr-1">
              {routes.map((route) => (
                <button
                  key={route.path}
                  onClick={() => {
                    navigate(route.path);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between px-2.5 py-1.5 bg-gray-50 hover:bg-brand-primary/5 border border-gray-100 hover:border-brand-primary/10 rounded text-left text-gray-600 hover:text-brand-primary transition-all active:scale-[0.99]"
                >
                  <span>{route.name}</span>
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-brand-primary" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
