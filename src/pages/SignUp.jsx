import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";

export const SignUp = () => {
  const { t } = useLanguage();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    const newErrors = {};

    // Trim check for empty fields
    if (!name.trim()) {
      newErrors.name = "Please enter your full name.";
    }
    
    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address (e.g., name@example.com).";
    }

    if (!password) {
      newErrors.password = "Please enter a password.";
    } else {
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumberOrSymbol = /[0-9\W]/.test(password);
      if (password.length < 8 || !hasLetter || !hasNumberOrSymbol) {
        newErrors.password = "Password is too weak. It must be at least 8 characters long and include both letters and numbers.";
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match. Please try again.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Trigger mock loading state
    setIsLoading(true);
    setErrors({});
    setShowLoginButton(false);

    setTimeout(() => {
      const result = signUp(name, email, password);
      setIsLoading(false);

      if (!result.success) {
        if (result.error === "already_exists") {
          setErrors({
            email: "This email is already registered. Please log in instead."
          });
          setShowLoginButton(true);
        }
      } else {
        // Direct navigate to home
        navigate("/home");
      }
    }, 1000);
  };


  return (
    <div className="w-full max-w-md mx-auto py-6 text-center animate-fade-in flex flex-col justify-center h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-brand-primary tracking-tight font-sans">
          {t("signUpTitle")}
        </h2>
        <p className="text-xs text-gray-500 mt-2 font-sans max-w-sm mx-auto">
          {t("signUpSubtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 text-left mt-2">
        <InputField
          label={t("fullName")}
          id="fullname"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
          }}
          error={errors.name}
          disabled={isLoading}
          required
        />

        <div>
          <InputField
            label={t("emailAddress")}
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
              setShowLoginButton(false);
            }}
            error={errors.email}
            disabled={isLoading}
            required
          />
          {showLoginButton && (
            <div className="mt-2.5 pl-1 flex items-start">
              <Button
                onClick={() => navigate("/login", { state: { email } })}
                variant="accent"
                className="py-1.5 px-4 text-xs font-bold border-2 border-black rounded-full"
                disabled={isLoading}
              >
                Go to Login
              </Button>
            </div>
          )}
        </div>

        <InputField
          label={t("password")}
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
          }}
          error={errors.password}
          disabled={isLoading}
          required
        />

        <InputField
          label={t("confirmPassword")}
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
          }}
          error={errors.confirmPassword}
          disabled={isLoading}
          required
        />

        <Button 
          type="submit" 
          variant="primary" 
          className="mt-4" 
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : t("createAccount")}
        </Button>
      </form>

      <div className="mt-6 text-center">
        {isLoading ? (
          <span className="text-xs font-semibold text-gray-400 font-sans cursor-not-allowed">
            {t("alreadyHaveAccount")}
          </span>
        ) : (
          <Link
            to="/login"
            className="text-xs font-semibold text-brand-primary hover:text-brand-accent transition-colors font-sans"
          >
            {t("alreadyHaveAccount")}
          </Link>
        )}
      </div>

    </div>
  );
};
