import React from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  fullWidth = false,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center px-5 py-3 rounded-full border-2 border-brand-primary font-bold text-sm transition-all duration-150 active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:pointer-events-none disabled:active:translate-y-0 focus:outline-none";

  const variants = {
    primary: "bg-brand-primary text-white hover:bg-opacity-95 shadow-sm",
    secondary: "bg-brand-secondary text-white hover:bg-opacity-95 shadow-sm",
    accent: "bg-[#EBFCE8] text-brand-primary hover:bg-[#dff9db] shadow-sm", // Green highlight color from screenshot
    outline: "bg-transparent text-brand-primary hover:bg-brand-primary/5",
    text: "border-transparent text-brand-primary hover:bg-brand-primary/5 px-4"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
