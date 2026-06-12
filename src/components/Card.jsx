import React from "react";

export const Card = ({
  children,
  selected = false,
  onClick,
  disabled = false,
  className = "",
  padding = "p-4.5",
  hoverable = true,
  ...props
}) => {
  const isClickable = !!onClick && !disabled;
  
  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={`
        relative rounded-2xl border-2 border-brand-primary choice-card-transition
        ${padding}
        ${selected ? "bg-[#EBFCE8]" : "bg-white"}
        ${isClickable && hoverable ? "cursor-pointer hover:bg-brand-primary/5 active:translate-y-0.5" : ""}
        ${disabled ? "opacity-60 cursor-not-allowed bg-gray-50 border-gray-300 text-gray-400" : ""}
        ${className}
      `}
      {...props}
    >
      {selected && (
        <span className="absolute top-2.5 right-3.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-white text-[8px] font-black">
          ✓
        </span>
      )}
      {children}
    </div>
  );
};
