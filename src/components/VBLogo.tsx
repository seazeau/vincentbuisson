"use client";

import React from "react";

interface VBLogoProps {
  className?: string;
  size?: number;
  variant?: "dark" | "light" | "monochrome" | "volt";
}

export default function VBLogo({
  className = "",
  size = 32,
  variant = "dark",
}: VBLogoProps) {
  let vStroke = "#ffffff";
  let bStroke = "#ffffff";
  let accentStroke = "#d4ff00";
  let headFill = "#d4ff00";

  if (variant === "light") {
    vStroke = "#0c0c0b";
    bStroke = "#0c0c0b";
    accentStroke = "#0c0c0b";
    headFill = "#0c0c0b";
  } else if (variant === "volt") {
    vStroke = "#d4ff00";
    bStroke = "#d4ff00";
    accentStroke = "#ffffff";
    headFill = "#ffffff";
  } else if (variant === "monochrome") {
    vStroke = "currentColor";
    bStroke = "currentColor";
    accentStroke = "currentColor";
    headFill = "currentColor";
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-label="Logo VB Coaching Running"
    >
      {/* Runner head as speed dot */}
      <circle cx="36" cy="9" r="4.5" fill={headFill} />
      {/* Left stem of V */}
      <path
        d="M 12 14 L 23 40"
        stroke={vStroke}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Right stem of V rising to become the spine of B */}
      <path
        d="M 23 40 L 26 14"
        stroke={accentStroke}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Top loop of B (forward chest drive) */}
      <path
        d="M 26 14 H 36 C 41 14 42 19 39 23 C 37 26 32 27 26 27"
        stroke={bStroke}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom loop of B (propulsion drive) */}
      <path
        d="M 26 27 H 37 C 42 27 43 33 40 37 C 37 40 31 40 23 40"
        stroke={bStroke}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
