import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useApiState } from "../context/ApiStateContext";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { Star, MessageSquare, AlertTriangle, RefreshCw, Heart } from "lucide-react";

export const Feedback = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { simulateLoading, simulateError, simulateEmpty, errorMessage, apiData, addFeedback } = useApiState();

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    addFeedback(name, text, rating);
    setName("");
    setText("");
    setRating(5);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  if (simulateLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center text-center h-full py-12">
        <RefreshCw className="w-8 h-8 text-brand-secondary animate-spin mb-3" />
        <span className="text-xs text-gray-500 font-semibold font-sans">Connecting to feedback feed...</span>
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
      <div className="text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-primary tracking-tight font-sans">
          {t("feedbackTitle")}
        </h2>
        <p className="text-xs text-gray-500 font-sans mt-0.5">
          {t("feedbackSubtitle")}
        </p>
      </div>

      {/* Main Layout Grid - Restored to 2 columns on desktop/tablet */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-1 pb-1">
        {/* Left Column: Form Card */}
        <div className="flex flex-col gap-3">
          <Card padding="p-4" hoverable={false} className="border-brand-primary">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-primary/70 mb-3 font-sans">
              {t("language") === "en" ? "Submit Your Experience" : "તમારો અનુભવ સબમિટ કરો"}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
              <InputField
                label={t("feedbackName")}
                id="feedback-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1 text-left">
                <label htmlFor="feedback-text" className="text-xs font-semibold uppercase tracking-wider text-brand-primary/70 font-sans pl-1">
                  {t("feedbackText")}
                </label>
                <textarea
                  id="feedback-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-brand-primary bg-white text-brand-primary placeholder-gray-400 font-bold focus:outline-none transition-all text-xs font-sans"
                />
              </div>

              {/* Rating selection stars */}
              <div className="flex flex-col gap-1.5 text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-primary/70 font-sans pl-1">
                  {t("feedbackRating")}
                </span>
                <div className="flex items-center gap-1 pl-1">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isFilled = hoverRating >= starVal || (!hoverRating && rating >= starVal);
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0.5 text-gray-300 hover:text-brand-accent transition-colors focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${isFilled ? "fill-brand-accent text-brand-accent" : "text-gray-300"}`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button type="submit" variant="primary" className="py-2.5 mt-2" fullWidth>
                {t("submit")}
              </Button>
            </form>
          </Card>
        </div>

        {/* Right Column: Citizen Board reviews feed */}
        <div className="flex flex-col gap-2 overflow-hidden h-full">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-primary/60 text-left pl-1 font-sans flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            {t("recentFeedback")}
          </h3>

          <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
            {simulateEmpty || apiData.feedbackList.length === 0 ? (
              <div className="p-8 border border-dashed border-gray-200 rounded-xl text-center flex flex-col items-center justify-center gap-2">
                <MessageSquare className="w-6 h-6 text-gray-300" />
                <span className="text-xs text-gray-400 font-sans">
                  {t("language") === "en" ? "No citizen reviews submitted yet." : "હજી સુધી કોઈ સમીક્ષાઓ સબમિટ કરવામાં આવી નથી."}
                </span>
              </div>
            ) : (
              apiData.feedbackList.map((fb) => (
                <Card key={fb.id} padding="p-3" hoverable={false} className="border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-primary font-sans">{fb.name}</span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <Star
                          key={val}
                          className={`w-3 h-3 ${val <= fb.rating ? "fill-brand-accent text-brand-accent" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 font-sans mt-2 leading-relaxed">
                    "{fb.feedback}"
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-gray-50 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                    <span>{fb.date}</span>
                    <span className="flex items-center gap-0.5 text-brand-secondary">
                      <Heart className="w-2.5 h-2.5 fill-brand-secondary" />
                      Verified Citizen
                    </span>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Success notification overlay */}
      {success && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 p-3 rounded-xl bg-brand-secondary text-white text-xs font-bold shadow-lg animate-fade-in text-center max-w-[280px]">
          {t("feedbackSuccess")}
        </div>
      )}

      {/* Footer Nav CTA */}
      <div className="flex items-center justify-between border-t border-gray-100/80 pt-3 flex-none mt-auto">
        <Button
          onClick={() => navigate("/home")}
          variant="outline"
          className="text-xs font-semibold py-2.5"
        >
          {t("language") === "en" ? "Return to Dashboard" : "ડેશબોર્ડ પર પાછા ફરો"}
        </Button>
      </div>
    </div>
  );
};
