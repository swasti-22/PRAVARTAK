import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";

export const Login = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSignupButton, setShowSignupButton] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  // Prefill email if coming from signup redirection
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (isLoading || isResetting) return;

    setResetMessage("");
    setErrors({});

    if (!email.trim()) {
      setErrors({ email: "Please enter your email address to reset your password." });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Please enter a valid email address (e.g., name@example.com) to reset your password." });
      return;
    }

    setIsResetting(true);

    setTimeout(() => {
      setIsResetting(false);
      setResetMessage(`A password reset link has been sent to ${email.trim()}. Please check your inbox.`);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address (e.g., name@example.com).";
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Trigger mock loading
    setIsLoading(true);
    setErrors({});
    setShowSignupButton(false);

    setTimeout(() => {
      const result = login(email, password);
      setIsLoading(false);

      if (!result.success) {
        if (result.error === "email_not_found") {
          setErrors({
            email: "No account found with this email address."
          });
          setShowSignupButton(true);
        } else if (result.error === "incorrect_password") {
          setErrors({
            password: "Incorrect password. Please try again."
          });
        }
      } else {
        // Logged in, navigate to home
        navigate("/home");
      }
    }, 1000);
  };


  return (
    <div className="w-full max-w-md mx-auto py-12 text-center animate-fade-in flex flex-col justify-center h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-primary tracking-tight font-sans">
          {t("loginTitle")}
        </h2>
        <p className="text-xs text-gray-500 mt-2 font-sans">
          {t("loginSubtitle")}
        </p>
      </div>

      {resetMessage && (
        <div className="mb-4 p-3 bg-brand-secondary/20 border-2 border-brand-secondary rounded-2xl text-left text-xs font-bold text-brand-primary animate-fade-in flex gap-2 items-center">
          <span className="h-2 w-2 rounded-full bg-brand-secondary animate-pulse shrink-0" />
          <span>{resetMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 text-left mt-2">
        <div>
          <InputField
            label={t("emailAddress")}
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
              setShowSignupButton(false);
            }}
            error={errors.email}
            disabled={isLoading || isResetting}
            required
          />
          {showSignupButton && (
            <div className="mt-2.5 pl-1 flex items-start">
              <Button
                onClick={() => navigate("/signup", { state: { email } })}
                variant="accent"
                className="py-1.5 px-4 text-xs font-bold border-2 border-black rounded-full"
                disabled={isLoading || isResetting}
              >
                Create New Account
              </Button>
            </div>
          )}
        </div>

        <div>
          <InputField
            label={t("password")}
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            error={errors.password}
            disabled={isLoading || isResetting}
            required
          />
          <div className="flex justify-end mt-1.5 pr-1">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isLoading || isResetting}
              className="text-[10px] font-bold text-brand-primary hover:text-brand-accent transition-colors font-sans focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {isResetting ? "Sending reset link..." : t("forgotPassword")}
            </button>
          </div>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="mt-4" 
          fullWidth
          disabled={isLoading || isResetting}
        >
          {isLoading ? "Logging in..." : t("loginCTA")}
        </Button>
      </form>

      <div className="mt-8 flex flex-col gap-3 items-center justify-center">
        <span className="text-xs text-gray-400 font-medium font-sans">
          {t("language") === "en" ? "New to Pravartak?" : "પ્રવર્તક પર નવા છો?"}
        </span>
        <Button
          onClick={() => navigate("/signup")}
          variant="outline"
          className="w-full"
          disabled={isLoading || isResetting}
        >
          {t("createNewAccount")}
        </Button>
      </div>

    </div>
  );
};
