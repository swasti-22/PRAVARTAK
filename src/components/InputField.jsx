import React from "react";

export const InputField = ({
  label,
  id,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error = "",
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full text-left ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-[10px] font-black uppercase tracking-wider text-brand-primary font-sans pl-1"
        >
          {label} {required && <span className="text-brand-accent">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2.5 rounded-2xl border-2 bg-white text-brand-primary placeholder-gray-400 font-bold focus:outline-none transition-all text-xs sm:text-sm font-sans
          ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-400"
              : "border-brand-primary focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
          }`}
        {...props}
      />
      {error && (
        <span className="text-[10px] font-bold text-red-500 mt-0.5 pl-1 animate-fade-in font-sans">
          {error}
        </span>
      )}
    </div>
  );
};
