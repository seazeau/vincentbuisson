"use client";

import React, { useRef, useEffect } from "react";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees, default 10
  glare?: boolean;
}

export default function Tilt3DCard({
  children,
  className = "",
  maxTilt = 10,
  glare = true,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      const tiltX = ((y / rect.height) - 0.5) * -maxTilt * 2;
      const tiltY = ((x / rect.width) - 0.5) * maxTilt * 2;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = "transform 0.08s ease-out";

      if (glare && glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${xPercent.toFixed(1)}% ${yPercent.toFixed(1)}%, rgba(227, 255, 13, 0.22) 0%, transparent 60%)`;
        glareRef.current.style.opacity = "1";
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    const card = cardRef.current;
    if (card) {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      card.style.transition = "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)";
    }
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-style-3d will-change-transform ${className}`}
      style={{
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      {children}

      {/* Dynamic Specular 3D Glare */}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 overflow-hidden"
          style={{ opacity: 0 }}
        />
      )}
    </div>
  );
}
